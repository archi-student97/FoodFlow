# FoodFlow AI Backend

Production-ready backend using Next.js App Router APIs, TypeScript, MongoDB, and Mongoose.

## Setup
1. Copy `.env.example` to `.env.local`
2. Fill `MONGODB_URI` and `JWT_SECRET`
3. Run:
   - `npm install`
   - `npm run dev`

## API base
`/api`

## Auth endpoints
- POST `/api/auth/signup`
- POST `/api/auth/login`
- POST `/api/auth/logout`
- GET `/api/auth/me`
