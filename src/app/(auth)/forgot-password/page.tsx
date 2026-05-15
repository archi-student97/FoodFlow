"use client";
import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";

export default function ForgotPage() { return <div className="mx-auto max-w-md rounded-2xl border bg-white p-6 space-y-3"><h1 className="text-2xl font-bold">Forgot Password</h1><Input placeholder="Enter your email"/><Button className="w-full">Send Reset Link</Button></div>; }
