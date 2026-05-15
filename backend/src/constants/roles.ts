export const APP_ROLES = ["CUSTOMER", "OWNER", "ADMIN"] as const;
export type AppRole = (typeof APP_ROLES)[number];
