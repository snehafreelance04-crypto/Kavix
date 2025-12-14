// Minimal auth utilities for frontend
export function startLogin(redirect) {
  const url = 'http://localhost:5000/auth/google' + (redirect ? `?redirect=${encodeURIComponent(redirect)}` : '');
  window.location.href = url;
}

export function handleAuthCallback(token) {
  if (!token) return null;
  try {
    const payload = JSON.parse(atob(token.split('.')[1]));
    const user = { name: payload.name || payload.email };
    localStorage.setItem('user', JSON.stringify(user));
    localStorage.setItem('token', token);
    return user;
  } catch (err) {
    console.error('Invalid token', err);
    return null;
  }
}

export function logout(redirect = 'http://localhost:5173/') {
  localStorage.removeItem('user');
  localStorage.removeItem('token');
  window.location.href = `http://localhost:5000/auth/logout?redirect=${encodeURIComponent(redirect)}`;
}

export async function getMe() {
  try {
    const r = await fetch('http://localhost:5000/auth/me', { credentials: 'include' });
    if (!r.ok) return null;
    return r.json();
  } catch (err) {
    console.error('getMe failed', err);
    return null;
  }
}
