import { ZodError } from "zod";
import { fail } from "@/utils/api-response";

export function handleApiError(error: unknown) {
  if (error instanceof ZodError) return fail("Validation failed", error.flatten(), 422);
  if (error instanceof Error) return fail(error.message, undefined, 400);
  return fail("Unexpected error", undefined, 500);
}
