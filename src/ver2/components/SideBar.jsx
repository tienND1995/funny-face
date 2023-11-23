import React from "react";
import toggleMenuIcon from "../../ver2/components/image/toggleMenuIcon.png";
import searchIcon from "../../ver2/components/image/searchIcon/vuesax/bold/search-normal.png";
import HomeIcon from "@mui/icons-material/Home";

import FavoriteIcon from "@mui/icons-material/Favorite";
import EventIcon from "@mui/icons-material/Event";
import PlayCircleOutlineIcon from "@mui/icons-material/PlayCircleOutline";
import ImageIcon from "@mui/icons-material/Image";
import messagaIcon from "../../ver2/components/image/messageIcon/vuesax/bold/message-question.png";
import { useState } from "react";
import { NavLink } from "react-router-dom";
import DoubleHeartIcon from "../../ver2/components/image/heart-icon-madefuture.png";

const SideBar = () => {
  const [showSideBar, setShowSideBar] = useState(true);

  const toggleSideBar = () => {
    setShowSideBar(!showSideBar);
  };

  return (
    <div className="max-w-[376px]">
      <div
        className={`flex flex-col w-[${
          showSideBar ? "full" : "100px"
        }] h-[600px] bg-[#32323280] p-6 rounded-lg mx-8 transition-all duration-300`}
      >
        <div className="main-nav flex flex-col">
          {!showSideBar && (
            <img
              src={DoubleHeartIcon}
              className="h-[41px] w-[51px] mx-auto"
              alt="heart Icon"
            />
          )}
          <div
            className={`header-main-nav flex items-center w-full mb-4 ${
              showSideBar ? "justify-center" : ""
            }`}
          >
            <h2
              className={`font-normal text-[28px] text-white starborn ${
                showSideBar ? "" : "hidden"
              }`}
            >
              Future Love
            </h2>
            <img
              onClick={toggleSideBar}
              src={toggleMenuIcon}
              className={`h-[32px] w-[32px] fill-blue-500 ${
                showSideBar ? "ml-auto" : "mx-auto my-8"
              }  transform ${showSideBar ? "" : "rotate-180"}`}
              alt="Toggle Menu Icon"
            />
          </div>

          <>
            {showSideBar && (
              <div className="relative w-full">
                <input
                  type="text"
                  className="h-[40px] w-full rounded-xl my-10 pl-12 bg-[#FFFFFF1A] text-white text-xl pr-4 font-sans font-normal"
                  placeholder="   Search"
                />
                <img
                  src={searchIcon}
                  alt="Search"
                  className="absolute left-3 top-1/2 transform -translate-y-1/2 h-6 w-6"
                />
              </div>
            )}

            <div
              className={`mainLink flex flex-col items-${
                showSideBar ? "start" : "center"
              } text-2xl text-white gap-8 font-sans`}
            >
              <NavLink
                to="/home"
                className="flex items-center justify-between gap-4"
              >
                {({ isActive }) => (
                  <>
                    <HomeIcon
                      color={isActive ? "success" : ""}
                      fontSize="large"
                      className="h-[36px] w-[36px]"
                    />
                    {showSideBar && (
                      <span className={isActive ? "text-[#1DB954]" : ""}>
                        Home
                      </span>
                    )}
                  </>
                )}
              </NavLink>
              <NavLink
                to="/love"
                className="flex items-center justify-between gap-4"
              >
                {({ isActive }) => (
                  <>
                    <FavoriteIcon
                      color={isActive ? "success" : ""}
                      fontSize="large"
                      className="h-[36px] w-[36px]"
                    />
                    {showSideBar && (
                      <span className={isActive ? "text-[#1DB954]" : ""}>
                        Love
                      </span>
                    )}
                  </>
                )}
              </NavLink>
              <NavLink
                to="/events"
                className="flex items-center justify-between gap-4"
              >
                {({ isActive }) => (
                  <>
                    <EventIcon
                      color={isActive ? "success" : ""}
                      fontSize="large"
                      className="h-[36px] w-[36px]"
                    />

                    {showSideBar && (
                      <span className={isActive ? "text-[#1DB954]" : ""}>
                        Events
                      </span>
                    )}
                  </>
                )}
              </NavLink>
              <NavLink
                to="/video"
                className="flex items-center justify-between gap-4"
              >
                {({ isActive }) => (
                  <>
                    <PlayCircleOutlineIcon
                      color={isActive ? "success" : ""}
                      fontSize="large"
                      className="h-[36px] w-[36px]"
                    />
                    {showSideBar && (
                      <span className={isActive ? "text-[#1DB954]" : ""}>
                        Video
                      </span>
                    )}
                  </>
                )}
              </NavLink>
              <NavLink
                to=""
                className="flex items-center justify-between gap-4"
              >
                {({ isActive }) => (
                  <>
                    <ImageIcon
                      color={isActive ? "success" : ""}
                      fontSize="large"
                      className="h-[36px] w-[36px]"
                    />
                    {showSideBar && (
                      <span className={isActive ? "text-[#1DB954]" : ""}>
                        Image
                      </span>
                    )}
                  </>
                )}
              </NavLink>
            </div>
          </>
        </div>
      </div>
      <div className="h-6 bg-black"></div>
      <div
        className={`flex flex-col justify-center  w-[${
          showSideBar ? "full" : "100px"
        }] h-[100px] bg-[#32323280] items-${
          showSideBar ? "start" : "center"
        } p-6 rounded-lg mx-8 transition-all duration-300`}
      >
        <NavLink
          className={`flex items-center justify-between gap-4 font-sans text-3xl text-white ${
            showSideBar ? "" : "justify-center"
          }`}
        >
          <img
            className="h-10"
            src={messagaIcon}
            alt="Help & getting started"
          />
          {showSideBar && <span>Help & getting started</span>}
        </NavLink>
      </div>
    </div>
  );
};

export default SideBar;
