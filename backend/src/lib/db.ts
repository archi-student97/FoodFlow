import mongoose from "mongoose";
import { env } from "@/config/env";

const cached: { conn: typeof mongoose | null; promise: Promise<typeof mongoose> | null } = (global as never as { __mongo?: { conn: typeof mongoose | null; promise: Promise<typeof mongoose> | null } }).__mongo || { conn: null, promise: null };
if (!(global as never as { __mongo?: typeof cached }).__mongo) (global as never as { __mongo?: typeof cached }).__mongo = cached;

export async function connectDB() {
  if (!env.MONGODB_URI) throw new Error("Missing MONGODB_URI in environment");
  if (cached.conn) return cached.conn;
  if (!cached.promise) cached.promise = mongoose.connect(env.MONGODB_URI, { dbName: "foodflow_ai" });
  cached.conn = await cached.promise;
  return cached.conn;
}

