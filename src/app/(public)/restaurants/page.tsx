"use client";
import { useEffect, useMemo, useState } from "react";
import { restaurantService } from "@/services/restaurant.service";
import { Restaurant } from "@/types";
import { RestaurantCard } from "@/components/restaurant/restaurant-card";
import { SearchBar } from "@/components/shared/search-bar";
import { FilterSection } from "@/components/shared/filter-section";
import { useUIStore } from "@/store/ui.store";
import { Skeleton } from "@/components/ui/skeleton";

export default function RestaurantsPage() {
  const [items, setItems] = useState<Restaurant[]>([]);
  const [loading, setLoading] = useState(true);
  const query = useUIStore((s) => s.query);
  const cuisine = useUIStore((s) => s.cuisine);

  useEffect(() => {
    let mounted = true;
    restaurantService.getAll().then((d) => {
      if (!mounted) return;
      setItems(d);
      setLoading(false);
    });
    return () => {
      mounted = false;
    };
  }, []);

  const queryFiltered = useMemo(() => {
    const normalized = query.trim().toLowerCase();
    if (!normalized) return items;

    const underMatch = normalized.match(/under\s*(rs\.?\s*)?(\d+)/i);
    const budget = underMatch ? Number(underMatch[2]) : null;

    return items.filter((r) => {
      const hay = `${r.name} ${r.description} ${r.cuisine.join(" ")}`.toLowerCase();
      const textOk = hay.includes(normalized);
      const budgetOk = budget ? r.priceForTwo <= budget * 2 : false;
      return textOk || budgetOk;
    });
  }, [items, query]);

  const filtered = useMemo(
    () => cuisine === "All" ? queryFiltered : queryFiltered.filter((r) => r.cuisine.join(" ").toLowerCase().includes(cuisine.toLowerCase())),
    [queryFiltered, cuisine],
  );

  return <div className="space-y-4"><h1 className="text-3xl font-bold">Restaurants</h1><SearchBar /><FilterSection /><div className="grid gap-4 md:grid-cols-2 lg:grid-cols-3">{loading ? Array.from({ length: 6 }).map((_, i) => <Skeleton key={i} className="h-56" />) : filtered.map((r) => <RestaurantCard key={r.id} restaurant={r} />)}</div>{!loading && filtered.length === 0 ? <p className="rounded-xl border border-orange-100 bg-white/80 p-4 text-sm text-zinc-600">No restaurants matched this search/filter. Try removing cuisine filter or searching like <span className="font-semibold">biryani</span> / <span className="font-semibold">under 400</span>.</p> : null}</div>;
}
