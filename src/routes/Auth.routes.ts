import { Router } from "express";
import { AuthControllers } from "../controllers/Auth.controllers";
import authGuard from "../middlewares/authGuard";
import validateRequest from "../middlewares/validateRequest";
import { UserRole } from "../types/Auth.types";
import { createInviteSchema, loginSchema } from "../validations";

const router = Router();

router.post("/login", validateRequest(loginSchema), AuthControllers.login);
router.post(
  "/invite",
  authGuard(UserRole.ADMIN),
  validateRequest(createInviteSchema),
  AuthControllers.createInvite
);
router.post("/register-via-invite", AuthControllers.registerViaInvite);

export const AuthRoutes = router;
