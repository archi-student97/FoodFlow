"use client";

import { Button } from "@/components/ui/button";
import { useCartStore } from "@/store/cart.store";
import { useRouter } from "next/navigation";
import { useAuthUser } from "@/hooks/use-auth-user";
import { toast } from "sonner";

export function PriceSummary() {
  const items = useCartStore((s) => s.items);
  const router = useRouter();
  const { isLoggedIn, loading } = useAuthUser();
  const subtotal = items.reduce((a, b) => a + b.price * b.quantity, 0);
  const delivery = subtotal ? 39 : 0;
  const platformFee = subtotal ? 9 : 0;
  const total = subtotal + delivery + platformFee;
  const canCheckout = items.length > 0 && isLoggedIn;

  const proceed = () => {
    if (!items.length) {
      toast.error("Add items to cart first.");
      return;
    }
    if (!isLoggedIn) {
      toast.error("Please login or sign up before checkout.");
      router.push("/login");
      return;
    }
    router.push("/checkout");
  };

  return (
    <div className="rounded-2xl border border-white/70 bg-white/95 p-5 shadow-[0_10px_25px_rgba(2,6,23,0.08)]">
      <h3 className="text-lg font-bold">Price Summary</h3>
      <div className="mt-4 space-y-2 text-sm">
        <p className="flex justify-between"><span className="text-zinc-600">Subtotal</span><span className="font-medium">Rs {subtotal}</span></p>
        <p className="flex justify-between"><span className="text-zinc-600">Delivery</span><span className="font-medium">Rs {delivery}</span></p>
        <p className="flex justify-between"><span className="text-zinc-600">Platform Fee</span><span className="font-medium">Rs {platformFee}</span></p>
        <p className="flex justify-between border-t pt-3 text-base font-bold"><span>Total</span><span>Rs {total}</span></p>
      </div>
      <Button className="mt-4 w-full" onClick={proceed} disabled={loading || !canCheckout}>
        {loading ? "Checking..." : "Proceed to Checkout"}
      </Button>
    </div>
  );
}
