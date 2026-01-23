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
app.set("trust proxy", 1);
app.use(
  cors({
    origin: config.cors_origin || [
      "http://localhost:5173",
      "http://localhost:3000",
    ],
    credentials: true,
  })
);
app.use(express.json());
app.use(rateLimiter);

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
