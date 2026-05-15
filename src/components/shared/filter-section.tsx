"use client";
import { useUIStore } from "@/store/ui.store";

const options = ["All", "Healthy", "Biryani", "BBQ"];
export function FilterSection() {
  const cuisine = useUIStore((s) => s.cuisine); const setCuisine = useUIStore((s) => s.setCuisine);
  return <div className="flex flex-wrap gap-2">{options.map((o) => <button key={o} onClick={() => setCuisine(o)} className={`rounded-full px-3 py-1 text-sm ${cuisine === o ? "bg-orange-500 text-white" : "bg-zinc-100"}`}>{o}</button>)}</div>;
}
