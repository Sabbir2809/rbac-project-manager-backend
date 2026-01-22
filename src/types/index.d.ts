import { JwtPayload } from "jsonwebtoken";

declare global {
  namespace Express {
    interface Request {
      user?: JwtPayload;
    }
  }
}

interface IMeta {
  limit: number;
  page: number;
  total: number;
  totalPage: number;
}

interface IData<T> {
  statusCode: number;
  success: boolean;
  message?: string;
  meta?: IMeta;
  data?: T;
}
