import { restaurantService } from "@/services/restaurant.service";
import { FoodCard } from "@/components/restaurant/food-card";

export default async function RestaurantDetails({ params }: { params: Promise<{ id: string }> }) {
  const { id } = await params;
  const restaurant = await restaurantService.getById(id);
  const items = await restaurantService.getMenu(id);
  if (!restaurant) return <div>Not found</div>;
  return <div className="space-y-4"><div className="rounded-2xl border bg-white p-5"><h1 className="text-3xl font-bold">{restaurant.name}</h1><p className="text-zinc-600">{restaurant.description}</p></div><div className="grid gap-3">{items.map((item) => <FoodCard key={item.id} item={item} />)}</div></div>;
}
