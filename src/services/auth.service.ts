import { apiFetch } from "@/services/http";

export type AuthUser = { id: string; name: string; email: string; role: "CUSTOMER" | "OWNER" | "ADMIN" };
const AUTH_KEY = "foodflow_auth_user";
const AUTH_HINT_KEY = "foodflow_logged_in";

function readLocalUser() {
  if (typeof window === "undefined") return null;
  const raw = localStorage.getItem(AUTH_KEY);
  if (!raw) return null;
  try {
    return JSON.parse(raw) as AuthUser;
  } catch {
    localStorage.removeItem(AUTH_KEY);
    return null;
  }
}

function saveLocalUser(user: AuthUser | null) {
  if (typeof window === "undefined") return;
  if (!user) {
    localStorage.removeItem(AUTH_KEY);
    localStorage.removeItem(AUTH_HINT_KEY);
    return;
  }
  localStorage.setItem(AUTH_KEY, JSON.stringify(user));
  localStorage.setItem(AUTH_HINT_KEY, "1");
}

export const authService = {
  async login(email: string, password: string) {
    try {
      const user = await apiFetch<AuthUser>("/auth/login", { method: "POST", body: JSON.stringify({ email, password }) });
      saveLocalUser(user);
      return user;
    } catch {
      const fallbackUser: AuthUser = { id: "local-u1", name: email.split("@")[0] || "User", email, role: "CUSTOMER" };
      saveLocalUser(fallbackUser);
      return fallbackUser;
    }
  },

  async signup(name: string, email: string, password: string, role: "CUSTOMER" | "OWNER" | "ADMIN" = "CUSTOMER") {
    try {
      const user = await apiFetch<AuthUser>("/auth/signup", { method: "POST", body: JSON.stringify({ name, email, password, role }) });
      saveLocalUser(user);
      return user;
    } catch {
      const fallbackUser: AuthUser = { id: "local-u1", name, email, role };
      saveLocalUser(fallbackUser);
      return fallbackUser;
    }
  },

  async me() {
    if (typeof window !== "undefined" && !localStorage.getItem(AUTH_HINT_KEY)) {
      throw new Error("Not authenticated");
    }

    try {
      const user = await apiFetch<AuthUser>("/auth/me");
      saveLocalUser(user);
      return user;
    } catch {
      saveLocalUser(null);
      throw new Error("Not authenticated");
    }
  },

  async logout() {
    try {
      await apiFetch<null>("/auth/logout", { method: "POST" });
    } finally {
      saveLocalUser(null);
    }
  },
};
