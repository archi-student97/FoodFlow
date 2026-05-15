"use client";

import { Minus, Plus, UtensilsCrossed } from "lucide-react";
import { useCartStore } from "@/store/cart.store";

export function CartItem() {
  const { items, inc, dec } = useCartStore();

  if (!items.length) {
    return (
      <div className="rounded-2xl border border-dashed border-zinc-300 bg-white/80 p-8 text-center">
        <UtensilsCrossed className="mx-auto mb-2 h-6 w-6 text-zinc-400" />
        <p className="font-medium text-zinc-700">Your cart is empty</p>
        <p className="text-sm text-zinc-500">Add some items from restaurants to continue.</p>
      </div>
    );
  }

  return (
    <div className="space-y-3">
      {items.map((i) => (
        <div key={i.id} className="flex flex-col gap-3 rounded-2xl border border-white/80 bg-white/90 p-4 shadow-sm sm:flex-row sm:items-center sm:justify-between">
          <div>
            <p className="font-semibold text-zinc-900">{i.name}</p>
            <p className="text-xs text-zinc-500">Rs {i.price} each</p>
          </div>
          <div className="flex w-fit items-center gap-2 rounded-full bg-zinc-100 px-2 py-1">
            <button onClick={() => dec(i.id)} className="rounded-full p-1 text-zinc-700 hover:bg-white" aria-label="Decrease quantity">
              <Minus className="h-4 w-4" />
            </button>
            <span className="min-w-6 text-center text-sm font-semibold">{i.quantity}</span>
            <button onClick={() => inc(i.id)} className="rounded-full p-1 text-zinc-700 hover:bg-white" aria-label="Increase quantity">
              <Plus className="h-4 w-4" />
            </button>
          </div>
        </div>
      ))}
    </div>
  );
}
