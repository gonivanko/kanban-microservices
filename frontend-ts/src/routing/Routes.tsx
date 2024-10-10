import {
  RouterProvider,
  createBrowserRouter,
  RouteObject,
} from "react-router-dom";

import LoginPage from "../pages/LoginPage/LoginPage";
import KanbanBoard from "../pages/KanbanBoardPage/KanbanPage";

import { useAuth } from "../providers/AuthProvider";
import { ProtectedRoute } from "./ProtectedRoute";
import RegistrationStepper from "../components/RegistrationStepper/RegistrationStepper";
import BoardPage from "../pages/BoardPage/BoardPage";

const Routes: React.FC = () => {
  const { token } = useAuth();

  const routesForPublic: RouteObject[] = [
    {
      path: "/register",
      element: <RegistrationStepper />,
    },
    {
      path: "/login",
      element: <LoginPage />,
    },
    {
      path: "/board",
      element: <BoardPage />,
    },
  ];

  const routesForAuthenticatedOnly: RouteObject[] = [
    {
      path: "/",
      element: <ProtectedRoute />,
      children: [
        {
          path: "/",
          element: <KanbanBoard />,
        },
        {
          path: "/profile",
          element: <div>User Profile</div>,
        },
      ],
    },
  ];

  const router = createBrowserRouter([
    ...routesForPublic,
    ...(!token ? [] : []),
    ...routesForAuthenticatedOnly,
  ]);

  return <RouterProvider router={router} />;
};

export default Routes;
