import { Schema, model, models, Types } from "mongoose";

const favoriteSchema = new Schema({
  userId: { type: Types.ObjectId, ref: "User", required: true, unique: true },
  restaurantIds: [{ type: Types.ObjectId, ref: "Restaurant" }],
}, { timestamps: true });

export const FavoriteModel = models.Favorite || model("Favorite", favoriteSchema);
