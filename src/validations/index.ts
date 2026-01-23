import { z } from "zod";
import { UserRole, UserStatus } from "../types/Auth.types";
import { ProjectStatus } from "../types/Project.types";

export const loginSchema = z.object({
  body: z.object({
    email: z.string().email(),
    password: z.string().min(4),
  }),
});

export const createInviteSchema = z.object({
  body: z.object({
    email: z.string().email("A valid email address is required"),
    role: z.enum([UserRole.ADMIN, UserRole.MANAGER, UserRole.STAFF]),
  }),
});

export const registerViaInviteSchema = z.object({
  body: z.object({
    name: z.string().min(2, "Name must be at least 2 characters"),
    password: z.string().min(4, "Password must be at least 4 characters"),
    token: z.string().min(16, "Invite token is required"),
  }),
});

export const updateUserRoleSchema = z.object({
  body: z.object({
    role: z.enum([UserRole.ADMIN, UserRole.MANAGER, UserRole.STAFF]),
  }),
});

export const updateUserStatusSchema = z.object({
  body: z.object({
    status: z.enum([UserStatus.ACTIVE, UserStatus.INACTIVE]),
  }),
});

export const createProjectSchema = z.object({
  body: z.object({
    name: z.string().min(2, "Project name must be at least 2 characters"),
    description: z.string().min(5, "Description must be at least 5 characters"),
    status: z
      .enum([
        ProjectStatus.ACTIVE,
        ProjectStatus.ARCHIVED,
        ProjectStatus.DELETED,
      ])
      .optional(),
    isDeleted: z.boolean().optional(),
  }),
});

export const updateProjectSchema = z.object({
  body: z.object({
    name: z
      .string()
      .min(2, "Project name must be at least 2 characters")
      .optional(),
    description: z
      .string()
      .min(5, "Description must be at least 5 characters")
      .optional(),
    status: z.enum([
      ProjectStatus.ACTIVE,
      ProjectStatus.ARCHIVED,
      ProjectStatus.DELETED,
    ]),
  }),
});
