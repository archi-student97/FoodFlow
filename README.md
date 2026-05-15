# FoodFlow

FoodFlow is a full-stack food delivery platform with:
- A **frontend Next.js app** for customers, owners, and admins
- A **backend Next.js API app** for auth, restaurants, menu, orders, favorites, and reviews

This repository contains both apps:
- Frontend: `./`
- Backend: `./backend`

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
- Cloudinary (media)
- Zod validation

## Project Structure

```text
foodflow-ai/
  src/                  # Frontend source
  backend/              # Backend Next.js app
    src/app/api/**      # API routes
```

Detailed architecture is documented in [ARCHITECTURE.md](./ARCHITECTURE.md).

## Prerequisites

- Node.js 20+
- npm 10+
- MongoDB database

## Environment Variables

Create backend env file:

- `backend/.env.local`

Use this template:

```env
MONGODB_URI=
JWT_SECRET=
JWT_EXPIRES_IN=7d
GEMINI_API_KEY=
CLOUDINARY_CLOUD_NAME=
CLOUDINARY_API_KEY=
CLOUDINARY_API_SECRET=
```

Frontend API base URL (optional in local):

- `NEXT_PUBLIC_API_BASE_URL` (defaults to `http://localhost:4000` if not provided)

## Installation

From repository root:

```bash
npm install
cd backend && npm install
```

## Run Locally

### Option 1: Frontend only

From root:

```bash
npm run dev
```

Frontend runs on `http://localhost:3000`.

### Option 2: Frontend + Backend together

From root:

```bash
npm run dev:full
```

- Frontend: `http://localhost:3000`
- Backend: `http://localhost:4000`

### Option 3: Backend only

From `backend/`:

```bash
npm run dev
```

## Build & Start

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

## Deployment (Recommended)

Use **two Vercel projects** for stable deployment:

1. Frontend project
- Root directory: repository root (`foodflow-ai`)
- Framework: Next.js

2. Backend project
- Root directory: `backend`
- Framework: Next.js

Then set frontend env variable in Vercel:
- `NEXT_PUBLIC_API_BASE_URL=<your-backend-vercel-url>`

This avoids multi-service function collisions.

## Scripts

Root scripts:
- `npm run dev` - start frontend dev server on 3000
- `npm run dev:full` - start backend + frontend
- `npm run build` - build frontend
- `npm run start` - start frontend production server
- `npm run lint` - lint frontend

Backend scripts (`backend/`):
- `npm run dev` - start backend dev server on 4000
- `npm run build` - build backend
- `npm run start` - start backend production server on 4000
- `npm run lint` - lint backend

## Troubleshooting

- If port conflicts happen (`3000`/`4000`), rerun scripts; they already attempt to stop old processes.
- If Windows file lock errors appear in `.next`, stop running node processes and build again.
- If frontend cannot reach API, verify `NEXT_PUBLIC_API_BASE_URL`.

## Notes

- `backend/` is a standalone app, not just a subfolder of frontend source.
- Keep dependency install and scripts scoped correctly (`root` vs `backend`).
