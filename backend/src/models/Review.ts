import { Schema, model, models, Types } from "mongoose";

const reviewSchema = new Schema({
  userId: { type: Types.ObjectId, ref: "User", required: true },
  restaurantId: { type: Types.ObjectId, ref: "Restaurant", required: true, index: true },
  rating: { type: Number, min: 1, max: 5, required: true },
  comment: { type: String, required: true },
}, { timestamps: true });

export const ReviewModel = models.Review || model("Review", reviewSchema);
