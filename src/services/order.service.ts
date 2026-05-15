import { orders as ordersMock } from "@/mock/orders";
import { Order } from "@/types";
import { apiFetch } from "@/services/http";

type ApiOrder = { _id: string; restaurantId: string; totalPrice: number; orderStatus: "placed" | "preparing" | "delivered" | "PLACED" | "PREPARING" | "DELIVERED"; createdAt: string };

const statusMap = (s: ApiOrder["orderStatus"]) => String(s).toLowerCase() as Order["status"];

export const orderService = {
  async getAll(): Promise<Order[]> {
    try {
      const data = await apiFetch<ApiOrder[]>("/orders");
      return data.map((o) => ({
        id: o._id,
        restaurantName: `Restaurant ${o.restaurantId.slice(-4)}`,
        total: o.totalPrice,
        status: statusMap(o.orderStatus),
        createdAt: new Date(o.createdAt).toLocaleDateString(),
      }));
    } catch {
      return ordersMock;
    }
  },
};
