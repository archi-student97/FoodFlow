import { Schema, model, models, Types } from "mongoose";

const menuSchema = new Schema({
  name: { type: String, required: true },
  description: { type: String, required: true },
  image: String,
  category: { type: String, required: true },
  price: { type: Number, required: true },
  availability: { type: Boolean, default: true },
  restaurantId: { type: Types.ObjectId, ref: "Restaurant", required: true, index: true },
}, { timestamps: true });

export const MenuModel = models.MenuItem || model("MenuItem", menuSchema);
