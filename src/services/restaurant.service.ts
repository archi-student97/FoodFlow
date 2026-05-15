import { menu as menuMock } from "@/mock/menu";
import { restaurants as restaurantsMock } from "@/mock/restaurants";
import { MenuItem, Restaurant } from "@/types";
import { apiFetch } from "@/services/http";

type ApiRestaurant = {
  _id: string;
  name: string;
  image?: string;
  cuisine?: string[];
  ratings?: number;
  deliveryTime?: number;
  description?: string;
};

type ApiMenu = {
  _id: string;
  restaurantId: string;
  name: string;
  category: string;
  price: number;
  image?: string;
  description?: string;
  availability?: boolean;
};

const toRestaurant = (r: ApiRestaurant): Restaurant => ({
  id: r._id,
  name: r.name,
  image: r.image || restaurantsMock[0]?.image || "",
  cuisine: r.cuisine || [],
  rating: r.ratings || 4,
  deliveryTime: `${r.deliveryTime || 30} mins`,
  priceForTwo: 400,
  description: r.description || "",
});

const toMenu = (m: ApiMenu): MenuItem => ({
  id: m._id,
  restaurantId: m.restaurantId,
  name: m.name,
  category: m.category,
  price: m.price,
  image: m.image || menuMock[0]?.image || "",
  description: m.description || "",
  isVeg: true,
});

export const restaurantService = {
  async getAll(query?: string) {
    const normalizedQuery = query?.trim().toLowerCase();
    const filterMock = () => {
      if (!normalizedQuery) return restaurantsMock;
      return restaurantsMock.filter((r) => {
        const hay = `${r.name} ${r.description} ${r.cuisine.join(" ")}`.toLowerCase();
        return hay.includes(normalizedQuery);
      });
    };

    try {
      const data = await apiFetch<{ items: ApiRestaurant[] }>(`/restaurants${query ? `?q=${encodeURIComponent(query)}` : ""}`);
      if (!data.items?.length) return filterMock();
      return data.items.map(toRestaurant);
    } catch {
      return filterMock();
    }
  },

  async getById(id: string) {
    try {
      const item = await apiFetch<ApiRestaurant>(`/restaurants/${id}`);
      return toRestaurant(item);
    } catch {
      return restaurantsMock.find((r) => r.id === id);
    }
  },

  async getMenu(restaurantId: string) {
    try {
      const items = await apiFetch<ApiMenu[]>(`/menu?restaurantId=${restaurantId}`);
      return items.map(toMenu);
    } catch {
      return menuMock.filter((m) => m.restaurantId === restaurantId);
    }
  },
};
