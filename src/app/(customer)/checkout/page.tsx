"use client";

import { useEffect } from "react";
import { MapPin, Phone } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { useRouter } from "next/navigation";
import { useAuthUser } from "@/hooks/use-auth-user";

export default function CheckoutPage() {
  const router = useRouter();
  const { isLoggedIn, loading } = useAuthUser();

  useEffect(() => {
    if (!loading && !isLoggedIn) {
      router.replace("/login");
    }
  }, [isLoggedIn, loading, router]);

  if (loading) {
    return <div className="rounded-2xl border bg-white p-6 text-sm text-zinc-600">Checking login status...</div>;
  }

  if (!isLoggedIn) {
    return (
      <div className="rounded-2xl border bg-white p-6">
        <h1 className="text-2xl font-bold">Login required</h1>
        <p className="mt-2 text-zinc-600">Please login or sign up to place an order.</p>
        <Button className="mt-4" onClick={() => router.push("/login")}>Go to Login</Button>
      </div>
    );
  }

  return (
    <div className="mx-auto max-w-3xl space-y-5">
      <div className="rounded-3xl border border-white/60 bg-gradient-to-r from-zinc-900 via-zinc-800 to-zinc-900 p-6 text-white">
        <h1 className="text-3xl font-extrabold">Checkout</h1>
        <p className="mt-1 text-sm text-zinc-300">Confirm delivery details for a smooth order experience.</p>
      </div>

      <div className="rounded-2xl border border-white/80 bg-white/95 p-5 shadow-sm">
        <div className="mb-3 flex items-center gap-2 text-sm font-semibold text-zinc-700"><MapPin className="h-4 w-4 text-orange-500" /> Delivery Address</div>
        <Input placeholder="Flat / Street / Landmark" />
        <div className="mb-3 mt-4 flex items-center gap-2 text-sm font-semibold text-zinc-700"><Phone className="h-4 w-4 text-orange-500" /> Contact Number</div>
        <Input placeholder="Phone Number" />
        <Button className="mt-5 w-full">Place Order (Mock)</Button>
      </div>
    </div>
  );
}
