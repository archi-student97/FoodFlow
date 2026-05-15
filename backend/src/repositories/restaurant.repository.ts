import { RestaurantModel } from "@/models/Restaurant";

export const restaurantRepository = {
  list: (query: Record<string, unknown>, skip: number, limit: number) => RestaurantModel.find(query).sort({ createdAt: -1 }).skip(skip).limit(limit).lean(),
  count: (query: Record<string, unknown>) => RestaurantModel.countDocuments(query),
  findById: (id: string) => RestaurantModel.findById(id).lean(),
  create: (payload: Record<string, unknown>) => RestaurantModel.create(payload),
  update: (id: string, payload: Record<string, unknown>) => RestaurantModel.findByIdAndUpdate(id, payload, { new: true }).lean(),
  remove: (id: string) => RestaurantModel.findByIdAndDelete(id),
};
