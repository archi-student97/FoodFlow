import { users as usersMock } from "@/mock/users";
import { User } from "@/types";
import { apiFetch } from "@/services/http";

type ApiUser = { _id: string; name: string; email: string; role: "CUSTOMER" | "OWNER" | "ADMIN"; avatar?: string };

export const userService = {
  async getUsers(): Promise<User[]> {
    try {
      const data = await apiFetch<ApiUser[]>("/users");
      return data.map((u) => ({ id: u._id, name: u.name, email: u.email, role: u.role.toLowerCase() as User["role"], avatar: u.avatar || "" }));
    } catch {
      return usersMock;
    }
  },
};
