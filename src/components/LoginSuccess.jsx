import React, { useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import { handleAuthCallback } from '../utils/auth';

export default function LoginSuccess() {
  const navigate = useNavigate();

  useEffect(() => {
    const params = new URLSearchParams(window.location.search);
    const token = params.get('token');
    if (!token) return;

    // persist minimal user and token
    handleAuthCallback(token);

    // navigate to app and replace history so token is not retained in URL
    navigate('/home', { replace: true });
  }, [navigate]);

  return (
    <div className="min-h-screen flex items-center justify-center">
      <div className="text-center">
        <h2 className="text-2xl font-semibold">Signing you in…</h2>
        <p className="mt-4 text-sm text-gray-300">If you're not redirected, refresh the page.</p>
      </div>
    </div>
  );
}
