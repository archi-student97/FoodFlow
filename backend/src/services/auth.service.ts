import { cookies } from "next/headers";
import { COOKIE_NAME } from "@/constants/common";
import { comparePassword, hashPassword } from "@/lib/password";
import { signToken } from "@/lib/jwt";
import { userRepository } from "@/repositories/user.repository";

export const authService = {
  async signup(input: { name: string; email: string; password: string; role: "CUSTOMER" | "OWNER" | "ADMIN" }) {
    const exists = await userRepository.findByEmail(input.email);
    if (exists) throw new Error("Email already exists");
    const created = await userRepository.create({ ...input, password: await hashPassword(input.password), email: input.email.toLowerCase() });
    const token = signToken({ userId: created._id.toString(), email: created.email, role: created.role, name: created.name });
    const store = await cookies();
    store.set(COOKIE_NAME, token, { httpOnly: true, secure: process.env.NODE_ENV === "production", sameSite: "lax", path: "/", maxAge: 60 * 60 * 24 * 7 });
    return { id: created._id.toString(), name: created.name, email: created.email, role: created.role };
  },
  async login(input: { email: string; password: string }) {
    const user = await userRepository.findByEmail(input.email.toLowerCase()) as { _id: { toString(): string }; email: string; role: "CUSTOMER" | "OWNER" | "ADMIN"; name: string; password: string } | null;
    if (!user) throw new Error("Invalid credentials");
    const valid = await comparePassword(input.password, user.password);
    if (!valid) throw new Error("Invalid credentials");
    const token = signToken({ userId: user._id.toString(), email: user.email, role: user.role, name: user.name });
    const store = await cookies();
    store.set(COOKIE_NAME, token, { httpOnly: true, secure: process.env.NODE_ENV === "production", sameSite: "lax", path: "/", maxAge: 60 * 60 * 24 * 7 });
    return { id: user._id.toString(), name: user.name, email: user.email, role: user.role };
  },
  async logout() {
    const store = await cookies();
    store.set(COOKIE_NAME, "", {
      httpOnly: true,
      secure: process.env.NODE_ENV === "production",
      sameSite: "lax",
      path: "/",
      expires: new Date(0),
      maxAge: 0,
    });
  },
};
