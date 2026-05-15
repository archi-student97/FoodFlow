import { apiFetch } from "@/services/http";

export type AuthUser = { id: string; name: string; email: string; role: "CUSTOMER" | "OWNER" | "ADMIN" };
const AUTH_KEY = "foodflow_auth_user";
const AUTH_HINT_KEY = "foodflow_logged_in";

function emitAuthChanged() {
  if (typeof window === "undefined") return;
  window.dispatchEvent(new Event("auth-changed"));
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
    const user = await apiFetch<AuthUser>("/auth/login", { method: "POST", body: JSON.stringify({ email, password }) });
    saveLocalUser(user);
    emitAuthChanged();
    return user;
  },

  async signup(name: string, email: string, password: string, role: "CUSTOMER" | "OWNER" | "ADMIN" = "CUSTOMER") {
    const user = await apiFetch<AuthUser>("/auth/signup", { method: "POST", body: JSON.stringify({ name, email, password, role }) });
    saveLocalUser(user);
    emitAuthChanged();
    return user;
  },

  async me() {
    if (typeof window !== "undefined" && !localStorage.getItem(AUTH_HINT_KEY)) {
      throw new Error("Not authenticated");
    }

    const user = await apiFetch<AuthUser>("/auth/me");
    saveLocalUser(user);
    return user;
  },

  async logout() {
    try {
      await apiFetch<null>("/auth/logout", { method: "POST" });
    } finally {
      saveLocalUser(null);
      emitAuthChanged();
    }
  },
};
