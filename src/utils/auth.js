// Minimal auth utilities for frontend
const API = import.meta.env.VITE_API_URL || 'https://kavix-be.vercel.app';
const APP = import.meta.env.VITE_FRONTEND_URL || 'https://kavix-two.vercel.app';

export function startLogin(redirect = `${APP}/login-success`, { promptSelect = false } = {}) {
  // include optional prompt to allow choosing account
  const params = new URLSearchParams();
  if (redirect) params.set('redirect', redirect);
  if (promptSelect) params.set('prompt', 'select_account');
  const url = `${API}/auth/google?${params.toString()}`;
  window.location.href = url;
}

export function handleAuthCallback(token) {
  if (!token) return null;
  try {
    const payload = JSON.parse(atob(token.split('.')[1]));
    const user = { name: payload.name || payload.email };
    localStorage.setItem('user', JSON.stringify(user));
    localStorage.setItem('token', token);
+    // notify other listeners (same-tab) that auth changed
+    try { window.dispatchEvent(new Event('authChange')); } catch (e) {}
    return user;
  } catch (err) {
    console.error('Invalid token', err);
    return null;
  }
}

export function logout(redirect = APP + '/') {
  localStorage.removeItem('user');
  localStorage.removeItem('token');
+  try { window.dispatchEvent(new Event('authChange')); } catch (e) {}
  window.location.href = `${API}/auth/logout?redirect=${encodeURIComponent(redirect)}`;
} 

export async function getMe() {
  try {
    const r = await fetch(`${API}/auth/me`, { credentials: 'include' });
    if (!r.ok) return null;
    return r.json();
  } catch (err) {
    console.error('getMe failed', err);
    return null;
  }
} 
