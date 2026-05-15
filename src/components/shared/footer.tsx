"use client";

import Link from "next/link";
import { useAuthUser } from "@/hooks/use-auth-user";

export function Footer() {
  const { user, isLoggedIn } = useAuthUser();
  const isAdmin = user?.role === "ADMIN";
  const isRestaurant = user?.role === "OWNER";

  return (
    <footer className="mt-16 border-t border-zinc-200 bg-gradient-to-r from-zinc-950 via-zinc-900 to-zinc-950 text-zinc-100">
      <div className="mx-auto grid max-w-7xl gap-8 px-4 py-10 md:grid-cols-3">
        <div>
          <h3 className="text-2xl font-black tracking-tight text-orange-400">FoodFlow</h3>
          <p className="mt-2 text-sm text-zinc-300">Discover bold flavors, lightning delivery, and curated food experiences.</p>
        </div>

        <div>
          <p className="text-sm font-semibold uppercase tracking-wide text-zinc-400">Explore</p>
          <div className="mt-3 flex flex-col gap-2 text-sm">
            <Link href="/restaurants" className="hover:text-orange-300">Top Restaurants</Link>
            <Link href="/search" className="hover:text-orange-300">Smart Food Search</Link>
            <Link href="/orders" className="hover:text-orange-300">Track Orders</Link>
          </div>
        </div>

        <div>
          <p className="text-sm font-semibold uppercase tracking-wide text-zinc-400">Role Panels</p>
          <div className="mt-3 flex flex-col gap-2 text-sm">
            {!isLoggedIn && <p className="text-zinc-400">Sign in to view role-based management panels.</p>}
            {isAdmin && <Link href="/admin" className="hover:text-orange-300">Admin Dashboard</Link>}
            {isAdmin && <Link href="/admin/restaurants" className="hover:text-orange-300">Restaurant Management</Link>}
            {isRestaurant && <Link href="/owner" className="hover:text-orange-300">Restaurant Dashboard</Link>}
            {isRestaurant && <Link href="/owner/menu" className="hover:text-orange-300">Dishes Management</Link>}
            {isLoggedIn && !isAdmin && !isRestaurant && <p className="text-zinc-400">Customer account active.</p>}
          </div>
        </div>
      </div>
    </footer>
  );
}
