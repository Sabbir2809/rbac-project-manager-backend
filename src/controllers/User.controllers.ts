import { Request, Response } from "express";
import { UserServices } from "../services/User.services";
import catchAsync from "../utils/catchAsync";
import sendResponse from "../utils/sendResponse";

const getAllUsers = catchAsync(async (req: Request, res: Response) => {
  const page = parseInt(req.query.page as string) || 1;
  const limit = parseInt(req.query.limit as string) || 10;

  // service
  const result = await UserServices.getAllUsersFromDB(page, limit);

  // send response
  sendResponse(res, {
    success: true,
    statusCode: 200,
    message: "All users retrieved successfully",
    meta: result.meta,
    data: result.data,
  });
});

const getUserById = catchAsync(async (req: Request, res: Response) => {
  const userId = req.params.id as string;
  // service
  const result = await UserServices.getUserByIdFromDB(userId);

  // send response
  sendResponse(res, {
    success: true,
    statusCode: 200,
    message: "User retrieved successfully",
    data: result,
  });
});

const updateUserRole = catchAsync(async (req: Request, res: Response) => {
  const userId = req.params.id as string;
  // service
  await UserServices.updateUserRoleIntoDB(userId, req.body.role);

  // send response
  sendResponse(res, {
    success: true,
    statusCode: 200,
    message: "User Role Updated Successfully",
  });
});

const updateUserStatus = catchAsync(async (req: Request, res: Response) => {
  const userId = req.params.id as string;
  // service
  await UserServices.updateUserStatusIntoDB(userId, req.body.status);

  // send response
  sendResponse(res, {
    success: true,
    statusCode: 200,
    message: "User Status Updated Successfully",
  });
});

export const UserControllers = {
  getAllUsers,
  getUserById,
  updateUserRole,
  updateUserStatus,
};
