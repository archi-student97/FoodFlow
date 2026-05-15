import { connectDB } from "@/lib/db";
import { FavoriteModel } from "@/models/Favorite";
import { requireAuth } from "@/middleware/require-auth";
import { ok } from "@/utils/api-response";
import { handleApiError } from "@/utils/error";

export async function DELETE(_: Request, { params }: { params: Promise<{ id: string }> }) {
  try {
    const auth = await requireAuth(["CUSTOMER", "ADMIN"]);
    if (auth.error) return auth.error;
    await connectDB();
    const data = await FavoriteModel.findOneAndUpdate(
      { userId: auth.user!.userId },
      { $pull: { restaurantIds: (await params).id } },
      { new: true },
    ).lean();
    return ok("Favorite removed", data);
  } catch (error) {
    return handleApiError(error);
  }
}
