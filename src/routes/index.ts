import { Router } from "express";
import { AuthRoutes } from "./Auth.routes";
import { UserRoutes } from "./User.routes";

const routers = Router();

const moduleRoutes = [
  {
    path: "/auth",
    route: AuthRoutes,
  },
  {
    path: "/users",
    route: UserRoutes,
  },
];

moduleRoutes.forEach((route) => routers.use(route.path, route.route));

export default routers;
