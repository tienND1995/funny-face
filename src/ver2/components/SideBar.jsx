import HomeIcon from '@mui/icons-material/Home'
import React, { useEffect, useRef } from 'react'
import searchIcon from '../../ver2/components/image/searchIcon/vuesax/bold/search-normal.png'
import toggleMenuIcon from '../../ver2/components/image/toggleMenuIcon.png'

import { useState } from 'react'
import { NavLink } from 'react-router-dom'
import DoubleHeartIcon from '../../ver2/components/image/heart-icon-madefuture.png'
import messagaIcon from '../../ver2/components/image/messageIcon/vuesax/bold/message-question.png'

import AddPhotoAlternateIcon from '@mui/icons-material/AddPhotoAlternate'
import ChildCareIcon from '@mui/icons-material/ChildCare'
import CollectionsIcon from '@mui/icons-material/Collections'
import EventIcon from '@mui/icons-material/Event'
import FavoriteIcon from '@mui/icons-material/Favorite'
import VideoLibraryIcon from '@mui/icons-material/VideoLibrary'
import VideoSettingsIcon from '@mui/icons-material/VideoSettings'

import '../css/Sidebar.css'

const SideBar = (props) => {
  const [showSideBar, setShowSideBar] = useState(true)

  const toggleSideBar = () => {
    setShowSideBar(!showSideBar)
  }

  const sidebarRef = useRef()

  useEffect(() => {
    const widthSideBar = sidebarRef.current.offsetWidth
    const pushWidth = props.onRecive
    pushWidth(widthSideBar)
  }, [showSideBar, sidebarRef.current])

  const menuDefault = [
    {
      id: 1,
      name: 'Home',
      icon: <HomeIcon />,
      path: '/',
    },

    {
      id: 2,
      name: 'Love',
      icon: <FavoriteIcon />,
      path: '/love',
    },

    {
      id: 3,
      name: 'Events',
      icon: <EventIcon />,
      path: '/events',
    },

    {
      id: 4,
      name: 'Videos playlist',
      icon: <VideoLibraryIcon />,
      path: '/videos',
    },

    {
      id: 5,
      name: 'Images playlist',
      icon: <CollectionsIcon />,
      path: '/images',
    },

    {
      id: 6,
      name: 'Create your video',
      icon: <VideoSettingsIcon />,
      path: '/create-video',
    },

    {
      id: 7,
      name: 'Create your image',
      icon: <AddPhotoAlternateIcon />,
      path: '/create-image',
    },

    {
      id: 8,
      name: 'Baby generator',
      icon: <ChildCareIcon />,
      path: '/genbaby',
    },
  ]

  return (
    <div ref={sidebarRef} className="max-w-[376px] sidebar-fixed">
      <div
        className={`flex flex-col w-[${
          showSideBar ? 'full' : '100px'
        }] h-[600px] bg-[#32323280] rounded-lg mx-8 p-6 transition-all duration-300`}
      >
        <div className="flex flex-col main-nav">
          {!showSideBar && (
            <img
              src={DoubleHeartIcon}
              className="h-[41px] w-[51px] mx-auto"
              alt="heart Icon"
            />
          )}
          <div
            className={`header-main-nav flex items-center w-full mb-4 ${
              showSideBar ? 'justify-center' : ''
            }`}
          >
            <h2
              className={`font-normal text-[28px] text-white starborn ${
                showSideBar ? '' : 'hidden'
              }`}
            >
              Funny Face
            </h2>
            <img
              onClick={toggleSideBar}
              src={toggleMenuIcon}
              className={`h-[32px] w-[32px] fill-blue-500 ${
                showSideBar ? 'ml-auto' : 'mx-auto my-8'
              }  transform ${showSideBar ? '' : 'rotate-180'}`}
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
                  className="absolute w-6 h-6 transform -translate-y-1/2 left-3 top-1/2"
                />
              </div>
            )}

            <div
              className={`mainLink flex flex-col items-${
                showSideBar ? 'start' : 'center'
              } text-2xl text-white gap-8 font-sans`}
            >
              {menuDefault.map(({ id, name, icon, path }) => (
                <NavLink
                  to={path}
                  className="flex items-center justify-between gap-4 menu-link"
                  key={id}
                >
                  {icon}
                  {showSideBar && <span>{name}</span>}
                </NavLink>
              ))}
             
            </div>
          </>
        </div>
      </div>
      <div className="h-6 bg-black"></div>
      <div
        className={`flex flex-col justify-center  w-[${
          showSideBar ? 'full' : '100px'
        }] h-[100px] bg-[#32323280] items-${
          showSideBar ? 'start' : 'center'
        } p-6 rounded-lg mx-8 transition-all duration-300`}
      >
        <NavLink
          className={`flex items-center justify-between gap-4 font-sans text-3xl text-white ${
            showSideBar ? '' : 'justify-center'
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
  )
}

export default SideBar
