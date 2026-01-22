import { UserRole } from "./Auth.types";

export interface IInvite {
  email: string;
  role: UserRole;
  token: string;
  expiresAt: Date;
  acceptedAt?: Date;
  createdAt: Date;
}
