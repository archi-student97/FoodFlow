import { ReviewModel } from "@/models/Review";

export const reviewService = {
  create: (payload: Record<string, unknown>) => ReviewModel.create(payload),
  listByRestaurant: (restaurantId: string) => ReviewModel.find({ restaurantId }).sort({ createdAt: -1 }).lean(),
};
