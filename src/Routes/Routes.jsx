import { createBrowserRouter } from "react-router";
import MainLayout from "../layouts/MainLayout";
import Home from "../pages/Home/Home";

export const router = createBrowserRouter([
  {
    path: "/",
    element: <MainLayout></MainLayout>,
    errorElement: <h2>Error</h2>,
    children: [
      {
        index: true,
        path: "/",
        element: <Home></Home>,
      },
    ],
  },
]);
