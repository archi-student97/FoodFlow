import { Clock3 } from "lucide-react";
import { orderService } from "@/services/order.service";

const statusClasses: Record<string, string> = {
  delivered: "bg-emerald-100 text-emerald-700",
  preparing: "bg-amber-100 text-amber-700",
  placed: "bg-blue-100 text-blue-700",
};

export default async function OrdersPage() {
  const items = await orderService.getAll();

  return (
    <div className="space-y-5">
      <div className="rounded-3xl border border-white/60 bg-gradient-to-r from-emerald-500 to-teal-500 p-6 text-white">
        <h1 className="text-3xl font-extrabold">Your Orders</h1>
        <p className="mt-1 text-sm text-emerald-50">Track all your recent and active orders in one place.</p>
      </div>

      <div className="space-y-3">
        {items.map((o) => (
          <div key={o.id} className="rounded-2xl border border-white/80 bg-white/95 p-4 shadow-sm">
            <div className="flex items-start justify-between gap-2">
              <div>
                <p className="font-semibold text-zinc-900">{o.restaurantName}</p>
                <p className="mt-1 text-xs text-zinc-500">Order ID: {o.id}</p>
              </div>
              <span className={`rounded-full px-2.5 py-1 text-xs font-bold ${statusClasses[o.status] || "bg-zinc-100 text-zinc-700"}`}>{o.status}</span>
            </div>
            <div className="mt-3 flex items-center justify-between text-sm">
              <span className="font-semibold">Rs {o.total}</span>
              <span className="inline-flex items-center gap-1 text-zinc-500"><Clock3 className="h-3.5 w-3.5" /> {o.createdAt}</span>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
}
