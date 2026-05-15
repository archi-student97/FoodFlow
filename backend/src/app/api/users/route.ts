import { connectDB } from "@/lib/db";
import { userRepository } from "@/repositories/user.repository";
import { requireAuth } from "@/middleware/require-auth";
import { ok } from "@/utils/api-response";
import { handleApiError } from "@/utils/error";

export async function GET() {
  try {
    const auth = await requireAuth(["ADMIN"]);
    if (auth.error) return auth.error;
    await connectDB();
    const users = await userRepository.list();
    return ok("Users fetched", users);
  } catch (error) {
    return handleApiError(error);
  }
}
