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
  name: z.string().min(2),
  email: z.email(),
  password: z.string().min(8),
  role: z.enum(["CUSTOMER", "ADMIN", "OWNER"]),
});

export default function SignupPage() {
  const router = useRouter();
  const [showPassword, setShowPassword] = useState(false);
  const { register, handleSubmit, formState: { errors, isSubmitting } } = useForm<z.infer<typeof schema>>({
    resolver: zodResolver(schema),
    defaultValues: { role: "CUSTOMER" },
  });

  const onSubmit = async (values: z.infer<typeof schema>) => {
    try {
      await authService.signup(values.name, values.email, values.password, values.role);
      toast.success("Account created");
      if (values.role === "ADMIN") {
        router.push("/admin");
      } else if (values.role === "OWNER") {
        router.push("/owner");
      } else {
        router.push("/");
      }
      router.refresh();
    } catch (error) {
      toast.error(error instanceof Error ? error.message : "Signup failed");
    }
  };

  return (
    <div className="mx-auto max-w-md rounded-2xl border bg-white p-6">
      <h1 className="mb-4 text-2xl font-bold">Sign Up</h1>
      <form onSubmit={handleSubmit(onSubmit)} className="space-y-3">
        <Input {...register("name")} placeholder="Full Name" />
        <p className="text-xs text-red-500">{errors.name?.message}</p>
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
          <label className="mb-1 block text-xs font-semibold text-zinc-600">Sign Up As</label>
          <select {...register("role")} className="h-10 w-full rounded-xl border border-zinc-200 bg-white px-3 text-sm outline-none focus:border-orange-400">
            <option value="CUSTOMER">User</option>
            <option value="ADMIN">Admin</option>
            <option value="OWNER">Restaurant Partner</option>
          </select>
        </div>
        <Button className="w-full" disabled={isSubmitting}>{isSubmitting ? "Creating..." : "Create Account"}</Button>
      </form>
    </div>
  );
}
