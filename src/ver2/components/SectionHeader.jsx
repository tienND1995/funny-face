import React from "react";
import ArrowCircleLeftIcon from "@mui/icons-material/ArrowCircleLeft";
import ArrowCircleRightIcon from "@mui/icons-material/ArrowCircleRight";
import DownloadIcon from "@mui/icons-material/Download";
import NotificationsIcon from "@mui/icons-material/Notifications";
import AccountCircleIcon from "@mui/icons-material/AccountCircle";
const SectionHeader = () => {
  return (
    <div className="h-[200px] bg-gradient-to-r from-[#1A542F] to-[#355B42] w-full rounded-tl-lg rounded-tr-lg p-6 text-white font-sans  flex">
      <div className="flex flex-col justify-center gap-8">
        <div>
          <ArrowCircleLeftIcon sx={{ fontSize: 40, color: "#FFFFFF33" }} />
          <ArrowCircleRightIcon sx={{ fontSize: 40, color: "#FFFFFF33" }} />
        </div>
        <h2 className="font-bold font-sans text-[36px]">
          First step up load your photo
        </h2>
      </div>
      <div className=" ml-auto items-start  flex gap-2">
        <button className="px-[12px] py-[8px] text-md font-normal bg-[#FFFFFF33] rounded-xl">
          <DownloadIcon />
          Download app
        </button>
        <NotificationsIcon sx={{ fontSize: 32 }} />
        <AccountCircleIcon sx={{ fontSize: 32 }} />
      </div>
    </div>
  );
};

export default SectionHeader;
