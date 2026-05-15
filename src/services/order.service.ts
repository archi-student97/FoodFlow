import { orders as ordersMock } from "@/mock/orders";
import { Order } from "@/types";
import { apiFetch } from "@/services/http";

type ApiOrder = { _id: string; restaurantId: string; totalPrice: number; orderStatus: "placed" | "preparing" | "delivered" | "PLACED" | "PREPARING" | "DELIVERED"; createdAt: string };
const HIDDEN_ORDERS_KEY = "foodflow_hidden_orders";

const statusMap = (s: ApiOrder["orderStatus"]) => String(s).toLowerCase() as Order["status"];

function getHiddenOrderIds() {
  if (typeof window === "undefined") return new Set<string>();
  try {
    const raw = localStorage.getItem(HIDDEN_ORDERS_KEY);
    if (!raw) return new Set<string>();
    const parsed = JSON.parse(raw) as string[];
    return new Set(parsed);
  } catch {
    return new Set<string>();
  }
}

function saveHiddenOrderIds(ids: Set<string>) {
  if (typeof window === "undefined") return;
  localStorage.setItem(HIDDEN_ORDERS_KEY, JSON.stringify(Array.from(ids)));
}

export const orderService = {
  async getAll(): Promise<Order[]> {
    const hiddenIds = getHiddenOrderIds();

    try {
      const data = await apiFetch<ApiOrder[]>("/orders");
      return data.map((o) => ({
        id: o._id,
        restaurantName: `Restaurant ${o.restaurantId.slice(-4)}`,
        total: o.totalPrice,
        status: statusMap(o.orderStatus),
        createdAt: new Date(o.createdAt).toLocaleDateString(),
      })).filter((o) => !hiddenIds.has(o.id));
    } catch {
      return ordersMock.filter((o) => !hiddenIds.has(o.id));
    }
  },

  async remove(orderId: string) {
    try {
      await apiFetch<null>(`/orders/${orderId}`, { method: "DELETE" });
    } catch {
      // Backend may not expose DELETE for customer yet. We still remove from local account view.
    } finally {
      const hiddenIds = getHiddenOrderIds();
      hiddenIds.add(orderId);
      saveHiddenOrderIds(hiddenIds);
    }
  },
};
