import { NextResponse } from "next/server";

export function ok<T>(message: string, data?: T, status = 200) {
  return NextResponse.json({ success: true, message, data }, { status });
}

export function fail(message: string, error?: unknown, status = 400) {
  return NextResponse.json({ success: false, message, error }, { status });
}
