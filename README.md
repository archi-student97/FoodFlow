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

Use **2 separate Vercel projects** for stable deployment.

1. Frontend Project
- Root Directory: repo root (`foodflow-ai`)
- Framework: Next.js

2. Backend Project
- Root Directory: `backend`
- Framework: Next.js

Then set this env in frontend Vercel project:
- `NEXT_PUBLIC_API_BASE_URL=<backend-vercel-url>`
- Example: `NEXT_PUBLIC_API_BASE_URL=https://your-backend-project.vercel.app`
- If this is missing, frontend `/bapi/*` calls may fail or auth state may behave incorrectly.

Fresh deploy order (important):
1. Deploy backend project first (`backend/` as Root Directory).
2. Copy backend production URL.
3. Set frontend env `NEXT_PUBLIC_API_BASE_URL` to that backend URL.
4. Deploy frontend project (repo root as Root Directory).

This setup avoids multi-service function collisions.

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

## Important Notes

- `backend/` is a standalone Next.js app.
- Keep commands scoped correctly (`root` vs `backend`).
