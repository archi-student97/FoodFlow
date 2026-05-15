import { userRepository } from "@/repositories/user.repository";
import { requireAuth } from "@/middleware/require-auth";
import { ok } from "@/utils/api-response";

export async function GET() {
  const auth = await requireAuth();
  if (auth.error) return auth.error;
  const user = await userRepository.findById(auth.user!.userId);
  return ok("Current user", user);
}
