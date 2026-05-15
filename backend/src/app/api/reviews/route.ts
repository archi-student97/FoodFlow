import { connectDB } from "@/lib/db";
import { reviewService } from "@/services/review.service";
import { reviewSchema } from "@/validations/review.validation";
import { ok } from "@/utils/api-response";
import { handleApiError } from "@/utils/error";
import { requireAuth } from "@/middleware/require-auth";

export async function POST(req: Request) {
  try {
    const auth = await requireAuth(["CUSTOMER", "ADMIN"]);
    if (auth.error) return auth.error;
    await connectDB();
    const body = reviewSchema.parse(await req.json());
    const created = await reviewService.create({ ...body, userId: auth.user!.userId });
    return ok("Review created", created, 201);
  } catch (error) {
    return handleApiError(error);
  }
}
