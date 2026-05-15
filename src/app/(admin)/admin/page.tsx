import { AnalyticsCards } from "@/components/dashboard/analytics-cards";

export default function AdminPage() {
  return (
    <div className="space-y-5">
      <div className="rounded-3xl border border-white/60 bg-gradient-to-r from-zinc-900 via-zinc-800 to-zinc-900 p-6 text-white">
        <h1 className="text-3xl font-extrabold">Admin Dashboard</h1>
        <p className="mt-1 text-sm text-zinc-300">Platform-wide insights for users, restaurants, and operations.</p>
      </div>
      <AnalyticsCards />
    </div>
  );
}
