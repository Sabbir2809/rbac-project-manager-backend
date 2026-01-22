import mongoose from "mongoose";

export enum ProjectStatus {
  ACTIVE = "ACTIVE",
  ARCHIVED = "ARCHIVED",
  DELETED = "DELETED",
}

export interface IProject {
  name: string;
  description: string;
  status: ProjectStatus;
  isDeleted: boolean;
  createdBy: mongoose.Types.ObjectId;
  createdAt: Date;
  updatedAt: Date;
}

export interface ICreateProject {
  name: string;
  description: string;
}

export interface IUpdateProject {
  name?: string;
  description?: string;
  status?: ProjectStatus;
}
