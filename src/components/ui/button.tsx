import { cn } from "@/lib/utils";

export function Button({ className, ...props }: React.ButtonHTMLAttributes<HTMLButtonElement>) {
  return (
    <button
      className={cn(
        "h-10 rounded-xl bg-gradient-to-r from-orange-500 to-rose-500 px-4 text-sm font-semibold text-white shadow-[0_8px_20px_rgba(249,115,22,0.35)] transition hover:scale-[1.02] hover:from-orange-600 hover:to-rose-600 disabled:opacity-50",
        className,
      )}
      {...props}
    />
  );
}
