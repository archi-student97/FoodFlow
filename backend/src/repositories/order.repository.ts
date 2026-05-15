import { OrderModel } from "@/models/Order";

export const orderRepository = {
  create: (payload: Record<string, unknown>) => OrderModel.create(payload),
  listByUser: (userId: string) => OrderModel.find({ userId }).sort({ createdAt: -1 }).lean(),
  listAll: () => OrderModel.find().sort({ createdAt: -1 }).lean(),
  update: (id: string, payload: Record<string, unknown>) => OrderModel.findByIdAndUpdate(id, payload, { new: true }).lean(),
};
