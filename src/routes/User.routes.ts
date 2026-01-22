import { Router } from "express";
import { UserControllers } from "../controllers/User.controllers";
import authGuard from "../middlewares/authGuard";
import validateRequest from "../middlewares/validateRequest";
import { UserRole } from "../types/Auth.types";
import { updateUserRoleSchema, updateUserStatusSchema } from "../validations";

const router = Router();

router.get("/", authGuard(UserRole.ADMIN), UserControllers.getAllUsers);
router.get("/:id", authGuard(UserRole.ADMIN), UserControllers.getUserById);
router.patch(
  "/:id/role",
  authGuard(UserRole.ADMIN),
  validateRequest(updateUserRoleSchema),
  UserControllers.updateUserRole
);
router.patch(
  "/:id/status",
  authGuard(UserRole.ADMIN),
  validateRequest(updateUserStatusSchema),
  UserControllers.updateUserStatus
);

export const UserRoutes = router;
