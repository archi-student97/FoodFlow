import { connectDB } from "@/lib/db";
import { menuRepository } from "@/repositories/menu.repository";
import { menuSchema } from "@/validations/menu.validation";
import { ok } from "@/utils/api-response";
import { handleApiError } from "@/utils/error";
import { requireAuth } from "@/middleware/require-auth";

export async function PUT(req: Request, { params }: { params: Promise<{ id: string }> }) {
  try {
    const auth = await requireAuth(["OWNER", "ADMIN"]);
    if (auth.error) return auth.error;
    await connectDB();
    const body = menuSchema.partial().parse(await req.json());
    const item = await menuRepository.update((await params).id, body);
    return ok("Menu item updated", item);
  } catch (error) {
    return handleApiError(error);
  }
}

export async function DELETE(_: Request, { params }: { params: Promise<{ id: string }> }) {
  try {
    const auth = await requireAuth(["OWNER", "ADMIN"]);
    if (auth.error) return auth.error;
    await connectDB();
    await menuRepository.remove((await params).id);
    return ok("Menu item deleted");
  } catch (error) {
    return handleApiError(error);
  }
}
