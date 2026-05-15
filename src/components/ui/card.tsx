import { cn } from "@/lib/utils";

export function Card({ className, ...props }: React.HTMLAttributes<HTMLDivElement>) {
  return <div className={cn("rounded-2xl border border-white/70 bg-white/90 p-4 shadow-[0_10px_30px_rgba(2,6,23,0.08)] backdrop-blur", className)} {...props} />;
}
