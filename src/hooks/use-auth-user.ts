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
      try {
        const data = await authService.me();
        if (!mounted) return;
        setUser(data);
        localStorage.setItem(AUTH_HINT_KEY, "1");
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
