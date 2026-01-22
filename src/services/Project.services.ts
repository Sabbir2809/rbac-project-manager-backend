import { Project } from "../models/Project.model";
import {
  ICreateProject,
  IUpdateProject,
  ProjectStatus,
} from "../types/Project.types";
import { NotFoundError } from "../utils/appError";

const createProjectIntoDB = async (payload: ICreateProject, userId: string) => {
  const project = await Project.create({
    ...payload,
    createdBy: userId,
  });

  return project;
};

const getAllProjectsFromDB = async () => {
  const projects = await Project.find()
    .populate("createdBy", "name email")
    .sort({ createdAt: -1 });

  return projects;
};

const getProjectByIdFromDB = async (projectId: string) => {
  const project = await Project.findOne({ _id: projectId }).populate(
    "createdBy",
    "name email"
  );

  if (!project) {
    throw new NotFoundError("Project data not found!");
  }

  return project;
};

const updateProjectIntoDB = async (projectId: string, data: IUpdateProject) => {
  const project = await Project.findOne({ _id: projectId });

  if (!project) {
    throw new NotFoundError();
  }

  if (data.name) project.name = data.name;
  if (data.description) project.description = data.description;
  if (data.status) project.status = data.status;

  project.updatedAt = new Date();
  await project.save();

  return project;
};

const deleteProjectFromDB = async (projectId: string) => {
  const project = await Project.findOne({ _id: projectId });

  if (!project) {
    throw new NotFoundError();
  }

  // Soft delete
  project.isDeleted = true;
  project.status = ProjectStatus.DELETED;
  project.updatedAt = new Date();
  await project.save();
};

export const ProjectServices = {
  createProjectIntoDB,
  getAllProjectsFromDB,
  getProjectByIdFromDB,
  updateProjectIntoDB,
  deleteProjectFromDB,
};
