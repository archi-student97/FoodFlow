import { connectDB } from "@/lib/db";
import { authService } from "@/services/auth.service";
import { signupSchema } from "@/validations/auth.validation";
import { handleApiError } from "@/utils/error";
import { ok } from "@/utils/api-response";

export async function POST(req: Request) {
  try {
    await connectDB();
    const body = signupSchema.parse(await req.json());
    const user = await authService.signup(body);
    return ok("Signup successful", user, 201);
  } catch (error) {
    return handleApiError(error);
  }
}
