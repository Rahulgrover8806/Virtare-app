import { lazy } from "react";
import { IRoute } from "../models/IHeader";
import routePaths from "./RoutePaths";
export const routes: IRoute[] = [
  {
    path: `${routePaths.SIGNIN}`,
    private: false,
    element: lazy(() => import("../pages/Auth/Signin")),
  },
  {
    path: `${routePaths.SIGNUP}`,
    private: false,
    element: lazy(() => import("../pages/Auth/Signup")),
  },

  {
    path: `${routePaths.DASHBOARD}`,
    private: true,
    element: lazy(() => import("../pages/DashBoard")),
  },
];
