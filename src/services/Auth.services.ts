import crypto from "crypto";
import config from "../config";
import { Invite } from "../models/Invite.model";
import { User } from "../models/User.model";
import {
  IInvitePayload,
  ILoginPayload,
  IRegisterPayload,
} from "../types/Auth.types";
import {
  AuthError,
  ConflictError,
  ForbiddenError,
  ValidationError,
} from "../utils/appError";
import { generateJWT } from "../utils/generateToken";
import { comparePassword, generateHashPassword } from "../utils/hashPassword";
import { sendEmail } from "../utils/sendEmail";
import { NotFoundError } from "./../utils/appError";

const loginFromDB = async (payload: ILoginPayload) => {
  const user = await User.findOne({ email: payload.email });
  if (!user) throw new NotFoundError();

  if (user.status === "INACTIVE") {
    throw new ForbiddenError();
  }

  const isMatch = await comparePassword(payload.password, user.password);
  if (!isMatch) throw new AuthError("Incorrect password!");

  const jwtPayload = {
    id: user._id,
    email: user.email,
    role: user.role,
  };

  const accessToken = generateJWT(jwtPayload, config.jwt_access_secret_key, {
    expiresIn: "1d",
  });

  return {
    accessToken,
    user: {
      id: user._id,
      name: user.name,
      email: user.email,
      role: user.role,
      status: user.status,
    },
  };
};

export const createInviteIntoDB = async (payload: IInvitePayload) => {
  // Check if user already exists
  const user = await User.findOne({ email: payload.email });
  if (user) throw new ConflictError("User with this email already exists");

  // Generate token & expiry
  const token = crypto.randomBytes(32).toString("hex");
  const expiresAt = new Date();
  expiresAt.setHours(expiresAt.getHours() + 24);

  // Find existing invite
  let invite = await Invite.findOne({ email: payload.email });

  if (invite) {
    // Update existing invite
    invite.role = payload.role;
    invite.token = token;
    invite.expiresAt = expiresAt;
    await invite.save();
  } else {
    // Create new invite
    invite = await Invite.create({
      email: payload.email,
      role: payload.role,
      token,
      expiresAt,
    });
  }

  // Send email
  const inviteLink = `${config.cors_origin}/register?token=${token}`;
  await sendEmail(
    payload.email,
    "You're Invited to RBAC Project Manager",
    `
    <p>Hello,</p>
  
    <p>
      You’ve been invited to join <strong>RBAC Project Manager</strong>.
      Click the link below to complete your registration:
    </p>
  
    <p>
      <a href="${inviteLink}">${inviteLink}</a>
    </p>
  
    <p>
      This invitation will expire in 24 hours.
    </p>

    <p>— RBAC Project Manager</p>
    `
  );

  return inviteLink;
};

const registerViaInviteIntoDB = async (payload: IRegisterPayload) => {
  const { name, password, token } = payload;

  const invite = await Invite.findOne({ token });

  if (!invite) {
    throw new ValidationError("Invalid invite token");
  }

  if (invite.acceptedAt) {
    throw new ConflictError("Invite has already been used");
  }

  if (new Date() > invite.expiresAt) {
    throw new ValidationError("Invite has expired");
  }

  // Check if user already exists
  const existingUser = await User.findOne({ email: invite.email });
  if (existingUser) {
    throw new ConflictError("User already exists");
  }

  const hashedPassword = await generateHashPassword(password);

  const user = await User.create({
    name,
    email: invite.email,
    password: hashedPassword,
    role: invite.role,
    invitedAt: invite.createdAt,
  });

  // Mark invite as accepted
  invite.acceptedAt = new Date();
  await invite.save();

  const jwtPayload = {
    id: user._id,
    email: user.email,
    role: user.role,
  };

  const accessToken = generateJWT(jwtPayload, config.jwt_access_secret_key, {
    expiresIn: "1d",
  });

  return { accessToken };
};

export const AuthServices = {
  loginFromDB,
  createInviteIntoDB,
  registerViaInviteIntoDB,
};
