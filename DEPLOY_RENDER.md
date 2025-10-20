Deploying to Render (server + frontend)

Overview

You will deploy two services from your GitHub repo:
- Backend (Node/Express) at https://dsofts-server.onrender.com
- Frontend (Vite static site) at https://dsofts-client.onrender.com

This repo already includes render.yaml which lets Render set up both with one click. Alternatively you can create them manually in the dashboard.

Prerequisites

- A MongoDB connection string (MongoDB Atlas is recommended).
- Google OAuth keys (optional but recommended). Set Authorized redirect URI to https://<server-domain>/api/auth/google/callback.
- SMTP credentials (for forgot/reset password) or a testing service like Mailtrap.
- Razorpay keys if you want to accept payments.

1) Push to GitHub

- Commit and push this project to a new GitHub repository.

2) Deploy using Blueprint (render.yaml)

- In Render: New > Blueprint > Select your repo.
- Confirm services from render.yaml:
  - dsofts-server (type: web, Node)
  - dsofts-client (type: static_site)
- Click Apply. Render will create both services but they will fail until you set env vars.

3) Configure backend environment (dsofts-server)

Set these Environment Variables under Settings > Environment:

- NODE_ENV=production
- PORT=10000 (Render sets automatically, you can omit)
- MONGO_URI=your_atlas_connection_string
- JWT_SECRET=long_random_string
- CLIENT_URL=https://dsofts-client.onrender.com, http://localhost:5173
- GOOGLE_CLIENT_ID=... (optional)
- GOOGLE_CLIENT_SECRET=... (optional)
- GOOGLE_CALLBACK_URL=https://dsofts-server.onrender.com/api/auth/google/callback
- EMAIL_HOST=smtp.gmail.com
- EMAIL_PORT=587
- EMAIL_SECURE=false
- EMAIL_USER=your_email
- EMAIL_PASS=your_app_password
- RAZORPAY_KEY_ID=...
- RAZORPAY_KEY_SECRET=...

Notes
- CLIENT_URL accepts multiple origins separated by commas; the server’s CORS is configured to allow them and credentials.
- Cookies are set with SameSite=None and Secure in production, and app is configured with trust proxy so auth works over HTTPS/proxy.

4) Deploy the backend

- Click Manual Deploy > Clear build cache & deploy to get a clean build.
- Wait for “Build successful” and verify health at https://<server-domain>/api/health.

5) Configure frontend environment (dsofts-client)

- Set VITE_API_URL=https://<server-domain>/api
  Example: https://dsofts-server.onrender.com/api

6) Deploy the frontend

- Click Manual Deploy on dsofts-client.
- The static site build uses Vite and publishes client/dist.
- SPA routes are enabled (/* -> /index.html) so deep links work.

7) Test end‑to‑end

- Open the frontend URL and:
  - Register and login (auth cookie should be set; check developer tools > Application > Cookies).
  - Test Google login if keys are configured.
  - Submit a Project Builder inquiry and see it appear in admin > inquiries after making your user admin in Mongo.
  - Try a small Razorpay test payment (keys needed); result page should show success/failure.

Common fixes

- 403 CORS
  - Ensure CLIENT_URL includes the exact frontend URL with https, and that you redeployed the server after changing vars.

- Cookies not set
  - Both services must be on HTTPS (Render is), server NODE_ENV must be production, and browser not blocking third‑party cookies. trust proxy is enabled already.

- Google OAuth redirect mismatch
  - Update the Google Console Authorized redirect URI to https://<server-domain>/api/auth/google/callback and match GOOGLE_CALLBACK_URL.

Manual deploy (without render.yaml)

- Backend (web service):
  - Build command: cd server && npm install
  - Start command: cd server && npm start
  - Health check: /api/health

- Frontend (static site):
  - Build command: cd client && npm install && npm run build
  - Publish directory: client/dist
  - Set environment variable VITE_API_URL to your server URL + /api
  - Add route rewrite /* -> /index.html

