# FoodFlow Architecture

## 1) High-level map

- Frontend app: `foodflow-ai/`
- Backend app: `foodflow-ai/backend/`

Both are separate Next.js projects. Keep dependencies and commands scoped to each folder.

## 2) Frontend architecture

### Route groups

- `src/app/(public)` public browsing pages
- `src/app/(auth)` login/signup/forgot password
- `src/app/(customer)` cart, checkout, orders, profile
- `src/app/(owner)` owner dashboards
- `src/app/(admin)` admin dashboards

### Layers

- `src/components` presentational and reusable UI blocks
- `src/services` async data operations (API + mock fallback)
- `src/store` client state (Zustand)
- `src/mock` local mock datasets
- `src/types` shared domain types
- `src/hooks` custom behavior hooks

### Data flow

Page -> Component -> Service -> API/mock

If global UI/cart state needed:

Page/Component -> Zustand store (`src/store/*`)

## 3) Backend architecture

Request flow:

Route (`src/app/api/**/route.ts`) -> Validation (`src/validations`) -> Service (`src/services`) -> Repository (`src/repositories`) -> Model (`src/models`)

Cross-cutting:

- `src/middleware` for auth context, guards, and limits
- `src/utils` for response/error/sanitize helpers
- `src/lib` for db/jwt/password/cloudinary

## 4) Practical coding rules

- Keep route handlers thin; business logic in services.
- Do not call DB models directly from route handlers.
- Keep components focused on UI; use services/stores for data/state logic.
- Reuse `src/types` in services/components/stores to avoid model drift.

## 5) What was causing confusion

- Default Next.js README did not explain this dual-app setup.
- `backend/` is a full app, not just an API folder inside `src/`.

Use this file + README as primary orientation docs for the repo.
