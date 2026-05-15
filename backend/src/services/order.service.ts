import { MenuModel } from "@/models/MenuItem";
import { orderRepository } from "@/repositories/order.repository";

export const orderService = {
  async createOrder(input: { userId: string; restaurantId: string; items: { menuItemId: string; quantity: number }[]; deliveryAddress: string }) {
    const menuItems = await MenuModel.find({ _id: { $in: input.items.map((x) => x.menuItemId) } }).lean();
    const items = input.items.map((x) => {
      const found = menuItems.find((m) => m._id.toString() === x.menuItemId);
      return { menuItemId: x.menuItemId, quantity: x.quantity, price: found?.price || 0, name: found?.name || "Unknown" };
    });
    const totalPrice = items.reduce((sum, i) => sum + i.price * i.quantity, 0);
    return orderRepository.create({ ...input, items, totalPrice });
  },
};
