import express from "express";
import docsRoute from "./docs.route";
import config from "../../config/config";

const router = express.Router();

const defaultRoutes: Array<Object> = [];

const devRoutes = [
  // routes available only in development mode
  {
    path: "/docs",
    route: docsRoute,
  },
];

defaultRoutes.forEach((route: any) => {
  router.use(route.path, route.route);
});

/* istanbul ignore next */
if (config.env === "development" || config.env === "production") {
  devRoutes.forEach((route) => {
    router.use(route.path, route.route);
  });
}

export default router;
