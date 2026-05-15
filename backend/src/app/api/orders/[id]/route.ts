import { connectDB } from "@/lib/db";
import { orderRepository } from "@/repositories/order.repository";
import { requireAuth } from "@/middleware/require-auth";
import { orderUpdateSchema } from "@/validations/order.validation";
import { ok } from "@/utils/api-response";
import { handleApiError } from "@/utils/error";

export async function PUT(req: Request, { params }: { params: Promise<{ id: string }> }) {
  try {
    const auth = await requireAuth(["OWNER", "ADMIN"]);
    if (auth.error) return auth.error;
    await connectDB();
    const body = orderUpdateSchema.parse(await req.json());
    const updated = await orderRepository.update((await params).id, body);
    return ok("Order updated", updated);
  } catch (error) {
    return handleApiError(error);
  }
}
