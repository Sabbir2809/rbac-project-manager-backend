import { NextFunction, Request, Response } from "express";
import config from "../config";
import { User } from "../models/User.model";
import { AuthError, ForbiddenError } from "../utils/appError";
import catchAsync from "../utils/catchAsync";
import { verifyJWT } from "../utils/generateToken";

const authGuard = (...requiredRoles: string[]) => {
  return catchAsync(async (req: Request, res: Response, next: NextFunction) => {
    // headers token
    const authHeader = req.headers.authorization;
    const token = authHeader?.split(" ")[1];

    if (!token) {
      throw new AuthError("Unauthorized! Please Login...");
    }

    // check if the token is valid
    let decodedToken;
    try {
      decodedToken = verifyJWT(token, config.jwt_access_secret_key);
    } catch (error) {
      throw new AuthError();
    }

    // decoded token
    const { id, role, iat } = decodedToken;

    // Expired date
    if (!iat) {
      throw new AuthError(
        "Session Expired or Invalid. Please Login Again To Continue."
      );
    }

    // Authentication
    const user = await User.findById(id);
    if (!user) {
      throw new AuthError("User Not Found! Please register before logging");
    }

    // authorization
    if (requiredRoles && !requiredRoles.includes(role)) {
      throw new ForbiddenError();
    }

    // decoded
    req.user = decodedToken;
    next();
  });
};

export default authGuard;
