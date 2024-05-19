import React from "react";

import Navbar from "../components/Navbar";
import { Outlet } from "react-router-dom";
import Footer from "../components/Footer";
const Applayout = () => {
  return (
    <div className="m-[50px]">
      <Outlet />
    </div>
  );
};

export default Applayout;
