Backend changes required for production deployment

Frontends:
- Production front-end canonical URL: https://kavix-two.vercel.app
- Backend API host: https://kavix-be.vercel.app

1) Environment variables (set these in your Vercel/GCP/Heroku environment)
- GOOGLE_CLIENT_ID
- GOOGLE_CLIENT_SECRET
- GOOGLE_CALLBACK_URL (e.g., https://kavix-be.vercel.app/auth/google/callback)
- JWT_SECRET
- FRONTEND_URL=https://kavix-two.vercel.app
- BACKEND_URL=https://kavix-be.vercel.app
- (optional) VITE_AUTH_BASE or AUTH_BASE if your routes are prefixed (e.g., /api/auth)

2) CORS + cookies
- Configure CORS to allow origin `https://kavix-two.vercel.app` and set `credentials: true`.
  Example (Express):
  ```js
  app.use(cors({ origin: process.env.FRONTEND_URL, credentials: true }));
  ```
- When setting cookies for session/JWT, ensure `SameSite=None; Secure;` so cookies are sent cross-site over HTTPS.
- Include `Access-Control-Allow-Credentials: true` in responses when appropriate.

3) OAuth redirect URIs (Google Cloud Console)
- Add `https://kavix-be.vercel.app/auth/google/callback` as an allowed redirect URI inside your Google OAuth client configuration.
- Add `https://kavix-two.vercel.app/login-success` as an allowed redirect URI on the frontend side (if applicable), or ensure backend redirects to that URI after successful auth.

4) Route behavior and JSON shapes
- `GET /auth/google` should redirect (HTTP 302) to Google's OAuth consent URL. It should accept optional `redirect` (frontend redirect URL) and optional `prompt=select_account` query params.
- `GET /auth/google/callback` should exchange code for tokens, create session cookie and/or JWT, and then redirect to frontend: e.g., `302 ${frontendRedirect}?token=${jwt}` or perform cookie-based redirect (no token in URL) if using httpOnly cookie.
- `GET /auth/me` should return JSON with user information for the current session (200):
  ```json
  { "name": "Full Name", "email": "user@example.com" }
  ```
  If not authenticated, return 401.
- `GET /auth/logout?redirect=...` should clear the session cookie and redirect to the `redirect` param.

5) Security notes
- Prefer issuing httpOnly, Secure cookies (session or JWT) rather than exposing JWTs in the browser. If you use httpOnly cookies, the frontend will rely solely on `/auth/me` to learn the user.
- If you must return a JWT in a redirect, keep it short-lived and rotate secrets if leaked.

6) Quick validations
- From the browser console or `curl`, confirm `GET https://kavix-be.vercel.app/auth/google` returns `302` to a Google URL.
- Confirm `GET https://kavix-be.vercel.app/auth/me` returns 401 when not authenticated and 200 + JSON when authenticated (after login).

If you want, I can prepare a pull request with sample backend changes (Express snippets) that implement the above, or run a quick probe to your backend endpoints to verify current behavior (requires CORS allowing the probe).