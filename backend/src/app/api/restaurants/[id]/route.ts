import { connectDB } from "@/lib/db";
import { restaurantRepository } from "@/repositories/restaurant.repository";
import { restaurantSchema } from "@/validations/restaurant.validation";
import { ok, fail } from "@/utils/api-response";
import { handleApiError } from "@/utils/error";
import { requireAuth } from "@/middleware/require-auth";

export async function GET(_: Request, { params }: { params: Promise<{ id: string }> }) {
  try {
    await connectDB();
    const item = await restaurantRepository.findById((await params).id);
    if (!item) return fail("Restaurant not found", undefined, 404);
    return ok("Restaurant fetched", item);
  } catch (error) {
    return handleApiError(error);
  }
}

export async function PUT(req: Request, { params }: { params: Promise<{ id: string }> }) {
  try {
    const auth = await requireAuth(["OWNER", "ADMIN"]);
    if (auth.error) return auth.error;
    await connectDB();
    const body = restaurantSchema.partial().parse(await req.json());
    const updated = await restaurantRepository.update((await params).id, body);
    return ok("Restaurant updated", updated);
  } catch (error) {
    return handleApiError(error);
  }
}

export async function DELETE(_: Request, { params }: { params: Promise<{ id: string }> }) {
  try {
    const auth = await requireAuth(["OWNER", "ADMIN"]);
    if (auth.error) return auth.error;
    await connectDB();
    await restaurantRepository.remove((await params).id);
    return ok("Restaurant deleted");
  } catch (error) {
    return handleApiError(error);
  }
}
