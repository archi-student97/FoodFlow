import { Card } from "@/components/ui/card";

const stats = [
  { label: "Orders", value: "1,248", change: "+12.4%" },
  { label: "Revenue", value: "Rs 9.8L", change: "+8.9%" },
  { label: "Users", value: "4,320", change: "+6.2%" },
];

export function AnalyticsCards() {
  return (
    <div className="grid gap-4 md:grid-cols-3">
      {stats.map((s) => (
        <Card key={s.label} className="border-white/80 bg-white/95">
          <p className="text-xs font-semibold uppercase tracking-wide text-zinc-500">{s.label}</p>
          <p className="mt-1 text-3xl font-extrabold text-zinc-900">{s.value}</p>
          <p className="mt-1 text-xs font-semibold text-emerald-600">{s.change} this week</p>
        </Card>
      ))}
    </div>
  );
}
