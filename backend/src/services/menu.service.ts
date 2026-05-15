import { menuRepository } from "@/repositories/menu.repository";

export const menuService = {
  list: (restaurantId?: string | null) => menuRepository.list(restaurantId ? { restaurantId } : {}),
};
