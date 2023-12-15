import axios from 'axios'
import React, { useEffect, useRef, useState } from 'react'
import { toast } from 'react-toastify'
import 'react-toastify/dist/ReactToastify.css'
import Swal from 'sweetalert2'

import { useNavigate } from 'react-router'

import Slider from 'react-slick'
import 'slick-carousel/slick/slick-theme.css'
import 'slick-carousel/slick/slick.css'
import './EventAdd.css'

import KeyboardBackspaceIcon from '@mui/icons-material/KeyboardBackspace'
import headerbg from '../../../../ver2/components/image/bg-header.png'
import comment from '../../../components/image/comment.png'
import firstdate from '../../../components/image/first-date.png'
import view from '../../../components/image/view.png'

import { v4 as uuidV4 } from 'uuid'
import Header from '../../../components/Header/Header'
import Loading from '../../../../Loading/Loading'
import configs from '../../../../configs/configs.json'
import { loadModels, uploadImage } from '../../../../library/faceapi'

const { SERVER_API_METATECH } = configs
const INDEX_DEFAULT = 0
const ID_TBSK_DEFAULT = 955674353513
const ID_TEMPLATE_DEFAULT = 1

const EventAdd = () => {
  const user = JSON.parse(window.localStorage.getItem('user-info'))
  const token = user?.token
  const idUser = user?.id_user

  const [isLoading, setIsLoading] = useState(false)
  const navigate = useNavigate()

  const settingSlider = {
    dots: false,
    infinite: false,
    speed: 500,
    slidesToShow: 1,
    slidesToScroll: 1,
    centerMode: true,
    className: 'addEvent-slider',
  }

  useEffect(() => {
    loadModels()
    getImageList(idUser)
    getVideoList()
    getSttEvent(ID_TBSK_DEFAULT)
  }, [])

  const getMyDetailUser = async () => {
    try {
      const { data } = await axios.get('https://api.ipify.org/?format=json')
      if (data.ip) {
        const browser = window.navigator.userAgent
        return {
          browser: browser,
          ip: data.ip,
          nameM: data.ip + ' ' + 'Boy',
          nameF: data.ip + ' ' + 'Girl',
        }
      }

      return false
    } catch (error) {
      console.log(error)
      return false
    }
  }


  
  const [sttEvent, setSttEvent] = useState(0)
  const getSttEvent = async (id_tbsk) => {
    try {
      const response = await axios.get(
        `https://metatechvn.store/lovehistory/${id_tbsk}`
      )
      setSttEvent(response.data.sukien.length)
    } catch (err) {
      console.log(err)
    }
  }

  const addEvent = async () => {
    const device = await getMyDetailUser()
    const formData = new FormData()

    formData.append('ten_sukien', form.title)
    formData.append('noidung_su_kien', form.content)

    formData.append('ten_nam', device.nameM)
    formData.append('ten_nu', device.nameF)
    formData.append('device_them_su_kien', device.browser)
    formData.append('ip_them_su_kien', device.ip)

    formData.append('link_img', imageList[imageIndex])
    formData.append('link_video', videoList[videoIndex])
    formData.append('id_template', ID_TEMPLATE_DEFAULT)
    formData.append('id_user', idUser)

    try {
      const { data } = await axios.post(
        `${SERVER_API_METATECH}/lovehistory/add/${ID_TBSK_DEFAULT}`,
        formData,
        {
          headers: {
            link1: imageList[imageIndex],
            link2: imageList[imageIndex],
            Authorization: `Bearer ${token}`,
            'Content-Type': 'multipart/form-data',
          },
        }
      )

      console.log('new event:', data)
      toast.success('Add success!')

      navigate(`/events/${ID_TBSK_DEFAULT}/${sttEvent + 1}`)
    } catch (error) {
      console.log(error)
    }
  }

  // * get data display

  const [imageList, setImageList] = useState([])
  const getImageList = async (id) => {
    try {
      const response = await axios.get(
        `${SERVER_API_METATECH}/images/${id}?type=video`
      )

      setImageList(response.data.image_links_video)
    } catch (error) {
      console.log(error)
    }
  }

  const [videoList, setVideoList] = useState([])
  const getVideoList = async () => {
    try {
      const response = await axios.get(
        `${SERVER_API_METATECH}/lovehistory/listvideo/1?category=1`
      )

      setVideoList(response.data.list_sukien_video)
    } catch (error) {
      console.log(error)
    }
  }

  // * handle view all
  const [isViewAll, setIsViewAll] = useState({
    status: false,
    type: 'Videos',
  })

  const handleViewAll = (type) => {
    setIsViewAll({ ...isViewAll, status: true, type })
  }

  const renderViewAllContent = (type) => {
    switch (type) {
      case 'videos':
        return videoList.map((video) => (
          <div key={video.id} className="p-2 w-1/2">
            <div className="bg-[#525252] rounded-lg">
              <video className="mx-auto h-[160px]">
                <source src={video.link_video} type="video/mp4" />
              </video>
            </div>
          </div>
        ))

      case 'images':
        return imageList.map((image, index) => (
          <div key={index} className="w-1/2 h-[160px] p-2 ">
            <img
              src={image}
              alt="image boy"
              className="rounded-lg h-full w-full object-cover"
            />
          </div>
        ))

      default:
        return
    }
  }

  // * handle change image and video

  const [imageIndex, setImageIndex] = useState(INDEX_DEFAULT)
  const [videoIndex, setVideoIndex] = useState(INDEX_DEFAULT)
  const videoActiveRef = useRef()

  const handleChangeVideo = (e) => {
    const file = e.target.files[0]
    if (!file) return

    const link_video = URL.createObjectURL(file)
    const video = { link_video, id: uuidV4() }

    const newVideos = [...videoList]
    newVideos.splice(videoIndex, 0, video)

    setVideoList(newVideos)
    videoActiveRef.current?.load()
  }

  const handleChangeImage = async (e) => {
    let file = e.target.files[0]
    const imageUrl = URL.createObjectURL(file)

    if (!file) return

    const newImageList = [...imageList]
    newImageList.splice(imageIndex, 0, imageUrl)

    setImageList(newImageList)
    uploadImage(file, 'vid')
  }

  const [form, setForm] = useState({ title: '', content: '' })
  const handleChangeValue = (e) => {
    setForm({ ...form, [`${e.target.name}`]: e.target.value })
  }

  const handleCreateEvent = () => {
    const { title, content } = form
    if (title.trim() === '')
      return Swal.fire('Oops...', `Please enter title!`, 'warning')

    if (content.trim() === '')
      return Swal.fire('Oops...', `Please enter content!`, 'warning')

    addEvent()
  }

  return (
    <>
      <Header
        data={{
          background: `center/cover no-repeat url(${headerbg})`,
          title: 'add new event',
          download: true,
          myEvent: true,
        }}
      />
      <Loading status={isLoading} />

      <div className="addEvent">
        <div className="w-1/4">
          {!isViewAll.status ? (
            <div className="addEvent-upload">
              <div className="addEvent-template">
                <div className="addEvent-view">
                  <h4>Templates</h4>
                  <a
                    onClick={(e) => {
                      e.preventDefault()
                      handleViewAll('template')
                    }}
                    href="#"
                  >
                    View all
                  </a>
                </div>

                <div className="addEvent-template-content">
                  <Slider {...settingSlider}>
                    <div className="h-[80px] p-2 ">
                      <span className="w-full h-full flex  bg-[#525252] rounded-md"></span>
                    </div>
                    <div className="h-[80px] p-2 ">
                      <span className="w-full h-full flex  bg-[#525252] rounded-md"></span>
                    </div>
                    <div className="h-[80px] p-2 ">
                      <span className="w-full h-full flex  bg-[#525252] rounded-md"></span>
                    </div>
                    <div className="h-[80px] p-2 ">
                      <span className="w-full h-full flex  bg-[#525252] rounded-md"></span>
                    </div>
                    <div className="h-[80px] p-2 ">
                      <span className="w-full h-full flex  bg-[#525252] rounded-md"></span>
                    </div>
                  </Slider>
                </div>
              </div>

              <div className="addEvent-video">
                <div className="addEvent-view">
                  <h4>Videos</h4>
                  <a
                    onClick={(e) => {
                      e.preventDefault()
                      handleViewAll('videos')
                    }}
                    href="#"
                  >
                    View all
                  </a>
                </div>

                <Slider
                  {...settingSlider}
                  afterChange={(index) => setVideoIndex(index)}
                >
                  {videoList.length > 0
                    ? videoList.map((video, index) => (
                        <div key={video.id} className="p-2">
                          <div className="bg-[#525252] rounded-lg">
                            <video
                              ref={index === videoIndex ? videoActiveRef : null}
                              className="mx-auto h-[160px]"
                            >
                              <source src={video.link_video} type="video/mp4" />
                            </video>
                          </div>
                        </div>
                      ))
                    : ''}
                </Slider>

                <div className="addEvent-video-upload addEvent-btn">
                  <input
                    onChange={handleChangeVideo}
                    type="file"
                    accept="video/*"
                  />
                  <p>Upload video</p>
                </div>
              </div>

              <div className="addEvent-image">
                <div className="addEvent-view">
                  <h4>Images</h4>
                  <a
                    onClick={(e) => {
                      e.preventDefault()
                      handleViewAll('images')
                    }}
                    href="#"
                  >
                    View all
                  </a>
                </div>

                <Slider
                  {...settingSlider}
                  afterChange={(index) => setImageIndex(index)}
                >
                  {imageList.length > 0
                    ? imageList.map((image, index) => (
                        <div key={index} className="h-[160px] p-2 ">
                          <img
                            src={image}
                            alt="image"
                            className="rounded-lg h-full w-full object-cover"
                          />
                        </div>
                      ))
                    : ''}
                </Slider>

                <div className="addEvent-image-upload addEvent-btn">
                  <input
                    onChange={handleChangeImage}
                    type="file"
                    accept="image/*"
                  />
                  <p>Upload image</p>
                </div>
              </div>
            </div>
          ) : (
            <div className="viewAll">
              <div className="viewAll-back">
                <a
                  onClick={(e) => {
                    e.preventDefault()
                    setIsViewAll({ ...isViewAll, status: false })
                  }}
                  href="#"
                >
                  <KeyboardBackspaceIcon />
                </a>
                <h3>Template</h3>
              </div>

              <div className="viewAll-content flex flex-wrap">
                {renderViewAllContent(isViewAll.type)}
              </div>
            </div>
          )}
        </div>

        <div className="w-3/4 addEvent-show">
          <div className="event-history-marry">
            <div className="event-marry__info">
              <div className="border-solid border-2 border-black border-dashed h-[30px]">
                <input
                  onChange={handleChangeValue}
                  type="text"
                  name="title"
                  placeholder="Title here"
                />
              </div>
              <div className="border-solid border-2 border-black border-dashed h-[80px]">
                <input
                  onChange={handleChangeValue}
                  type="text"
                  name="content"
                  placeholder="Content here"
                />
              </div>

              <div className="event-marry__view">
                <div>
                  <img src={comment} alt="" />
                  <span>0</span>
                </div>
                <div>
                  <img src={view} alt="" />
                  <span>0</span>
                </div>
              </div>
              <time className="event-marry__times">12/12/2023</time>
            </div>

            <div className="event-marry__image">
              <img className="image1" src={firstdate} alt="" />
              {/* <img className="image2" src="" alt="" /> */}
            </div>
          </div>

          <button className="addEvent-btn-create" onClick={handleCreateEvent}>
            Create
          </button>
        </div>
      </div>
    </>
  )
}

export default EventAdd
