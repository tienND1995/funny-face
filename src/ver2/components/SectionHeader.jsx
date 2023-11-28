import React, { useEffect, useState } from "react";
import ArrowCircleLeftIcon from "@mui/icons-material/ArrowCircleLeft";
import ArrowCircleRightIcon from "@mui/icons-material/ArrowCircleRight";
import DownloadIcon from "@mui/icons-material/Download";
import NotificationsIcon from "@mui/icons-material/Notifications";
import AccountCircleIcon from "@mui/icons-material/AccountCircle";
const SectionHeader = () => {
  const [isSticky, setSticky] = useState(false);

  useEffect(() => {
    const handleScroll = () => {
      if (window.scrollY > 0) {
        setSticky(true);
      } else {
        setSticky(false);
      }
    };

    window.addEventListener('scroll', handleScroll);

    return () => {
      window.removeEventListener('scroll', handleScroll);
    };
  }, []);
  return (
    <div className={isSticky ? 'sticky top-0 w-full h-[50px] z-50 bg-gradient-to-r from-[#1A542F] to-[#355B42] flex text-white font-sans rounded-tr-lg rounded-tl-lg' : 'rounded-tr-lg rounded-tl-lg w-full h-[200px] bg-gradient-to-r from-[#1A542F] to-[#355B42] flex text-white font-sans'} >
      <div className={isSticky ? 'flex gap-8' : 'flex flex-col justify-center gap-8'}>
        <div>
          <ArrowCircleLeftIcon sx={{ fontSize: 40, color: "#FFFFFF33" }} />
          <ArrowCircleRightIcon sx={{ fontSize: 40, color: "#FFFFFF33" }} />
        </div>
        <h2 className={isSticky ? 'font-bold font-sans text-[30px]' : 'font-bold font-sans text-[36px]'}>
          First step up load your photo
        </h2>
      </div>
      <div className={isSticky ? 'ml-auto items-start flex gap-2 ' : 'ml-auto items-start  flex gap-2'} >
        <button className="{px-[12px] py-[8px] text-md font-normal bg-[#FFFFFF33] rounded-xl">
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
