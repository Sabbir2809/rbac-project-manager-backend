import { Request, Response } from "express";
import { AuthServices } from "../services/Auth.services";
import catchAsync from "../utils/catchAsync";
import sendResponse from "../utils/sendResponse";

const login = catchAsync(async (req: Request, res: Response) => {
  // service
  const result = await AuthServices.loginFromDB(req.body);

  // send response
  sendResponse(res, {
    success: true,
    statusCode: 200,
    message: "User Login Successfully",
    data: result,
  });
});

const createInvite = catchAsync(async (req: Request, res: Response) => {
  // service
  await AuthServices.createInviteIntoDB(req.body);

  // send response
  sendResponse(res, {
    success: true,
    statusCode: 201,
    message: `Invite sent successfully to Email: ${req.body.email}`,
  });
});

const registerViaInvite = catchAsync(async (req: Request, res: Response) => {
  // service
  const result = await AuthServices.registerViaInviteIntoDB(req.body);

  // send response
  sendResponse(res, {
    success: true,
    statusCode: 201,
    message: "User Registered Successfully",
    data: result,
  });
});

export const AuthControllers = {
  login,
  createInvite,
  registerViaInvite,
};
