import { connectDB } from "@/lib/db";
import { orderRepository } from "@/repositories/order.repository";
import { orderService } from "@/services/order.service";
import { orderSchema } from "@/validations/order.validation";
import { ok } from "@/utils/api-response";
import { handleApiError } from "@/utils/error";
import { requireAuth } from "@/middleware/require-auth";

export async function GET() {
  try {
    const auth = await requireAuth();
    if (auth.error) return auth.error;
    await connectDB();
    const data = auth.user!.role === "ADMIN" ? await orderRepository.listAll() : await orderRepository.listByUser(auth.user!.userId);
    return ok("Orders fetched", data);
  } catch (error) {
    return handleApiError(error);
  }
}

export async function POST(req: Request) {
  try {
    const auth = await requireAuth(["CUSTOMER", "ADMIN"]);
    if (auth.error) return auth.error;
    await connectDB();
    const body = orderSchema.parse(await req.json());
    const order = await orderService.createOrder({ ...body, userId: auth.user!.userId });
    return ok("Order placed", order, 201);
  } catch (error) {
    return handleApiError(error);
  }
}
