import { z } from "zod";

export const reviewSchema = z.object({
  restaurantId: z.string().min(24),
  rating: z.number().min(1).max(5),
  comment: z.string().min(2),
});
