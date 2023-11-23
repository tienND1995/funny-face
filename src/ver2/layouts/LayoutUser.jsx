import React from "react";
import { Outlet } from "react-router";
import Header from "../components/Header";
import SectionHeader from "../components/SectionHeader";
import SideBar from "../components/SideBar";
const LayoutUser = () => {
  return (
    <>
      <div className="flex h-full min-h-screen  bg-black">
        <SideBar />
        <div className="flex flex-col w-full mr-8 ">
          <SectionHeader />
          <Outlet />
        </div>
      </div>
    </>
  );
};

export default LayoutUser;
