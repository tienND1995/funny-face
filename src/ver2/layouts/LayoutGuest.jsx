import React from "react";
import { Outlet } from "react-router";
const LayoutGuest = () => {
  return (
    <div className="bg-black">
      <Outlet />
    </div>
  );
};

export default LayoutGuest;
