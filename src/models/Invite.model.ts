import mongoose, { Schema } from "mongoose";
import { UserRole } from "../types/Auth.types";
import { IInvite } from "../types/Invite.types";

const InviteSchema: Schema = new Schema(
  {
    email: {
      type: String,
      required: true,
      lowercase: true,
      trim: true,
    },
    role: {
      type: String,
      enum: Object.values(UserRole),
      required: true,
    },
    token: {
      type: String,
      required: true,
      unique: true,
    },
    expiresAt: {
      type: Date,
      required: true,
    },
    acceptedAt: {
      type: Date,
    },
  },
  {
    timestamps: false,
    versionKey: false,
  }
);

export const Invite = mongoose.model<IInvite>("Invite", InviteSchema);
