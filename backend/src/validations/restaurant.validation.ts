import { z } from "zod";

export const restaurantSchema = z.object({
  name: z.string().min(2),
  description: z.string().min(10),
  image: z.string().url().optional().or(z.literal("")),
  cuisine: z.array(z.string()).default([]),
  address: z.string().min(4),
  deliveryTime: z.number().min(10).max(120).default(30),
});
