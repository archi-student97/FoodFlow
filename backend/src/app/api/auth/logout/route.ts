import { authService } from "@/services/auth.service";
import { ok } from "@/utils/api-response";
import { handleApiError } from "@/utils/error";

export async function POST() {
  try {
    await authService.logout();
    return ok("Logout successful");
  } catch (error) {
    return handleApiError(error);
  }
}
