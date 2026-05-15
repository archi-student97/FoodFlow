import { AppRole } from "@/constants/roles";
import { fail } from "@/utils/api-response";
import { getAuthUser } from "@/middleware/auth-context";

export async function requireAuth(roles?: AppRole[]) {
  const user = await getAuthUser();
  if (!user) return { error: fail("Unauthorized", undefined, 401) };
  if (roles && !roles.includes(user.role)) return { error: fail("Forbidden", undefined, 403) };
  return { user };
}
