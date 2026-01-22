import jwt, { JwtPayload } from "jsonwebtoken";

export const generateJWT = (
  payload: JwtPayload,
  secretKey: string,
  expiresIn: jwt.SignOptions
) => {
  return jwt.sign(payload, secretKey, expiresIn);
};

export const verifyJWT = (token: string, secretKey: string): any => {
  return jwt.verify(token, secretKey);
};
