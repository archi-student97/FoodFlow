"use client";

import { useEffect, useState } from "react";
import { Clock3, Trash2 } from "lucide-react";
import { orderService } from "@/services/order.service";
import { useAuthUser } from "@/hooks/use-auth-user";
import { Order } from "@/types";

const statusClasses: Record<string, string> = {
  delivered: "bg-emerald-100 text-emerald-700",
  preparing: "bg-amber-100 text-amber-700",
  placed: "bg-blue-100 text-blue-700",
};

export default function OrdersPage() {
  const { isLoggedIn, loading: authLoading } = useAuthUser();
  const [items, setItems] = useState<Order[]>([]);
  const [loading, setLoading] = useState(true);
  const [removingId, setRemovingId] = useState<string | null>(null);

  useEffect(() => {
    let mounted = true;
    const load = async () => {
      try {
        const data = await orderService.getAll();
        if (!mounted) return;
        setItems(data);
      } finally {
        if (!mounted) return;
        setLoading(false);
      }
    };
    void load();
    return () => {
      mounted = false;
    };
  }, []);

  const handleDelete = async (orderId: string) => {
    const ok = window.confirm("Delete this order from your account history?");
    if (!ok) return;
    setRemovingId(orderId);
    try {
      await orderService.remove(orderId);
      setItems((prev) => prev.filter((o) => o.id !== orderId));
    } finally {
      setRemovingId(null);
    }
  };

  return (
    <div className="space-y-5">
      <div className="rounded-3xl border border-white/60 bg-gradient-to-r from-emerald-500 to-teal-500 p-6 text-white">
        <h1 className="text-3xl font-extrabold">Your Orders</h1>
        <p className="mt-1 text-sm text-emerald-50">Track all your recent and active orders in one place.</p>
      </div>

      {(loading || authLoading) && (
        <div className="rounded-2xl border border-white/80 bg-white/95 p-4 text-sm text-zinc-600 shadow-sm">Loading orders...</div>
      )}

      {!loading && !authLoading && (
        <div className="space-y-3">
          {items.map((o) => (
            <div key={o.id} className="rounded-2xl border border-white/80 bg-white/95 p-4 shadow-sm">
              <div className="flex items-start justify-between gap-3">
                <div>
                  <p className="font-semibold text-zinc-900">{o.restaurantName}</p>
                  <p className="mt-1 text-xs text-zinc-500">Order ID: {o.id}</p>
                </div>
                <div className="flex items-center gap-2">
                  <span className={`rounded-full px-2.5 py-1 text-xs font-bold ${statusClasses[o.status] || "bg-zinc-100 text-zinc-700"}`}>{o.status}</span>
                  {isLoggedIn && (
                    <button
                      type="button"
                      onClick={() => handleDelete(o.id)}
                      disabled={removingId === o.id}
                      className="inline-flex items-center gap-1 rounded-lg border border-rose-200 bg-rose-50 px-2.5 py-1 text-xs font-semibold text-rose-700 transition hover:bg-rose-100 disabled:opacity-60"
                    >
                      <Trash2 className="h-3.5 w-3.5" />
                      {removingId === o.id ? "Deleting..." : "Delete"}
                    </button>
                  )}
                </div>
              </div>
              <div className="mt-3 flex items-center justify-between text-sm">
                <span className="font-semibold">Rs {o.total}</span>
                <span className="inline-flex items-center gap-1 text-zinc-500"><Clock3 className="h-3.5 w-3.5" /> {o.createdAt}</span>
              </div>
            </div>
          ))}
          {items.length === 0 && (
            <div className="rounded-2xl border border-white/80 bg-white/95 p-4 text-sm text-zinc-600 shadow-sm">No orders found.</div>
          )}
        </div>
      )}
    </div>
  );
}
