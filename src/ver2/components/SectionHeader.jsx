import AccountCircleIcon from '@mui/icons-material/AccountCircle'
import ArrowCircleLeftIcon from '@mui/icons-material/ArrowCircleLeft'
import ArrowCircleRightIcon from '@mui/icons-material/ArrowCircleRight'
import DownloadIcon from '@mui/icons-material/Download'
import NotificationsIcon from '@mui/icons-material/Notifications'
import React, { useEffect, useState } from 'react'
const SectionHeader = () => {
  const [isSticky, setSticky] = useState(false)

  useEffect(() => {
    const handleScroll = () => {
      if (window.scrollY > 0) {
        setSticky(true)
      } else {
        setSticky(false)
      }
    }

    window.addEventListener('scroll', handleScroll)

    return () => {
      window.removeEventListener('scroll', handleScroll)
    }

    

  }, [])

  return (
    <div
      className={` bg-gradient-to-r from-[#1A542F] w-full to-[#355B42] rounded-tl-lg rounded-tr-lg p-6 text-white font-sans flex ${
        isSticky ? 'sticky' : 'h-[200px]'
      }`}
    >
      <div
        className={`flex justify-center gap-8 ${isSticky ? '' : 'flex-col'}`}
      >
        <div>
          <ArrowCircleLeftIcon sx={{ fontSize: 40, color: '#FFFFFF33' }} />
          <ArrowCircleRightIcon sx={{ fontSize: 40, color: '#FFFFFF33' }} />
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
  )
}

export default SectionHeader
