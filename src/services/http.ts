const API_PREFIX = "/bapi";

function appOrigin() {
  if (typeof window !== "undefined") return "";
  return process.env.NEXT_PUBLIC_APP_URL || "http://localhost:3000";
}

export async function apiFetch<T>(path: string, init?: RequestInit): Promise<T> {
  const res = await fetch(`${appOrigin()}${API_PREFIX}${path}`, {
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
}
