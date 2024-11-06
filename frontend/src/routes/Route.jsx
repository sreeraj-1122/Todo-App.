import { createBrowserRouter } from "react-router-dom";
import CommonLayout from "../Layout/CommenLayout/CommonLayout";
import Hero from "../components/Hero";
import Login from "../components/auth/Login";
import Register from "../components/auth/Register";
import ProjectLayout from "../Layout/CommenLayout/ProjectLayout";
import ProtectedRoute from "../components/ProtectedRoute/ProtectedRoute";
import ProjectList from "../pages/ProjectPage/ProjectList";
import ProjectDetails from "../pages/ProjectPage/ProjectDetails";

const router = createBrowserRouter([
    {
      path: "/",
      element: <CommonLayout />,
      children: [
        { path: "", element: <Hero /> },
        { path: "login", element: <Login /> },
        { path: "register", element: <Register /> },
      ],
    },
    {
      path: "/projects",
      element: <ProtectedRoute />,
      children: [
        {
          element: <ProjectLayout />,
          children: [
            { path: "", element: <ProjectList /> },
            { path: ":id", element: <ProjectDetails /> },
          ],
        },
      ],
    },
  ]);
  
  export default router;