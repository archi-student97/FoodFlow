import { z } from "zod";

export const menuSchema = z.object({
  name: z.string().min(2),
  description: z.string().min(4),
  image: z.string().url().optional().or(z.literal("")),
  category: z.string().min(2),
  price: z.number().positive(),
  availability: z.boolean().default(true),
  restaurantId: z.string().min(24),
});
