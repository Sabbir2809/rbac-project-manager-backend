export enum UserRole {
  ADMIN = "ADMIN",
  MANAGER = "MANAGER",
  STAFF = "STAFF",
}

export enum UserStatus {
  ACTIVE = "ACTIVE",
  INACTIVE = "INACTIVE",
}

export interface IUser {
  _id: string;
  name: string;
  email: string;
  password: string;
  role: UserRole;
  status: UserStatus;
  invitedAt?: Date;
  createdAt: Date;
  updatedAt: Date;
}

export interface ILoginPayload {
  email: string;
  password: string;
}

export interface IInvitePayload {
  email: string;
  role: UserRole;
}

export interface IRegisterPayload {
  name: string;
  password: string;
  token: string;
}
