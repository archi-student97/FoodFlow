import { connectDB } from "@/lib/db";
import { authService } from "@/services/auth.service";
import { loginSchema } from "@/validations/auth.validation";
import { handleApiError } from "@/utils/error";
import { ok } from "@/utils/api-response";

export async function POST(req: Request) {
  try {
    await connectDB();
    const body = loginSchema.parse(await req.json());
    const user = await authService.login(body);
    return ok("Login successful", user);
  } catch (error) {
    return handleApiError(error);
  }
}
