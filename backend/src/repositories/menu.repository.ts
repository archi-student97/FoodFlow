import { MenuModel } from "@/models/MenuItem";

export const menuRepository = {
  list: (query: Record<string, unknown>) => MenuModel.find(query).sort({ createdAt: -1 }).lean(),
  create: (payload: Record<string, unknown>) => MenuModel.create(payload),
  update: (id: string, payload: Record<string, unknown>) => MenuModel.findByIdAndUpdate(id, payload, { new: true }).lean(),
  remove: (id: string) => MenuModel.findByIdAndDelete(id),
};
