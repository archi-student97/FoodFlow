"use client";

import { useMemo, useState } from "react";
import { menu as initialMenu } from "@/mock/menu";
import { MenuItem } from "@/types";

type NewDish = {
  name: string;
  category: string;
  price: string;
  isVeg: boolean;
};

function soldCount(id: string) {
  const seed = id.split("").reduce((acc, ch) => acc + ch.charCodeAt(0), 0);
  return (seed % 38) + 7;
}

export default function OwnerMenuPage() {
  const [items, setItems] = useState<MenuItem[]>(initialMenu.slice(0, 10));
  const [form, setForm] = useState<NewDish>({ name: "", category: "", price: "", isVeg: true });

  const summary = useMemo(() => {
    const units = items.reduce((acc, dish) => acc + soldCount(dish.id), 0);
    const revenue = items.reduce((acc, dish) => acc + soldCount(dish.id) * dish.price, 0);
    return { units, revenue };
  }, [items]);

  const addDish = () => {
    const price = Number(form.price);
    if (!form.name.trim() || !form.category.trim() || !price) return;

    const dish: MenuItem = {
      id: `m_${Date.now()}`,
      restaurantId: "owner_restaurant",
      name: form.name.trim(),
      category: form.category.trim(),
      price,
      image: "https://images.unsplash.com/photo-1546069901-ba9599a7e63c",
      description: `${form.category.trim()} special`,
      isVeg: form.isVeg,
    };
    setItems((prev) => [dish, ...prev]);
    setForm({ name: "", category: "", price: "", isVeg: true });
  };

  const deleteDish = (id: string) => {
    setItems((prev) => prev.filter((dish) => dish.id !== id));
  };

  return (
    <div className="space-y-5">
      <h1 className="text-2xl font-bold">Restaurant Menu Dashboard</h1>

      <div className="grid gap-4 md:grid-cols-3">
        <div className="rounded-2xl border bg-white p-4"><p className="text-sm text-zinc-500">Total Dishes</p><p className="text-2xl font-extrabold">{items.length}</p></div>
        <div className="rounded-2xl border bg-white p-4"><p className="text-sm text-zinc-500">Total Units Sold</p><p className="text-2xl font-extrabold">{summary.units}</p></div>
        <div className="rounded-2xl border bg-white p-4"><p className="text-sm text-zinc-500">Estimated Revenue</p><p className="text-2xl font-extrabold">Rs {summary.revenue.toLocaleString("en-IN")}</p></div>
      </div>

      <div className="rounded-2xl border bg-white p-4">
        <h2 className="mb-3 text-lg font-bold">Add New Dish</h2>
        <div className="grid gap-2 md:grid-cols-4">
          <input className="h-10 rounded-xl border border-zinc-200 px-3 text-sm" placeholder="Dish name" value={form.name} onChange={(e) => setForm((f) => ({ ...f, name: e.target.value }))} />
          <input className="h-10 rounded-xl border border-zinc-200 px-3 text-sm" placeholder="Category" value={form.category} onChange={(e) => setForm((f) => ({ ...f, category: e.target.value }))} />
          <input className="h-10 rounded-xl border border-zinc-200 px-3 text-sm" placeholder="Price" type="number" value={form.price} onChange={(e) => setForm((f) => ({ ...f, price: e.target.value }))} />
          <button type="button" onClick={addDish} className="h-10 rounded-xl bg-gradient-to-r from-orange-500 to-rose-500 px-4 text-sm font-semibold text-white">Add Dish</button>
        </div>
        <label className="mt-3 inline-flex items-center gap-2 text-sm text-zinc-600">
          <input type="checkbox" checked={form.isVeg} onChange={(e) => setForm((f) => ({ ...f, isVeg: e.target.checked }))} />
          Vegetarian dish
        </label>
      </div>

      <div className="space-y-3">
        {items.map((dish) => {
          const sold = soldCount(dish.id);
          return (
            <div key={dish.id} className="rounded-2xl border bg-white p-4">
              <div className="flex flex-wrap items-start justify-between gap-2">
                <div>
                  <p className="font-bold text-zinc-900">{dish.name}</p>
                  <p className="text-sm text-zinc-500">{dish.category} | Rs {dish.price} | {dish.isVeg ? "Veg" : "Non-Veg"}</p>
                  <p className="mt-1 text-sm text-zinc-700">Sold: <span className="font-semibold">{sold}</span> | Revenue: <span className="font-semibold">Rs {(sold * dish.price).toLocaleString("en-IN")}</span></p>
                </div>
                <button type="button" onClick={() => deleteDish(dish.id)} className="rounded-lg border border-red-200 px-3 py-1.5 text-sm font-semibold text-red-600 hover:bg-red-50">Delete</button>
              </div>
            </div>
          );
        })}
      </div>
    </div>
  );
}
