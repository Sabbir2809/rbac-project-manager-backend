import { Router } from "express";
import { ProjectControllers } from "../controllers/Project.controllers";
import authGuard from "../middlewares/authGuard";
import validateRequest from "../middlewares/validateRequest";
import { UserRole } from "../types/Auth.types";
import {
  createProjectSchema,
  deleteProjectSchema,
  updateProjectSchema,
} from "../validations";

const router = Router();

router.post(
  "/",
  authGuard(UserRole.ADMIN, UserRole.MANAGER, UserRole.STAFF),
  validateRequest(createProjectSchema),
  ProjectControllers.createProject
);

router.get(
  "/",
  authGuard(UserRole.ADMIN, UserRole.MANAGER, UserRole.STAFF),
  ProjectControllers.getAllProjects
);

router.get(
  "/:id",
  authGuard(UserRole.ADMIN, UserRole.MANAGER, UserRole.STAFF),
  ProjectControllers.getProjectById
);

router.patch(
  "/:id",
  authGuard(UserRole.ADMIN),
  validateRequest(updateProjectSchema),
  ProjectControllers.updateProject
);

router.delete(
  "/:id",
  authGuard(UserRole.ADMIN),
  validateRequest(deleteProjectSchema),
  ProjectControllers.deleteProject
);

export const ProjectRoutes = router;
