import React, { useEffect, useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { handleAuthCallback, getMe, startLogin } from '../utils/auth';

export default function LoginSuccess() {
  const navigate = useNavigate();
  const [status, setStatus] = useState('Signing you in…');

  useEffect(() => {
    let handled = false;
    const params = new URLSearchParams(window.location.search);
    let token = params.get('token');

    // also support token in hash (e.g. #token=...)
    if (!token && window.location.hash) {
      const hash = new URLSearchParams(window.location.hash.replace(/^#/, ''));
      token = hash.get('token') || hash.get('access_token');
    }

    // canonical frontend origin
    const APP = import.meta.env.VITE_FRONTEND_URL || window.location.origin;

    const finish = async (foundUser) => {
      if (foundUser) setStatus(`Welcome, ${foundUser.name || foundUser.email || 'user'}`);
      // slight delay so user sees status then replace URL
      setTimeout(() => {
        try {
          window.location.replace(`${APP.replace(/\/$/, '')}/home`);
        } catch (e) {
          navigate('/home', { replace: true });
        }
      }, 600);
    };

    (async () => {
      try {
        if (token) {
          // persist token-derived user first
          const user = handleAuthCallback(token);
          handled = !!user;

          // Prefer authoritative server-side user (session) if available
          setStatus('Verifying server session…');
          try {
            const me2 = await getMe();
            if (me2) {
              // persist server user and notify
              try { localStorage.setItem('user', JSON.stringify({ name: me2.name || me2.displayName || me2.email || (me2.user && (me2.user.name || me2.user.displayName)), email: me2.email || (me2.user && me2.user.email) })); } catch (e) {}
              try { window.dispatchEvent(new Event('authChange')); } catch (e) {}
              await finish(me2);
              return;
            }
          } catch (e) {
            // ignore and continue with token user
          }

          await finish(user);
          return;
        }

        // No token: try cookie-backed session
        setStatus('Checking server session…');
        const me = await getMe();
        if (me) {
          // persist minimal user
          try { localStorage.setItem('user', JSON.stringify({ name: me.name || me.email, email: me.email })); } catch (e) {}
          try { window.dispatchEvent(new Event('authChange')); } catch (e) {}
          handled = true;
          await finish(me);
          return;
        }

        // nothing found — redirect to login
        setStatus('No active session. Redirecting to login…');
        setTimeout(() => {
          startLogin(undefined, { promptSelect: true });
        }, 900);
      } catch (err) {
        console.error('Login success handling failed', err);
        setStatus('Sign-in failed. Please try logging in again.');
        setTimeout(() => navigate('/login'), 1200);
      }
    })();

    return () => {};
  }, [navigate]);

  return (
    <div className="min-h-screen flex items-center justify-center">
      <div className="text-center">
        <h2 className="text-2xl font-semibold">{status}</h2>
        <p className="mt-4 text-sm text-gray-300">If you're not redirected, refresh the page.</p>
      </div>
    </div>
  );
}
