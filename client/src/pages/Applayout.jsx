import React from "react";

import { Outlet } from "react-router-dom";

const Applayout = () => {
  return (
    <>
      <Navbar />
      <Outlet />
      <Footer />
    </>
  );
};

export default Applayout;
