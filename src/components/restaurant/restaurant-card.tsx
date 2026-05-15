import Image from "next/image";
import Link from "next/link";
import { Clock3, Star } from "lucide-react";
import { Restaurant } from "@/types";
import { Card } from "@/components/ui/card";

export function RestaurantCard({ restaurant }: { restaurant: Restaurant }) {
  return (
    <Link href={`/restaurants/${restaurant.id}`}>
      <Card className="group overflow-hidden p-0 transition duration-300 hover:-translate-y-1 hover:shadow-[0_16px_36px_rgba(0,0,0,0.16)]">
        <div className="relative">
          <Image
            src={`${restaurant.image}?auto=format&fit=crop&w=800&q=70`}
            alt={restaurant.name}
            width={500}
            height={250}
            className="h-44 w-full object-cover transition duration-500 group-hover:scale-105"
          />
          <div className="absolute inset-0 bg-gradient-to-t from-black/50 to-transparent" />
          <span className="absolute bottom-3 left-3 inline-flex items-center gap-1 rounded-full bg-white/95 px-2 py-1 text-xs font-bold text-emerald-700">
            <Star className="h-3 w-3" />
            {restaurant.rating}
          </span>
        </div>

        <div className="p-4">
          <h3 className="font-[var(--font-sora)] text-lg font-bold text-zinc-900">{restaurant.name}</h3>
          <p className="mt-1 text-xs text-zinc-500">{restaurant.cuisine.join(" | ")}</p>
          <div className="mt-3 flex items-center justify-between text-sm">
            <span className="inline-flex items-center gap-1 text-zinc-600">
              <Clock3 className="h-3.5 w-3.5" />
              {restaurant.deliveryTime}
            </span>
            <span className="rounded-full bg-orange-50 px-2 py-1 text-xs font-semibold text-orange-700">Rs {restaurant.priceForTwo} for two</span>
          </div>
        </div>
      </Card>
    </Link>
  );
}
