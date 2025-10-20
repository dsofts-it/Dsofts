**Dsofts IT — MERN Website**

This repository contains a full‑stack website for Dsofts IT built with React (Vite) on the frontend and Node.js/Express/MongoDB on the backend. Features include auth (email/password + Google), password reset, services pages, happy clients, project builder (configurator), profile, contact, and Razorpay payment integration.

— Frontend: `client/`
— Backend: `server/`

Quick start

- Prerequisites: Node 18+, MongoDB 6+ running locally.
- Copy env templates:
  - `server/.env.example` ➜ `server/.env`
  - `client/.env.example` ➜ `client/.env`
- Fill values: `MONGO_URI`, `JWT_SECRET`, `CLIENT_URL`, Google OAuth keys, SMTP, `RAZORPAY_KEY_ID` and `RAZORPAY_KEY_SECRET`.
- Place your logo image as `client/public/dsofts-logo.png` (the navbar auto‑loads this file if present).

Run locally

- Install deps in both folders:
  - `cd server && npm i`
  - `cd ../client && npm i`
- Start backend: `npm run dev` in `server/` (http://localhost:5000)
- Start frontend: `npm run dev` in `client/` (http://localhost:5173)

Key features

- Auth: register, login via name/email + password, Google OAuth, logout, profile update, forgot/reset password by email.
- Content: Services endpoint and Happy Clients listing (Mongo model included).
- Project Builder: multi‑option configurator for Website/Android/MLM/Local Shop with live pricing and inquiry submission to Mongo.
- Payments: Razorpay order creation and signature verification; success/failure UI.
- UI: Light/Dark theme, animated loader, responsive cards and sections.
- Admin: Dashboard with visits, inquiries, revenue; manage services; list users, inquiries, and payments. Small Admin button in navbar.

Environment variables (backend `server/.env`)

- `PORT` — default 5000
- `MONGO_URI` — e.g., `mongodb://localhost:27017/dsofts`
- `JWT_SECRET` — long random string
- `CLIENT_URL` — e.g., `http://localhost:5173`
- Google: `GOOGLE_CLIENT_ID`, `GOOGLE_CLIENT_SECRET`, `GOOGLE_CALLBACK_URL` (e.g., `http://localhost:5000/api/auth/google/callback`)
- Email SMTP: `EMAIL_HOST`, `EMAIL_PORT`, `EMAIL_SECURE`, `EMAIL_USER`, `EMAIL_PASS`
- Razorpay: `RAZORPAY_KEY_ID`, `RAZORPAY_KEY_SECRET`

Notes

- Google OAuth requires setting Authorized redirect URI to `/api/auth/google/callback` on your server URL.
- SMTP may need an app password (e.g., Gmail). For testing, you can use Mailtrap/Elastic Email.
- Happy Clients page is empty until you insert documents into `clients` collection.
- The Project Builder saves inquiries to Mongo (`projectinquiries` collection).
- API base can be changed in `client/.env` via `VITE_API_URL`.
- To grant admin rights, set `role: 'admin'` on your user in the `users` collection (or manually insert a user with that role). Then log in and open `/admin`.

Security & production

- Uses HTTP‑only cookies for JWT. In production, set `NODE_ENV=production`, HTTPS, correct CORS `CLIENT_URL`, and strong `JWT_SECRET`.
- Configure your domain in Razorpay dashboard and Google OAuth.

Deploy to Render

- This repo includes `render.yaml` to deploy both backend (Node) and frontend (static) from GitHub.
- See detailed steps in `DEPLOY_RENDER.md`.
- Key points:
  - Backend env `CLIENT_URL` can contain multiple comma‑separated origins (e.g., `https://your-frontend.onrender.com, http://localhost:5173`).
  - Frontend env `VITE_API_URL` must be your server’s external URL + `/api`.
  - Health check is `/api/health`.
