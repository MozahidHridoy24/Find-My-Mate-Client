import { createBrowserRouter } from "react-router";
import MainLayout from "../layouts/MainLayout";
import Home from "../pages/Home/Home";
import Login from "../pages/Auth/Login";
import Register from "../pages/Auth/Register";
import DashboardLayout from "../layouts/DashboardLayout";
import PrivateRoute from "./PrivateRoute";
import EditBiodata from "../pages/Dashboard/User/EditBiodata";
import ViewBiodata from "../pages/Dashboard/User/ViewBiodata";
import AllBiodatas from "../pages/Biodatas/AllBiodatas";
import BiodataDetails from "../pages/Biodatas/BiodataDetails";
import FavoritesBiodata from "../pages/Dashboard/User/FavoritesBiodata";
import Payment from "../pages/Dashboard/Payment/Payment";
import Checkout from "../pages/Dashboard/Payment/Checkout";
import MyContactRequest from "../pages/Dashboard/User/MyContactRequest";
import AdminHome from "../pages/Dashboard/Admin/AdminHome";
import ManageUsers from "../pages/Dashboard/Admin/ManageUsers";
import ApprovedPremium from "../pages/Dashboard/Admin/ApprovedPremium";
import ApproveContactRequest from "../pages/Dashboard/Admin/ApproveContactRequest";

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
      {
        path: "login",
        element: <Login></Login>,
      },
      {
        path: "register",
        element: <Register></Register>,
      },
      {
        path: "/biodatas",
        element: <AllBiodatas></AllBiodatas>,
      },
      {
        path: "/biodata-details/:id",
        element: (
          <PrivateRoute>
            <BiodataDetails></BiodataDetails>
          </PrivateRoute>
        ),
      },
      {
        path: "/checkout/:id",
        element: (
          <PrivateRoute>
            <Checkout></Checkout>
          </PrivateRoute>
        ),
      },
    ],
  },
  {
    path: "/dashboard",
    element: (
      <PrivateRoute>
        <DashboardLayout></DashboardLayout>
      </PrivateRoute>
    ),
    children: [
      // admin routes
      {
        path: "admin-home",
        element: <AdminHome></AdminHome>,
      },
      {
        path: "manage-users",
        element: <ManageUsers></ManageUsers>,
      },
      {
        path: "approved-premium",
        element: <ApprovedPremium></ApprovedPremium>,
      },
      {
        path: "approved-contact-request",
        element: <ApproveContactRequest></ApproveContactRequest>,
      },
      // user routes
      {
        path: "edit-biodata",
        element: <EditBiodata></EditBiodata>,
      },
      {
        path: "view-biodata",
        element: <ViewBiodata></ViewBiodata>,
      },
      {
        path: "my-contact-requests",
        element: <MyContactRequest></MyContactRequest>,
      },
      {
        path: "favourites",
        element: <FavoritesBiodata></FavoritesBiodata>,
      },
    ],
  },
]);
