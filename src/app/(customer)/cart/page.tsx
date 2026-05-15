"use client";

import Link from "next/link";
import { CartItem } from "@/components/cart/cart-item";
import { PriceSummary } from "@/components/cart/price-summary";
import { useAuthUser } from "@/hooks/use-auth-user";

export default function CartPage() {
  const { isLoggedIn, loading } = useAuthUser();

  if (loading) {
    return (
      <div className="rounded-2xl border bg-white p-6">
        <p className="text-sm text-zinc-600">Checking account...</p>
      </div>
    );
  }

  if (!isLoggedIn) {
    return (
      <div className="mx-auto max-w-lg rounded-2xl border bg-white p-6 text-center">
        <h1 className="text-2xl font-bold text-zinc-900">Login required</h1>
        <p className="mt-2 text-sm text-zinc-600">Please login to view and manage your cart items.</p>
        <Link href="/login" className="mt-4 inline-flex h-10 items-center rounded-xl bg-gradient-to-r from-orange-500 to-rose-500 px-4 text-sm font-semibold text-white">
          Go to Login
        </Link>
      </div>
    );
  }

  return (
    <div className="space-y-5">
      <div className="rounded-3xl border border-white/60 bg-gradient-to-r from-orange-500 to-rose-500 p-6 text-white">
        <h1 className="text-3xl font-extrabold">Your Cart</h1>
        <p className="mt-1 text-sm text-orange-50">Quickly review items and move to secure checkout.</p>
      </div>
      <div className="grid gap-4 lg:grid-cols-[2fr_1fr]">
        <CartItem />
        <PriceSummary />
      </div>
    </div>
  );
}
