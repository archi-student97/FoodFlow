import { z } from "zod";

export const orderSchema = z.object({
  restaurantId: z.string().min(24),
  items: z.array(z.object({ menuItemId: z.string().min(24), quantity: z.number().min(1).max(20) })).min(1),
  deliveryAddress: z.string().min(10),
});

export const orderUpdateSchema = z.object({
  orderStatus: z.enum(["PLACED", "PREPARING", "OUT_FOR_DELIVERY", "DELIVERED", "CANCELLED"]),
  paymentStatus: z.enum(["PENDING", "PAID", "FAILED"]).optional(),
});
