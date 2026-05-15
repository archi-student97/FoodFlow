"use client";

import { useEffect, useRef, useState } from "react";
import { authService, type AuthUser } from "@/services/auth.service";

const AUTH_HINT_KEY = "foodflow_logged_in";

export function useAuthUser() {
  const [user, setUser] = useState<AuthUser | null>(null);
  const [loading, setLoading] = useState(true);
  const requestVersionRef = useRef(0);

  useEffect(() => {
    let mounted = true;

    const syncUser = async () => {
      const requestVersion = ++requestVersionRef.current;
      const authHint = typeof window !== "undefined" ? localStorage.getItem(AUTH_HINT_KEY) : null;
      if (!authHint) {
        if (!mounted || requestVersion !== requestVersionRef.current) return;
        setUser(null);
        setLoading(false);
        return;
      }

      try {
        const data = await authService.me();
        if (!mounted || requestVersion !== requestVersionRef.current) return;
        setUser(data);
      } catch {
        if (!mounted || requestVersion !== requestVersionRef.current) return;
        setUser(null);
        localStorage.removeItem(AUTH_HINT_KEY);
      } finally {
        if (!mounted || requestVersion !== requestVersionRef.current) return;
        setLoading(false);
      }
    };

    void syncUser();

    const onAuthChanged = () => {
      const authHint = typeof window !== "undefined" ? localStorage.getItem(AUTH_HINT_KEY) : null;
      if (!authHint) {
        requestVersionRef.current += 1;
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
