import { cn } from "@/lib/utils";
export function Input(props: React.InputHTMLAttributes<HTMLInputElement>) { return <input {...props} className={cn("h-10 w-full rounded-xl border border-zinc-200 bg-white px-3 text-sm outline-none focus:border-orange-400", props.className)} />; }
