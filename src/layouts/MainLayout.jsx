import React from "react";
import { Outlet } from "react-router";
import Navbar from "../components/Navbar";

const MainLayout = () => {
  return (
    <div>
      <Navbar></Navbar>
      <div className="w-11/12 mx-auto min-h-screen">
        <Outlet></Outlet>
      </div>
    </div>
  );
};

export default MainLayout;
