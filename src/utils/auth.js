// Frontend auth utilities
// Uses Vite env vars: VITE_API_URL, VITE_FRONTEND_URL

const API = (import.meta.env.VITE_API_URL || 'https://kavix-be.vercel.app').replace(/\/$/, '');
const APP = (import.meta.env.VITE_FRONTEND_URL || 'https://kavix-two.vercel.app').replace(/\/$/, '');
// AUTH_BASE lets you change the auth route prefix (e.g. '/api/auth' on some deployments)
const AUTH_BASE = (import.meta.env.VITE_AUTH_BASE || '/auth').replace(/\/$/, '');

function safeParseJwt(token) {
  if (!token || typeof token !== 'string') return null;
  const parts = token.split('.');
  if (parts.length !== 3) return null;
  try {
    const payload = JSON.parse(atob(parts[1]));
    return payload;
  } catch (e) {
    console.error('Failed to parse JWT', e);
    return null;
  }
}

function normalizeUser(source = {}) {
  // source may be a token payload or backend user object
  const name = source.name
    || source.displayName
    || `${source.given_name || ''} ${source.family_name || ''}`.trim() || source.email || source.username || source.sub || null;
  const email = source.email || source.emailAddress || null;
  return { name, email };
}

export function startLogin(redirect = `${APP}/login-success`, { promptSelect = false } = {}) {
  const params = new URLSearchParams();
  if (redirect) params.set('redirect', redirect);
  if (promptSelect) params.set('prompt', 'select_account');
  const url = `${API}${AUTH_BASE}/google?${params.toString()}`;
  window.location.href = url;
}

export function handleAuthCallback(token) {
  if (!token) return null;
  const payload = safeParseJwt(token);
  if (!payload) return null;

  const user = normalizeUser(payload);
  try {
    localStorage.setItem('user', JSON.stringify(user));
    localStorage.setItem('token', token);
    // notify same-tab listeners
    try { window.dispatchEvent(new Event('authChange')); } catch (e) {}
  } catch (e) {
    console.error('Failed to persist auth', e);
  }
  return user;
}

export function getToken() {
  return localStorage.getItem('token');
}

export function getUser() {
  try { return JSON.parse(localStorage.getItem('user')); } catch { return null; }
}

export async function getMe() {
  try {
    const r = await fetch(`${API}${AUTH_BASE}/me`, { credentials: 'include' });
    if (!r.ok) return null;
    return r.json();
  } catch (err) {
    console.error('getMe failed', err);
    return null;
  }
}

export function logout(redirect = APP + '/') {
  try {
    localStorage.removeItem('user');
    localStorage.removeItem('token');
    try { window.dispatchEvent(new Event('authChange')); } catch (e) {}
  } catch (e) {
    console.error('Error clearing auth', e);
  }
  // redirect to backend to clear server session
  window.location.href = `${API}${AUTH_BASE}/logout?redirect=${encodeURIComponent(redirect)}`;
}

export function isAuthenticated() {
  return !!getToken() || !!getUser();
}
