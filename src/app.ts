import cookieParser from "cookie-parser";
import cors from "cors";
import express, { Application, Request, Response } from "express";
import config from "./config";
import globalErrorHandler from "./middlewares/globalErrorHandler";
import notFound from "./middlewares/notFound";
import rateLimiter from "./middlewares/rateLimiter";
import routers from "./routes";

// Initialize express application
const app: Application = express();

// ---------- Global Middlewares ----------
app.use(rateLimiter);
app.use(
  cors({
    origin: config.cors_origin ?? "*",
    credentials: true,
  })
);
app.use(cookieParser());
app.use(express.json());

// ---------- Application Routes ----------
app.use("/api/v1", routers);

// Health Check Endpoint
app.get("/", (req: Request, res: Response) => {
  res.status(200).json({
    success: true,
    statusCode: 200,
    message: "🚀 Server is up and running!",
  });
});

// ---------- Error Handling ----------
app.use(globalErrorHandler);
app.use(notFound);

export default app;
