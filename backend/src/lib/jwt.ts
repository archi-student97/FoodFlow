import jwt, { Secret, SignOptions } from "jsonwebtoken";
import { env } from "@/config/env";
import { AppRole } from "@/constants/roles";

export interface JwtPayload {
  userId: string;
  email: string;
  role: AppRole;
  name: string;
}

export function signToken(payload: JwtPayload) {
  const secret: Secret = env.JWT_SECRET;
  const options: SignOptions = { expiresIn: env.JWT_EXPIRES_IN as SignOptions["expiresIn"] };
  return jwt.sign(payload, secret, options);
}

export function verifyToken(token?: string): JwtPayload | null {
  if (!token) return null;
  try {
    return jwt.verify(token, env.JWT_SECRET) as JwtPayload;
  } catch {
    return null;
  }
}
