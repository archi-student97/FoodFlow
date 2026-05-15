"use client";
import { useState } from "react";
import { SearchBar } from "@/components/shared/search-bar";
import { Card } from "@/components/ui/card";
import Link from "next/link";
import { ArrowRight, Clock3, Sparkles, TrendingUp } from "lucide-react";
import { restaurants } from "@/mock/restaurants";

type Recommendation = {
  name: string;
  reason: string;
};

export default function SearchPage() {
  const [items, setItems] = useState<Recommendation[]>([]);
  const [loading, setLoading] = useState(false);
  const [activeQuery, setActiveQuery] = useState("");

  const quickPrompts = [
    "Biryani under Rs 350",
    "Healthy high-protein dinner",
    "Late night snacks",
    "Best veg thali nearby",
    "Spicy rolls and kebabs",
  ];

  const runSearch = async (query: string) => {
    if (!query) return;
    setActiveQuery(query);
    setLoading(true);

    const q = query.toLowerCase();
    const ranked = restaurants
      .map((restaurant) => {
        const cuisineText = restaurant.cuisine.join(" ").toLowerCase();
        const descriptionText = restaurant.description.toLowerCase();
        const score =
          Number(restaurant.name.toLowerCase().includes(q)) * 5 +
          Number(cuisineText.includes(q)) * 3 +
          Number(descriptionText.includes(q)) * 2;

        return {
          restaurant,
          score,
          reason: `${restaurant.cuisine.join(", ")} | ${restaurant.deliveryTime} delivery | Rs ${restaurant.priceForTwo} for two`,
        };
      })
      .sort((a, b) => b.score - a.score || b.restaurant.rating - a.restaurant.rating)
      .slice(0, 6)
      .map((item) => ({ name: item.restaurant.name, reason: item.reason }));

    setTimeout(() => {
      setItems(ranked);
      setLoading(false);
    }, 350);
  };

  return (
    <div className="space-y-7">
      <section className="relative overflow-hidden rounded-3xl border border-orange-100 bg-[linear-gradient(120deg,#fff7ed_0%,#ffffff_35%,#ffe9e3_100%)] p-5 shadow-[0_20px_60px_rgba(251,146,60,0.15)] md:p-8">
        <div className="absolute -right-16 -top-16 h-52 w-52 rounded-full bg-orange-300/30 blur-3xl" />
        <div className="absolute -bottom-14 left-8 h-44 w-44 rounded-full bg-rose-300/25 blur-3xl" />
        <div className="relative z-10">
          <p className="mb-3 inline-flex items-center gap-2 rounded-full bg-white/90 px-3 py-1 text-xs font-bold uppercase tracking-wide text-orange-700">
            <Sparkles className="h-3.5 w-3.5" />
            Smart Discovery Mode
          </p>
          <h1 className="font-[var(--font-sora)] text-3xl font-extrabold leading-tight text-zinc-900 md:text-5xl">Find your next meal in seconds</h1>
          <p className="mt-3 max-w-2xl text-sm text-zinc-600 md:text-base">Type your mood, budget, or craving and get smart recommendations instantly, just like top food delivery apps.</p>
          <div className="mt-6">
            <SearchBar onSearch={runSearch} placeholder="Try: Butter chicken under Rs 400" />
          </div>
          <div className="mt-5 flex flex-wrap gap-2">
            {quickPrompts.map((prompt) => (
              <button
                key={prompt}
                type="button"
                onClick={() => runSearch(prompt)}
                className="rounded-full border border-orange-200 bg-white/90 px-3 py-1.5 text-xs font-semibold text-zinc-700 transition hover:border-orange-300 hover:bg-orange-50 hover:text-orange-700"
              >
                {prompt}
              </button>
            ))}
          </div>
        </div>
      </section>

      <section className="grid gap-4 md:grid-cols-3">
        <button
          type="button"
          onClick={() => runSearch("Trending food this week")}
          className="text-left"
        >
          <Card className="rounded-2xl border-orange-100 bg-white/90 p-4 transition hover:-translate-y-0.5 hover:shadow-[0_12px_24px_rgba(249,115,22,0.14)]">
          <p className="mb-2 inline-flex h-8 w-8 items-center justify-center rounded-lg bg-orange-100 text-orange-700"><TrendingUp className="h-4 w-4" /></p>
          <p className="text-sm font-bold text-zinc-900">Trending Now</p>
          <p className="text-sm text-zinc-600">Street bowls, biryani combos, and quick bites are booming this week.</p>
          </Card>
        </button>
        <button
          type="button"
          onClick={() => runSearch("Fast delivery under 25 mins")}
          className="text-left"
        >
          <Card className="rounded-2xl border-orange-100 bg-white/90 p-4 transition hover:-translate-y-0.5 hover:shadow-[0_12px_24px_rgba(249,115,22,0.14)]">
          <p className="mb-2 inline-flex h-8 w-8 items-center justify-center rounded-lg bg-amber-100 text-amber-700"><Clock3 className="h-4 w-4" /></p>
          <p className="text-sm font-bold text-zinc-900">Fast Delivery Picks</p>
          <p className="text-sm text-zinc-600">Use prompts like &ldquo;under 25 mins&rdquo; to prioritize speed.</p>
          </Card>
        </button>
        <button
          type="button"
          onClick={() => runSearch("Family meal under Rs 700")}
          className="text-left"
        >
          <Card className="rounded-2xl border-orange-100 bg-white/90 p-4 transition hover:-translate-y-0.5 hover:shadow-[0_12px_24px_rgba(249,115,22,0.14)]">
          <p className="mb-2 inline-flex h-8 w-8 items-center justify-center rounded-lg bg-rose-100 text-rose-700"><Sparkles className="h-4 w-4" /></p>
          <p className="text-sm font-bold text-zinc-900">Budget Smart</p>
          <p className="text-sm text-zinc-600">Try &ldquo;family meal under Rs 700&rdquo; for value-first options.</p>
          </Card>
        </button>
      </section>

      {loading && (
        <Card className="rounded-2xl border-orange-100 bg-white/90 p-4 text-sm text-zinc-600">
          Searching for <span className="font-semibold text-zinc-900">&ldquo;{activeQuery}&rdquo;</span>...
        </Card>
      )}

      <div className="space-y-3">
        {items.map((item, index) => (
          <Card key={item.name} className="group rounded-2xl border border-orange-100 bg-white/95 p-4 transition hover:-translate-y-0.5 hover:shadow-[0_12px_30px_rgba(249,115,22,0.16)]">
            <div className="flex items-start justify-between gap-3">
              <div>
                <p className="font-[var(--font-sora)] text-lg font-bold text-zinc-900">{item.name}</p>
                <p className="mt-1 text-sm text-zinc-600">{item.reason}</p>
              </div>
              <p className="rounded-full bg-orange-100 px-2.5 py-1 text-xs font-bold text-orange-700">#{index + 1}</p>
            </div>
          </Card>
        ))}
        {!loading && items.length === 0 && (
          <Card className="rounded-2xl border-dashed border-orange-200 bg-white/80 p-5 text-sm text-zinc-600">
            Prompt ideas: &ldquo;Protein-rich lunch under Rs 300&rdquo; or &ldquo;Cheesy comfort food for movie night&rdquo;.
          </Card>
        )}
      </div>
      <Link href="/restaurants" className="inline-flex items-center gap-1 text-sm font-semibold text-orange-700 transition hover:text-orange-800">
        Open restaurant list <ArrowRight className="h-4 w-4" />
      </Link>
    </div>
  );
}
