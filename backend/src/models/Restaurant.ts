import { Schema, model, models, Types } from "mongoose";

const restaurantSchema = new Schema({
  name: { type: String, required: true, index: true },
  description: { type: String, required: true },
  image: String,
  cuisine: [{ type: String }],
  address: { type: String, required: true },
  ownerId: { type: Types.ObjectId, ref: "User", required: true, index: true },
  ratings: { type: Number, default: 0 },
  deliveryTime: { type: Number, default: 30 },
}, { timestamps: true });

export const RestaurantModel = models.Restaurant || model("Restaurant", restaurantSchema);
