import AccountCircleIcon from '@mui/icons-material/AccountCircle'
import ArrowCircleLeftIcon from '@mui/icons-material/ArrowCircleLeft'
import ArrowCircleRightIcon from '@mui/icons-material/ArrowCircleRight'
import DownloadIcon from '@mui/icons-material/Download'
import NotificationsIcon from '@mui/icons-material/Notifications'
import React, { useEffect, useState } from 'react'

import { Link, useParams } from 'react-router-dom'
import axios from 'axios'
import Modal from 'react-modal'

import './Header.css'

import boysmall from '../image/boy-small.png'
import girlsmall from '../image/girl-small.png'
import Clock from '../ClockEvent/CLockEvent'

const Header = ({ data }) => {
  const [isSticky, setSticky] = useState(false)

  const { id } = useParams()
  const [dataUser, setDataUser] = useState([])

  const [isOpenModal, setIsOpenModal] = useState(false)
  const [imgUrl, setImgUrl] = useState(null)

  const fetchDataUser = async () => {
    try {
      const response = await axios.get(
        `https://metatechvn.store/lovehistory/${id}`
      )
      setDataUser(response.data.sukien[0])
    } catch (err) {
      console.log(err)
    }
  }

  const handleScroll = () => {
    if (window.scrollY > 0) {
      setSticky(true)
    } else {
      setSticky(false)
    }
  }

  const modalShow = (imgUrl = null) => {
    setIsOpenModal(true)
    setImgUrl(imgUrl)
  }
  const modalHide = () => setIsOpenModal(false)

  useEffect(() => {
    fetchDataUser()

    window.addEventListener('scroll', handleScroll)
    return () => {
      window.removeEventListener('scroll', handleScroll)
    }
  }, [])

  return (
    <div
      className="component-header"
      style={{
        background:
          data?.background ||
          'linear-gradient(91.12deg, #1a542f 21.71%, #355b42 78.53%)',
      }}
    >
      <div className="component-header-top">
        <div className="component-header-btn">
          <ArrowCircleLeftIcon sx={{ fontSize: 40, color: '#FFFFFF33' }} />
          <ArrowCircleRightIcon sx={{ fontSize: 40, color: '#FFFFFF33' }} />
        </div>

        <div className="component-header-user">
          {data?.download && (
            <Link to="/download">
              <DownloadIcon />
              Download app
            </Link>
          )}
          <NotificationsIcon />
          <AccountCircleIcon />
        </div>
      </div>
      <div className="component-header-bottom">
        {data?.title && (
          <h2 className="component-header-title">{data.title}</h2>
        )}
        {data?.myCollection && <Link to="/videos/my-video">My collections >></Link>}
        {data?.events && <Link to="/events">My events</Link>}
      </div>

      {data?.events && (
        <div className="component-header-events pt-[40px]">
          <div className="events-header w-full">
            <div className="events-couple">
              <div className="couple-item">
                <div className="couple-icon couple-icon__male">
                  <img src={boysmall} alt="" />
                </div>

                <div className="couple-image couple-image__boy">
                  <img
                    src={dataUser?.link_nam_goc}
                    alt=""
                    onClick={() => modalShow(dataUser.link_nam_goc)}
                  />
                </div>
              </div>

              <div className="couple-item couple-item__female">
                <div className="couple-icon couple-icon__female">
                  <img src={girlsmall} alt="" />
                </div>

                <div className="couple-image couple-image__girl">
                  <img
                    src={dataUser?.link_nu_goc}
                    alt=""
                    className="love-img"
                    onClick={() => modalShow(dataUser.link_nu_goc)}
                  />
                </div>
              </div>
            </div>

            <div className="events-time">
              {dataUser.real_time && <Clock data={dataUser.real_time} />}
            </div>
          </div>
        </div>
      )}

      <Modal
        isOpen={isOpenModal}
        onRequestClose={modalHide}
        className="component-header-modal"
        contentLabel="Example Modal"
      >
        <div className="component-header-modal-content">
          <button onClick={modalHide}>close</button>
          <img src={imgUrl} alt="This is a image!" />
        </div>
      </Modal>
    </div>
  )
}

export default Header
