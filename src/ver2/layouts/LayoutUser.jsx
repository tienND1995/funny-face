import React, { useState } from 'react'
import { Outlet } from 'react-router'
import SectionHeader from '../components/SectionHeader'
import SideBar from '../components/SideBar'
const LayoutUser = () => {
  const [width, setWidth] = useState(0)
  
  const getWidthSideBar = (data) => {
    setWidth(data)
  }

  return (
    <>
      <div className="flex h-full min-h-screen  bg-black">
        <SideBar onRecive={getWidthSideBar} />
        <div
          style={{ marginLeft: width }}
          className="future-main flex flex-col w-full mr-8 "
        >
          <SectionHeader />
          <Outlet />
        </div>
      </div>
    </>
  )
}

export default LayoutUser
