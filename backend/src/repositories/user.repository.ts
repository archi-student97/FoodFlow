import { UserModel } from "@/models/User";

export const userRepository = {
  findByEmail: (email: string) => UserModel.findOne({ email }).lean(),
  findById: (id: string) => UserModel.findById(id).select("-password").lean(),
  create: (payload: Record<string, unknown>) => UserModel.create(payload),
  list: () => UserModel.find().select("-password").lean(),
};
