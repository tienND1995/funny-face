import React from "react";
import Header from "../components/Header";
import { Outlet } from "react-router";
import SectionHeader from "../components/SectionHeader";
import SideBar from "../components/SideBar";
const LayoutGuest = () => {
  return (
    <div className="bg-black">
      <Outlet />
    </div>
  );
};

export default LayoutGuest;
