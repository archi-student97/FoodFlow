# FoodFlow

FoodFlow is a full-stack food delivery platform built with Next.js.
This repo contains both applications:
- Frontend app (`./`) for customer, owner, and admin panels
- Backend app (`./backend`) for API routes, auth, and data layer

## What You Get

- Customer flow: browse restaurants, cart, checkout, orders, profile
- Owner flow: menu, orders, analytics, restaurant management
- Admin flow: users, restaurants, platform analytics
- API layer: auth, restaurants, menu, favorites, orders, reviews

## Tech Stack

Frontend:
- Next.js 16 (App Router)
- React 19
- Tailwind CSS 4
- Zustand
- React Hook Form + Zod

Backend:
- Next.js 16 Route Handlers
- MongoDB + Mongoose
- JWT auth
- Cloudinary integration
- Zod validation

## Repository Structure

```text
foodflow-ai/
  src/                    # Frontend source
  backend/                # Backend Next.js app
    src/app/api/**        # API route handlers
```

Architecture details: [ARCHITECTURE.md](./ARCHITECTURE.md)

## Prerequisites

- Node.js 20+
- npm 10+
- MongoDB instance

## Environment Variables

Create `backend/.env.local`:

```env
MONGODB_URI=
JWT_SECRET=
JWT_EXPIRES_IN=7d
GEMINI_API_KEY=
CLOUDINARY_CLOUD_NAME=
CLOUDINARY_API_KEY=
CLOUDINARY_API_SECRET=
```

Optional for frontend:
- `NEXT_PUBLIC_API_BASE_URL` (default fallback: `http://localhost:4000`)

## Local Setup

Install dependencies:

```bash
npm install
cd backend && npm install
```

## Run the Project

Frontend only (root):

```bash
npm run dev
```

Frontend + Backend together (root):

```bash
npm run dev:full
```

Backend only (`backend/`):

```bash
npm run dev
```

Local URLs:
- Frontend: `http://localhost:3000`
- Backend: `http://localhost:4000`

## Production Build

Frontend:

```bash
npm run build
npm run start
```

Backend:

```bash
cd backend
npm run build
npm run start
```

## Deployment Guide (Recommended)

Use **2 separate Vercel projects** from the same GitHub repo for stable deployment.

1. Backend Project (create first)
- Import same repo
- Root Directory: `backend`
- Framework Preset: Next.js
- Required envs:
  - `MONGODB_URI`
  - `JWT_SECRET`
  - `JWT_EXPIRES_IN`
  - `GEMINI_API_KEY`
  - `CLOUDINARY_CLOUD_NAME`
  - `CLOUDINARY_API_KEY`
  - `CLOUDINARY_API_SECRET`
- Deploy and copy backend URL, e.g. `https://foodflow-backend.vercel.app`

2. Frontend Project (create second)
- Import same repo
- Root Directory: repo root (`foodflow-ai`)
- Framework Preset: Next.js
- Required env:
  - `NEXT_PUBLIC_API_BASE_URL=https://<your-backend-project>.vercel.app`

Important:
- Frontend uses `/bapi/*` rewrite to `NEXT_PUBLIC_API_BASE_URL/api/*`.
- If `NEXT_PUBLIC_API_BASE_URL` is missing in production, build will fail intentionally.
- Deploy backend first, then frontend.
- Backend root URL may show `404` and that is normal. Verify backend using `/api/*` routes.

This setup avoids multi-service function collisions.

## Deployment Verification Checklist

After both projects are deployed:

1. Backend health check:
- Open `https://<backend-domain>.vercel.app/api/auth/me`
- Expected response: JSON `401 Unauthorized` (this confirms backend is live)

2. Frontend API rewrite check:
- Open `https://<frontend-domain>.vercel.app/bapi/auth/me`
- Expected response: JSON (not HTML)

3. Auth flow check:
- Login from frontend
- Click logout
- Navbar should switch from `Logout (...)` to `Login` immediately

## Common Deploy Errors

- `Unexpected token '<', '<!DOCTYPE ...' is not valid JSON`:
  - Cause: frontend is receiving HTML page instead of backend JSON
  - Fix: set frontend env `NEXT_PUBLIC_API_BASE_URL` to backend domain and redeploy frontend

## Scripts

Root scripts:
- `npm run dev` - frontend dev server (3000)
- `npm run dev:full` - backend + frontend
- `npm run build` - frontend production build
- `npm run start` - frontend production server
- `npm run lint` - frontend lint

Backend scripts (`backend/`):
- `npm run dev` - backend dev server (4000)
- `npm run build` - backend production build
- `npm run start` - backend production server (4000)
- `npm run lint` - backend lint

## Troubleshooting

- Port busy (`3000`/`4000`): rerun dev scripts; they attempt to clear old listeners.
- Windows `.next` lock (`EPERM`): stop running node processes and rebuild.
- API not reachable from frontend: verify `NEXT_PUBLIC_API_BASE_URL`.

## Deployment Link
https://food-flow-k7mx.vercel.app/
