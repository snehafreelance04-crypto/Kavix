# Google OAuth (Frontend)

This project includes a minimal frontend flow for Google OAuth.

- Add this Redirect URI in Google Cloud Console: `https://kavix-two.vercel.app/login-success`.
- Start backend: deployed at `https://kavix-be.vercel.app` (backend must implement `/auth/google`, `/auth/google/callback`, `/auth/me`, `/auth/logout`).
- Start frontend locally (dev): `npm run dev` (default port `5173`).
- Click Login → Google consent → backend redirects to `https://kavix-two.vercel.app/login-success?token=...`.
- `LoginSuccess` persists minimal `user` and `token` to `localStorage` and redirects to `/home` (and removes token from URL history).
- Logout clears `localStorage` and navigates to `https://kavix-be.vercel.app/auth/logout?redirect=https://kavix-two.vercel.app/` to destroy server session.

Security notes:

- Prefer httpOnly cookies for tokens in production. `localStorage` has XSS risk — only use for non-sensitive client state.
- Don't store secrets in the browser.

Environment variables (Vite):

- `VITE_API_URL` — backend origin (e.g., `https://kavix-be.vercel.app`)
- `VITE_FRONTEND_URL` — canonical frontend origin (e.g., `https://kavix-two.vercel.app`)

See `.env.example` for defaults and add these in Vercel environment variables for production.
