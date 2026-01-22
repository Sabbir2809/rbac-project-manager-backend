import { Router } from "express";
import { AuthRoutes } from "./Auth.routes";

const routers = Router();

const moduleRoutes = [
  {
    path: "/auth",
    route: AuthRoutes,
  },
];

moduleRoutes.forEach((route) => routers.use(route.path, route.route));

export default routers;
