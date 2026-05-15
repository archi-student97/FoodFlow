"use client";

import { useEffect, useState } from "react";
import { authService, type AuthUser } from "@/services/auth.service";

const AUTH_HINT_KEY = "foodflow_logged_in";

export function useAuthUser() {
  const [user, setUser] = useState<AuthUser | null>(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    let mounted = true;

    const syncUser = async () => {
      const authHint = typeof window !== "undefined" ? localStorage.getItem(AUTH_HINT_KEY) : null;
      if (!authHint) {
        if (!mounted) return;
        setUser(null);
        setLoading(false);
        return;
      }

      try {
        const data = await authService.me();
        if (!mounted) return;
        setUser(data);
      } catch {
        if (!mounted) return;
        setUser(null);
        localStorage.removeItem(AUTH_HINT_KEY);
      } finally {
        if (!mounted) return;
        setLoading(false);
      }
    };

    void syncUser();

    const onAuthChanged = () => {
      const authHint = typeof window !== "undefined" ? localStorage.getItem(AUTH_HINT_KEY) : null;
      if (!authHint) {
        setUser(null);
        setLoading(false);
        return;
      }
      setLoading(true);
      void syncUser();
    };

    window.addEventListener("auth-changed", onAuthChanged);

    return () => {
      mounted = false;
      window.removeEventListener("auth-changed", onAuthChanged);
    };
  }, []);

  return { user, loading, isLoggedIn: Boolean(user) };
}
