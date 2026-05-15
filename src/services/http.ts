const API_PREFIX = "/bapi";

function appOrigin() {
  if (typeof window !== "undefined") return "";
  return process.env.NEXT_PUBLIC_APP_URL || "http://localhost:3000";
}

export async function apiFetch<T>(path: string, init?: RequestInit): Promise<T> {
  const url = `${appOrigin()}${API_PREFIX}${path}`;
  const attempts = 3;
  let lastError: unknown;

  for (let i = 0; i < attempts; i++) {
    try {
      const res = await fetch(url, {
        ...init,
        headers: {
          "Content-Type": "application/json",
          ...(init?.headers || {}),
        },
        cache: "no-store",
        credentials: "include",
      });

      const payload = await res.json();
      if (!res.ok || payload?.success === false) {
        throw new Error(payload?.message || "API request failed");
      }

      return payload.data as T;
    } catch (error) {
      lastError = error;
      if (i < attempts - 1) {
        await new Promise((resolve) => setTimeout(resolve, 350));
        continue;
      }
    }
  }

  throw lastError instanceof Error ? lastError : new Error("API request failed");
}
