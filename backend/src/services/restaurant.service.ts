import { restaurantRepository } from "@/repositories/restaurant.repository";
import { DEFAULT_PAGE_SIZE } from "@/constants/common";

export const restaurantService = {
  async list(params: { q?: string | null; cuisine?: string | null; page?: string | null; limit?: string | null }) {
    const query: Record<string, unknown> = {};
    if (params.q) query.name = { $regex: params.q, $options: "i" };
    if (params.cuisine) query.cuisine = params.cuisine;
    const page = Math.max(Number(params.page || 1), 1);
    const limit = Math.max(Number(params.limit || DEFAULT_PAGE_SIZE), 1);
    const [items, total] = await Promise.all([
      restaurantRepository.list(query, (page - 1) * limit, limit),
      restaurantRepository.count(query),
    ]);
    return { items, meta: { page, limit, total } };
  },
};
