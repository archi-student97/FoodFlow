import Link from "next/link";
import { ArrowRight, Bot, Flame, Leaf } from "lucide-react";

export default function HomePage() {
  return (
    <div className="space-y-10">
      <section className="relative overflow-hidden rounded-3xl border border-white/40 bg-gradient-to-br from-orange-500 via-rose-500 to-amber-400 p-8 text-white md:p-12">
        <div className="absolute -right-12 -top-12 h-52 w-52 rounded-full bg-white/20 blur-2xl" />
        <div className="absolute -bottom-20 left-1/3 h-60 w-60 rounded-full bg-amber-200/30 blur-3xl" />
        <div className="relative z-10 max-w-3xl">
          <p className="mb-3 inline-flex items-center gap-2 rounded-full bg-white/20 px-3 py-1 text-xs font-semibold uppercase tracking-wide">
            <Bot className="h-3.5 w-3.5" /> Curated Food Discovery
          </p>
          <h1 className="font-[var(--font-sora)] text-4xl font-extrabold leading-tight md:text-6xl">Your next craving, delivered with style.</h1>
          <p className="mt-4 text-base text-orange-50 md:text-lg">Explore trending restaurants, smart recommendations, and fast checkouts with a modern food experience.</p>
          <div className="mt-6 flex flex-wrap gap-3">
            <Link href="/restaurants" className="inline-flex items-center gap-2 rounded-xl bg-white px-5 py-2.5 text-sm font-bold text-orange-600 transition hover:bg-orange-50">Explore Restaurants <ArrowRight className="h-4 w-4" /></Link>
            <Link href="/search" className="rounded-xl border border-white/70 px-5 py-2.5 text-sm font-semibold text-white transition hover:bg-white/10">Try Smart Search</Link>
          </div>
        </div>
      </section>

      <section className="grid gap-5 md:grid-cols-3">
        <Link
          href="/restaurants"
          className="group relative overflow-hidden rounded-3xl border border-orange-200/60 bg-gradient-to-br from-white via-orange-50/70 to-amber-100/60 p-6 transition duration-300 hover:-translate-y-1 hover:shadow-[0_16px_40px_rgba(251,146,60,0.22)] focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-orange-400"
        >
          <div className="absolute -right-8 -top-8 h-24 w-24 rounded-full bg-orange-300/30 blur-2xl transition group-hover:scale-125" />
          <span className="mb-4 inline-flex rounded-2xl border border-orange-200 bg-white/90 p-2.5 shadow-sm">
            <Flame className="h-5 w-5 text-orange-500" />
          </span>
          <p className="text-xl font-extrabold tracking-tight text-zinc-900">Trending near you</p>
          <p className="mt-2 text-sm leading-relaxed text-zinc-700">Fresh picks curated from top local favorites.</p>
        </Link>
        <Link
          href="/search"
          className="group relative overflow-hidden rounded-3xl border border-emerald-200/60 bg-gradient-to-br from-white via-emerald-50/70 to-teal-100/60 p-6 transition duration-300 hover:-translate-y-1 hover:shadow-[0_16px_40px_rgba(16,185,129,0.2)] focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-emerald-400"
        >
          <div className="absolute -right-8 -top-8 h-24 w-24 rounded-full bg-emerald-300/30 blur-2xl transition group-hover:scale-125" />
          <span className="mb-4 inline-flex rounded-2xl border border-emerald-200 bg-white/90 p-2.5 shadow-sm">
            <Leaf className="h-5 w-5 text-emerald-500" />
          </span>
          <p className="text-xl font-extrabold tracking-tight text-zinc-900">Healthy smart picks</p>
          <p className="mt-2 text-sm leading-relaxed text-zinc-700">Recommendations based on your meal goals.</p>
        </Link>
        <Link
          href="/search"
          className="group relative overflow-hidden rounded-3xl border border-rose-200/60 bg-gradient-to-br from-white via-rose-50/70 to-pink-100/60 p-6 transition duration-300 hover:-translate-y-1 hover:shadow-[0_16px_40px_rgba(244,63,94,0.2)] focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-rose-400"
        >
          <div className="absolute -right-8 -top-8 h-24 w-24 rounded-full bg-rose-300/30 blur-2xl transition group-hover:scale-125" />
          <span className="mb-4 inline-flex rounded-2xl border border-rose-200 bg-white/90 p-2.5 shadow-sm">
            <Bot className="h-5 w-5 text-rose-500" />
          </span>
          <p className="text-xl font-extrabold tracking-tight text-zinc-900">Ask and discover</p>
          <p className="mt-2 text-sm leading-relaxed text-zinc-700">Search naturally: spicy under Rs 300, comfort food, and more.</p>
        </Link>
      </section>

    </div>
  );
}
