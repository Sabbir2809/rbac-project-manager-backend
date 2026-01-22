import { Request, Response } from "express";
import { ProjectServices } from "../services/Project.services";
import catchAsync from "../utils/catchAsync";
import sendResponse from "../utils/sendResponse";

const createProject = catchAsync(async (req: Request, res: Response) => {
  const userId = req.user?.id;
  // service
  const result = await ProjectServices.createProjectIntoDB(req.body, userId);

  // send response
  sendResponse(res, {
    success: true,
    statusCode: 201,
    message: "Project created successfully",
    data: result,
  });
});

const getAllProjects = catchAsync(async (req: Request, res: Response) => {
  // service
  const result = await ProjectServices.getAllProjectsFromDB();

  // send response
  sendResponse(res, {
    success: true,
    statusCode: 200,
    message: "All projects retrieved successfully",
    data: result,
  });
});

const getProjectById = catchAsync(async (req: Request, res: Response) => {
  const projectId = req.params.id as string;
  // service
  const result = await ProjectServices.getProjectByIdFromDB(projectId);

  // send response
  sendResponse(res, {
    success: true,
    statusCode: 200,
    message: "Project retrieved successfully",
    data: result,
  });
});

const updateProject = catchAsync(async (req: Request, res: Response) => {
  const projectId = req.params.id as string;
  // service
  const result = await ProjectServices.updateProjectIntoDB(projectId, req.body);

  // send response
  sendResponse(res, {
    success: true,
    statusCode: 200,
    message: "Project Updated Successfully",
    data: result,
  });
});

const deleteProject = catchAsync(async (req: Request, res: Response) => {
  const projectId = req.params.id as string;
  // service
  await ProjectServices.deleteProjectFromDB(projectId);

  // send response
  sendResponse(res, {
    success: true,
    statusCode: 200,
    message: "Project Deleted Successfully",
  });
});

export const ProjectControllers = {
  createProject,
  getAllProjects,
  getProjectById,
  updateProject,
  deleteProject,
};
