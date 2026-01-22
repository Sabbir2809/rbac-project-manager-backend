import { User } from "../models/User.model";
import { UserRole, UserStatus } from "../types/Auth.types";
import { NotFoundError } from "../utils/appError";

const getAllUsersFromDB = async (page: number = 1, limit: number = 10) => {
  const skip = (page - 1) * limit;

  const users = await User.find()
    .select("-password")
    .sort({ createdAt: -1 })
    .skip(skip)
    .limit(limit);

  const total = await User.countDocuments();

  const metaData = {
    page,
    limit,
    total,
    totalPage: Math.ceil(total / limit),
  };

  return {
    meta: metaData,
    data: users,
  };
};

const getUserByIdFromDB = async (userId: string) => {
  const user = await User.findById(userId).select("-password");

  if (!user) {
    throw new NotFoundError("User not found");
  }
  return user;
};

const updateUserRoleIntoDB = async (userId: string, role: UserRole) => {
  const user = await User.findById(userId);

  if (!user) {
    throw new NotFoundError("User not found");
  }

  user.role = role;
  await user.save();
};

const updateUserStatusIntoDB = async (userId: string, status: UserStatus) => {
  const user = await User.findById(userId);

  if (!user) {
    throw new NotFoundError("User not found");
  }

  user.status = status;
  await user.save();
};

export const UserServices = {
  getAllUsersFromDB,
  getUserByIdFromDB,
  updateUserRoleIntoDB,
  updateUserStatusIntoDB,
};
