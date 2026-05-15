"use client";
import Link from "next/link";
import { Menu, ShoppingCart, Sparkles, X } from "lucide-react";
import { useCartStore } from "@/store/cart.store";
import { useAuthUser } from "@/hooks/use-auth-user";
import { authService } from "@/services/auth.service";
import { useRouter } from "next/navigation";
import { useState } from "react";

export function Navbar() {
  const count = useCartStore((s) => s.items.reduce((a, b) => a + b.quantity, 0));
  const { user, isLoggedIn } = useAuthUser();
  const router = useRouter();
  const [loggingOut, setLoggingOut] = useState(false);
  const [mobileOpen, setMobileOpen] = useState(false);

  const handleLogout = async () => {
    setLoggingOut(true);
    try {
      await authService.logout();
      window.dispatchEvent(new Event("auth-changed"));
      router.refresh();
      router.push("/");
      setMobileOpen(false);
    } finally {
      setLoggingOut(false);
    }
  };

  return (
    <header className="sticky top-0 z-50 border-b border-white/50 bg-white/70 backdrop-blur-xl">
      <div className="mx-auto flex max-w-7xl items-center justify-between px-4 py-3">
        <Link href="/" className="inline-flex items-center gap-2 text-xl font-extrabold text-zinc-900">
          <span className="rounded-lg bg-gradient-to-r from-orange-500 to-rose-500 p-1.5 text-white">
            <Sparkles className="h-4 w-4" />
          </span>
          FoodFlow
        </Link>

        <div className="flex items-center gap-2">
          <nav className="hidden items-center gap-2 md:flex md:gap-4">
            <Link href="/" className="rounded-lg px-3 py-1.5 text-sm font-semibold text-zinc-700 transition hover:bg-orange-100 hover:text-orange-700">Home</Link>
            <Link href="/restaurants" className="rounded-lg px-3 py-1.5 text-sm font-semibold text-zinc-700 transition hover:bg-orange-100 hover:text-orange-700">Restaurants</Link>
            <Link href="/search" className="rounded-lg px-3 py-1.5 text-sm font-semibold text-zinc-700 transition hover:bg-orange-100 hover:text-orange-700">Search</Link>
            {isLoggedIn ? (
              <button
                type="button"
                onClick={handleLogout}
                disabled={loggingOut}
                className="rounded-lg px-3 py-1.5 text-sm font-semibold text-zinc-700 transition hover:bg-orange-100 hover:text-orange-700 disabled:opacity-60"
              >
                {loggingOut ? "Logging out..." : `Logout${user?.name ? ` (${user.name.split(" ")[0]})` : ""}`}
              </button>
            ) : (
              <Link href="/login" className="rounded-lg px-3 py-1.5 text-sm font-semibold text-zinc-700 transition hover:bg-orange-100 hover:text-orange-700">Login</Link>
            )}
          </nav>
          <Link href="/cart" className="relative rounded-lg p-2 transition hover:bg-orange-100">
            <ShoppingCart className="h-5 w-5" />
            <span className="absolute -right-1 -top-1 rounded-full bg-gradient-to-r from-orange-500 to-rose-500 px-1.5 text-[10px] font-bold text-white">{count}</span>
          </Link>
          <button
            type="button"
            onClick={() => setMobileOpen((prev) => !prev)}
            className="inline-flex rounded-lg p-2 text-zinc-700 transition hover:bg-orange-100 md:hidden"
            aria-label="Toggle menu"
          >
            {mobileOpen ? <X className="h-5 w-5" /> : <Menu className="h-5 w-5" />}
          </button>
        </div>
      </div>
      {mobileOpen ? (
        <div className="border-t border-white/50 bg-white/95 px-4 py-3 md:hidden">
          <nav className="flex flex-col gap-2">
            <Link href="/" onClick={() => setMobileOpen(false)} className="rounded-lg px-3 py-2 text-sm font-semibold text-zinc-700 transition hover:bg-orange-100 hover:text-orange-700">Home</Link>
            <Link href="/restaurants" onClick={() => setMobileOpen(false)} className="rounded-lg px-3 py-2 text-sm font-semibold text-zinc-700 transition hover:bg-orange-100 hover:text-orange-700">Restaurants</Link>
            <Link href="/search" onClick={() => setMobileOpen(false)} className="rounded-lg px-3 py-2 text-sm font-semibold text-zinc-700 transition hover:bg-orange-100 hover:text-orange-700">Search</Link>
            {isLoggedIn ? (
              <button
                type="button"
                onClick={handleLogout}
                disabled={loggingOut}
                className="rounded-lg px-3 py-2 text-left text-sm font-semibold text-zinc-700 transition hover:bg-orange-100 hover:text-orange-700 disabled:opacity-60"
              >
                {loggingOut ? "Logging out..." : `Logout${user?.name ? ` (${user.name.split(" ")[0]})` : ""}`}
              </button>
            ) : (
              <Link href="/login" onClick={() => setMobileOpen(false)} className="rounded-lg px-3 py-2 text-sm font-semibold text-zinc-700 transition hover:bg-orange-100 hover:text-orange-700">Login</Link>
            )}
          </nav>
        </div>
      ) : null}
    </header>
  );
}
