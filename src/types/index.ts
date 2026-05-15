export type Role = "customer" | "owner" | "admin";

export interface Restaurant { id: string; name: string; image: string; cuisine: string[]; rating: number; deliveryTime: string; priceForTwo: number; description: string; }
export interface MenuItem { id: string; restaurantId: string; name: string; category: string; price: number; image: string; description: string; isVeg: boolean; }
export interface Order { id: string; restaurantName: string; total: number; status: "placed" | "preparing" | "delivered"; createdAt: string; }
export interface User { id: string; name: string; email: string; role: Role; avatar: string; }
