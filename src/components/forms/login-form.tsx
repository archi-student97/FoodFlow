"use client";

import { useRouter } from "next/navigation";
import { useState } from "react";
import { useForm } from "react-hook-form";
import { z } from "zod";
import { zodResolver } from "@hookform/resolvers/zod";
import { toast } from "sonner";
import { Eye, EyeOff } from "lucide-react";
import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";
import { authService } from "@/services/auth.service";

const schema = z.object({
  role: z.enum(["CUSTOMER", "ADMIN", "OWNER"]),
  email: z.email(),
  password: z.string().min(6),
});

export function LoginForm() {
  const router = useRouter();
  const [showPassword, setShowPassword] = useState(false);
  const { register, handleSubmit, formState: { errors, isSubmitting } } = useForm<z.infer<typeof schema>>({
    resolver: zodResolver(schema),
    defaultValues: { role: "CUSTOMER", email: "", password: "" },
  });

  const onSubmit = async (values: z.infer<typeof schema>) => {
    try {
      const user = await authService.login(values.email, values.password);
      if (user.role !== values.role) {
        await authService.logout();
        toast.error(`This account is ${user.role.toLowerCase()}. Please choose the correct login type.`);
        return;
      }

      toast.success("Logged in successfully");
      if (user.role === "ADMIN") {
        router.push("/admin");
      } else if (user.role === "OWNER") {
        router.push("/owner");
      } else {
        router.push("/");
      }
      router.refresh();
    } catch (error) {
      toast.error(error instanceof Error ? error.message : "Login failed");
    }
  };

  return (
    <form onSubmit={handleSubmit(onSubmit)} className="space-y-3">
      <Input {...register("email")} placeholder="Email" />
      <p className="text-xs text-red-500">{errors.email?.message}</p>
      <div className="relative">
        <Input {...register("password")} type={showPassword ? "text" : "password"} placeholder="Password" className="pr-10" />
        <button
          type="button"
          onClick={() => setShowPassword((v) => !v)}
          className="absolute right-3 top-1/2 -translate-y-1/2 text-zinc-500 hover:text-zinc-700"
          aria-label={showPassword ? "Hide password" : "Show password"}
        >
          {showPassword ? <EyeOff className="h-4 w-4" /> : <Eye className="h-4 w-4" />}
        </button>
      </div>
      <p className="text-xs text-red-500">{errors.password?.message}</p>
      <div>
        <label className="mb-1 block text-xs font-semibold text-zinc-600">Login As</label>
        <select {...register("role")} className="h-10 w-full rounded-xl border border-zinc-200 bg-white px-3 text-sm outline-none focus:border-orange-400">
          <option value="CUSTOMER">User</option>
          <option value="ADMIN">Admin</option>
          <option value="OWNER">Restaurant Partner</option>
        </select>
      </div>
      <Button className="w-full" disabled={isSubmitting}>{isSubmitting ? "Logging in..." : "Login"}</Button>
    </form>
  );
}
