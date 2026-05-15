import { Schema, model, models, Types } from "mongoose";

const orderSchema = new Schema({
  userId: { type: Types.ObjectId, ref: "User", required: true, index: true },
  restaurantId: { type: Types.ObjectId, ref: "Restaurant", required: true, index: true },
  items: [{ menuItemId: { type: Types.ObjectId, ref: "MenuItem" }, quantity: Number, price: Number, name: String }],
  totalPrice: { type: Number, required: true },
  paymentStatus: { type: String, enum: ["PENDING", "PAID", "FAILED"], default: "PENDING" },
  orderStatus: { type: String, enum: ["PLACED", "PREPARING", "OUT_FOR_DELIVERY", "DELIVERED", "CANCELLED"], default: "PLACED" },
  deliveryAddress: { type: String, required: true },
}, { timestamps: true });

export const OrderModel = models.Order || model("Order", orderSchema);
