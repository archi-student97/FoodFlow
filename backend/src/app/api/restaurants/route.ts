import { connectDB } from "@/lib/db";
import { restaurantRepository } from "@/repositories/restaurant.repository";
import { restaurantService } from "@/services/restaurant.service";
import { restaurantSchema } from "@/validations/restaurant.validation";
import { handleApiError } from "@/utils/error";
import { ok } from "@/utils/api-response";
import { requireAuth } from "@/middleware/require-auth";

export async function GET(req: Request) {
  try {
    await connectDB();
    const { searchParams } = new URL(req.url);
    const data = await restaurantService.list({
      q: searchParams.get("q"),
      cuisine: searchParams.get("cuisine"),
      page: searchParams.get("page"),
      limit: searchParams.get("limit"),
    });
    return ok("Restaurants fetched", data);
  } catch (error) {
    return handleApiError(error);
  }
}

export async function POST(req: Request) {
  try {
    const auth = await requireAuth(["OWNER", "ADMIN"]);
    if (auth.error) return auth.error;
    await connectDB();
    const body = restaurantSchema.parse(await req.json());
    const created = await restaurantRepository.create({ ...body, ownerId: auth.user!.userId });
    return ok("Restaurant created", created, 201);
  } catch (error) {
    return handleApiError(error);
  }
}
