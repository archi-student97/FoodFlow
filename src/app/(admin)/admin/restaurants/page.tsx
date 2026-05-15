"use client";

import { useState } from "react";
import { restaurants as initialRestaurants } from "@/mock/restaurants";
import { Restaurant } from "@/types";

type NewRestaurant = {
  name: string;
  cuisine: string;
  deliveryTime: string;
  priceForTwo: string;
};

export default function AdminRestaurantsPage() {
  const [items, setItems] = useState<Restaurant[]>(initialRestaurants);
  const [form, setForm] = useState<NewRestaurant>({
    name: "",
    cuisine: "",
    deliveryTime: "",
    priceForTwo: "",
  });

  const addRestaurant = () => {
    const priceForTwo = Number(form.priceForTwo);
    if (!form.name.trim() || !form.cuisine.trim() || !form.deliveryTime.trim() || !priceForTwo) return;

    const item: Restaurant = {
      id: `r_${Date.now()}`,
      name: form.name.trim(),
      image: "https://images.unsplash.com/photo-1517248135467-4c7edcad34c4",
      cuisine: form.cuisine.split(",").map((x) => x.trim()).filter(Boolean),
      rating: 4.2,
      deliveryTime: form.deliveryTime.trim(),
      priceForTwo,
      description: "Added by admin",
    };

    setItems((prev) => [item, ...prev]);
    setForm({ name: "", cuisine: "", deliveryTime: "", priceForTwo: "" });
  };

  const deleteRestaurant = (id: string) => {
    setItems((prev) => prev.filter((r) => r.id !== id));
  };

  return (
    <div className="space-y-4">
      <h1 className="text-2xl font-bold">Restaurant Management (Admin)</h1>

      <div className="rounded-2xl border bg-white p-4">
        <h2 className="mb-3 text-lg font-bold">Add Restaurant</h2>
        <div className="grid gap-2 md:grid-cols-4">
          <input className="h-10 rounded-xl border border-zinc-200 px-3 text-sm" placeholder="Restaurant name" value={form.name} onChange={(e) => setForm((f) => ({ ...f, name: e.target.value }))} />
          <input className="h-10 rounded-xl border border-zinc-200 px-3 text-sm" placeholder="Cuisine (comma separated)" value={form.cuisine} onChange={(e) => setForm((f) => ({ ...f, cuisine: e.target.value }))} />
          <input className="h-10 rounded-xl border border-zinc-200 px-3 text-sm" placeholder="Delivery time (e.g. 25 mins)" value={form.deliveryTime} onChange={(e) => setForm((f) => ({ ...f, deliveryTime: e.target.value }))} />
          <input className="h-10 rounded-xl border border-zinc-200 px-3 text-sm" placeholder="Price for two" type="number" value={form.priceForTwo} onChange={(e) => setForm((f) => ({ ...f, priceForTwo: e.target.value }))} />
        </div>
        <button type="button" onClick={addRestaurant} className="mt-3 h-10 rounded-xl bg-gradient-to-r from-orange-500 to-rose-500 px-4 text-sm font-semibold text-white">Add Restaurant</button>
      </div>

      <div className="space-y-3">
        {items.map((r) => (
          <div key={r.id} className="rounded-xl border bg-white p-3">
            <div className="flex flex-wrap items-start justify-between gap-2">
              <div>
                <p className="font-semibold">{r.name}</p>
                <p className="text-xs text-zinc-500">{r.rating} rating | {r.deliveryTime} | Rs {r.priceForTwo} for two</p>
                <p className="text-xs text-zinc-500">{r.cuisine.join(", ")}</p>
              </div>
              <button type="button" onClick={() => deleteRestaurant(r.id)} className="rounded-lg border border-red-200 px-3 py-1.5 text-sm font-semibold text-red-600 hover:bg-red-50">Delete</button>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
}
