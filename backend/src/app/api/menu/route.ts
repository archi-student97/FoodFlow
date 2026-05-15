import { connectDB } from "@/lib/db";
import { menuRepository } from "@/repositories/menu.repository";
import { menuService } from "@/services/menu.service";
import { menuSchema } from "@/validations/menu.validation";
import { ok } from "@/utils/api-response";
import { handleApiError } from "@/utils/error";
import { requireAuth } from "@/middleware/require-auth";

export async function GET(req: Request) {
  try {
    await connectDB();
    const { searchParams } = new URL(req.url);
    const data = await menuService.list(searchParams.get("restaurantId"));
    return ok("Menu fetched", data);
  } catch (error) { return handleApiError(error); }
}

export async function POST(req: Request) {
  try {
    const auth = await requireAuth(["OWNER", "ADMIN"]);
    if (auth.error) return auth.error;
    await connectDB();
    const body = menuSchema.parse(await req.json());
    const created = await menuRepository.create(body);
    return ok("Menu item created", created, 201);
  } catch (error) { return handleApiError(error); }
}
