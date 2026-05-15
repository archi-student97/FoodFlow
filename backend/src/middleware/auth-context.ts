import { cookies } from "next/headers";
import { COOKIE_NAME } from "@/constants/common";
import { verifyToken } from "@/lib/jwt";

export async function getAuthUser() {
  const store = await cookies();
  return verifyToken(store.get(COOKIE_NAME)?.value);
}
