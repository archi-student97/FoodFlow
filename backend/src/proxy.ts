import { NextRequest, NextResponse } from "next/server";
import { consumeRateLimit } from "@/middleware/rate-limit";

export function proxy(req: NextRequest) {
  if (req.nextUrl.pathname.startsWith("/api/")) {
    const forwarded = req.headers.get("x-forwarded-for");
    const key = forwarded?.split(",")[0]?.trim() || "anonymous";
    const rate = consumeRateLimit(key);
    if (!rate.allowed) {
      return NextResponse.json({ success: false, message: "Too many requests", error: {} }, { status: 429 });
    }
  }
  return NextResponse.next();
}

export const config = { matcher: ["/api/:path*"] };
