import { Schema, model, models, Types } from "mongoose";
import { APP_ROLES } from "@/constants/roles";

const userSchema = new Schema({
  name: { type: String, required: true },
  email: { type: String, required: true, unique: true, index: true },
  password: { type: String, required: true },
  role: { type: String, enum: APP_ROLES, default: "CUSTOMER" },
  avatar: String,
  favorites: [{ type: Types.ObjectId, ref: "Restaurant" }],
  addresses: [{ label: String, address: String }],
}, { timestamps: true });

export const UserModel = models.User || model("User", userSchema);
