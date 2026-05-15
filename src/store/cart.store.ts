import { create } from "zustand";
import { MenuItem } from "@/types";

interface CartState { items: (MenuItem & { quantity: number })[]; add: (item: MenuItem) => void; inc: (id: string) => void; dec: (id: string) => void; }

export const useCartStore = create<CartState>((set) => ({
  items: [],
  add: (item) => set((s) => { const e = s.items.find((i) => i.id === item.id); if (e) return { items: s.items.map((i) => i.id === item.id ? { ...i, quantity: i.quantity + 1 } : i) }; return { items: [...s.items, { ...item, quantity: 1 }] }; }),
  inc: (id) => set((s) => ({ items: s.items.map((i) => i.id === id ? { ...i, quantity: i.quantity + 1 } : i) })),
  dec: (id) => set((s) => ({
    items: s.items.flatMap((i) => {
      if (i.id !== id) return [i];
      if (i.quantity <= 1) return [];
      return [{ ...i, quantity: i.quantity - 1 }];
    }),
  })),
}));
