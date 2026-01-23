import { User } from "../models/User.model";
import { UserRole, UserStatus } from "../types/Auth.types";
import { NotFoundError } from "../utils/appError";

const getAllUsersFromDB = async (
  page: number = 1,
  limit: number = 10,
  search: string = "",
  role?: string,
  status?: string
) => {
  const skip = (page - 1) * limit;

  const query: any = {};
  if (search) {
    query.$or = [
      { name: { $regex: search, $options: "i" } },
      { email: { $regex: search, $options: "i" } },
    ];
  }
  if (role) query.role = role;
  if (status) query.status = status;

  const users = await User.find(query)
    .select("-password")
    .sort({ createdAt: -1 })
    .skip(skip)
    .limit(limit);

  const total = await User.countDocuments(query);

  return {
    data: users,
    meta: {
      page,
      limit,
      total,
      totalPage: Math.ceil(total / limit),
    },
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
