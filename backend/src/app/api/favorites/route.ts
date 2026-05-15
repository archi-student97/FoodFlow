import { connectDB } from "@/lib/db";
import { FavoriteModel } from "@/models/Favorite";
import { requireAuth } from "@/middleware/require-auth";
import { ok } from "@/utils/api-response";
import { handleApiError } from "@/utils/error";

export async function POST(req: Request) {
  try {
    const auth = await requireAuth(["CUSTOMER", "ADMIN"]);
    if (auth.error) return auth.error;
    await connectDB();
    const { restaurantId } = await req.json() as { restaurantId: string };
    const data = await FavoriteModel.findOneAndUpdate(
      { userId: auth.user!.userId },
      { $addToSet: { restaurantIds: restaurantId } },
      { new: true, upsert: true },
    ).lean();
    return ok("Favorite added", data);
  } catch (error) {
    return handleApiError(error);
  }
}
