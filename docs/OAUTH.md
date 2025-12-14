# Google OAuth (Frontend)

This project includes a minimal frontend flow for Google OAuth.

- Add this Redirect URI in Google Cloud Console: `http://localhost:5173/login-success`.
- Start backend: `npm run start:server` (backend must implement `/auth/google`, `/auth/google/callback`, `/auth/me`, `/auth/logout`).
- Start frontend: `npm run dev` (default port `5173`).
- Click Login → Google consent → backend redirects to `http://localhost:5173/login-success?token=...`.
- `LoginSuccess` persists minimal `user` and `token` to `localStorage` and redirects to `/home`.
- Logout clears `localStorage` and navigates to `http://localhost:5000/auth/logout?redirect=http://localhost:5173/` to destroy server session.

Security notes:

- Prefer httpOnly cookies for tokens in production. `localStorage` has XSS risk — only use for non-sensitive client state.
- Don't store secrets in the browser.
