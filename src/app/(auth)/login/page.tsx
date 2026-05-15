import { LoginForm } from "@/components/forms/login-form";
import Link from "next/link";

export default function LoginPage() {
  return (
    <div className="mx-auto max-w-md rounded-2xl border bg-white p-6">
      <h1 className="mb-4 text-2xl font-bold">Login</h1>
      <LoginForm />
      <p className="mt-4 text-sm text-zinc-600">
        New here?{" "}
        <Link href="/signup" className="font-semibold text-orange-600 hover:text-orange-700">
          Create an account
        </Link>
      </p>
    </div>
  );
}
