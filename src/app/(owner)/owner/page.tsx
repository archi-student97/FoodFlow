import { AnalyticsCards } from "@/components/dashboard/analytics-cards";

export default function OwnerOverviewPage() {
  return (
    <div className="space-y-5">
      <div className="rounded-3xl border border-white/60 bg-gradient-to-r from-indigo-600 via-violet-600 to-purple-600 p-6 text-white">
        <h1 className="text-3xl font-extrabold">Owner Dashboard</h1>
        <p className="mt-1 text-sm text-indigo-100">Monitor restaurant growth, orders, and performance metrics.</p>
      </div>
      <AnalyticsCards />
    </div>
  );
}
