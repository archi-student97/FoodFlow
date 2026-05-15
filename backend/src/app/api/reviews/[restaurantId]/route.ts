import { connectDB } from "@/lib/db";
import { reviewService } from "@/services/review.service";
import { ok } from "@/utils/api-response";
import { handleApiError } from "@/utils/error";

export async function GET(_: Request, { params }: { params: Promise<{ restaurantId: string }> }) {
  try {
    await connectDB();
    const data = await reviewService.listByRestaurant((await params).restaurantId);
    return ok("Reviews fetched", data);
  } catch (error) {
    return handleApiError(error);
  }
}
