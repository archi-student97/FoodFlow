import { restaurantService } from "@/services/restaurant.service";
import { FoodCard } from "@/components/restaurant/food-card";

export default async function RestaurantDetails({ params }: { params: Promise<{ id: string }> }) {
  const { id } = await params;
  const restaurant = await restaurantService.getById(id);
  const items = await restaurantService.getMenu(id);
  if (!restaurant) return <div>Not found</div>;
  return (
    <div className="space-y-4">
      <div className="rounded-2xl border bg-white p-4 sm:p-5">
        <h1 className="text-2xl font-bold sm:text-3xl">{restaurant.name}</h1>
        <p className="text-sm text-zinc-600 sm:text-base">{restaurant.description}</p>
      </div>
      <div className="grid gap-3">
        {items.map((item) => <FoodCard key={item.id} item={item} />)}
      </div>
    </div>
  );
}
