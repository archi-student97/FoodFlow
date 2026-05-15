"use client";
import Image from "next/image";
import { MenuItem } from "@/types";
import { Card } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { useCartStore } from "@/store/cart.store";
import { useAuthUser } from "@/hooks/use-auth-user";
import { useRouter } from "next/navigation";
import { toast } from "sonner";

export function FoodCard({ item }: { item: MenuItem }) {
  const add = useCartStore((s) => s.add);
  const { isLoggedIn, loading } = useAuthUser();
  const router = useRouter();

  const handleAdd = () => {
    if (!isLoggedIn) {
      toast.error("Please login or sign up to add items.");
      router.push("/login");
      return;
    }
    add(item);
    toast.success("Added to cart");
  };

  return <Card className="flex gap-3"><Image src={`${item.image}?auto=format&fit=crop&w=400&q=70`} alt={item.name} width={120} height={120} className="h-24 w-24 rounded-xl object-cover" /><div className="flex-1"><h4 className="font-semibold">{item.name}</h4><p className="text-xs text-zinc-500">{item.description}</p><div className="mt-2 flex items-center justify-between"><span className="font-semibold">Rs {item.price}</span><Button className="h-8" onClick={handleAdd} disabled={loading}>{loading ? "..." : "Add"}</Button></div></div></Card>;
}
