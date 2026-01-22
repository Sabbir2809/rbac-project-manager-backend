import { Schema, model } from "mongoose";
import { IUser, UserRole, UserStatus } from "../types/Auth.types";

const userSchema = new Schema(
  {
    name: {
      type: String,
      required: true,
      trim: true,
    },
    email: {
      type: String,
      required: true,
      unique: true,
      lowercase: true,
      trim: true,
    },
    password: {
      type: String,
      required: true,
    },
    role: {
      type: String,
      enum: Object.values(UserRole),
      default: UserRole.STAFF,
    },
    status: {
      type: String,
      enum: Object.values(UserStatus),
      default: UserStatus.ACTIVE,
    },
    invitedAt: {
      type: Date,
    },
  },
  { timestamps: true, versionKey: false }
);

// Export the model
export const User = model<IUser>("User", userSchema);
