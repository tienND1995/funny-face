import React, { useEffect, useState, useRef } from 'react'
import axios from 'axios'
import * as faceapi from 'face-api.js'
import { toast } from 'react-toastify'
import 'react-toastify/dist/ReactToastify.css'
import Swal from 'sweetalert2'

import Slider from 'react-slick'
import 'slick-carousel/slick/slick.css'
import 'slick-carousel/slick/slick-theme.css'
import './EventAdd.css'

import headerbg from '../../../../ver2/components/image/bg-header.png'
import Header from '../../../components/Header/Header'
import { useNavigate } from 'react-router-dom'

import configs from '../../../../configs/configs.json'
import TemplateDefault from './TemplateDefault'
const { SERVER_API_METATECH } = configs

const EventAdd = () => {
  const user = JSON.parse(window.localStorage.getItem('user-info'))
  const token = user?.token
  const idUser = user?.id_user

  const navigate = useNavigate()

  const getEventListUser = async (id) => {
    try {
      const { data } = await axios.get(
        `${SERVER_API_METATECH}/lovehistory/user/${id}`
      )

      console.log(data)
    } catch (error) {
      console.log(error)
    }
  }

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

  useEffect(() => {
    getEventListUser(idUser)
    loadModels()
  }, [])

  const loadModels = () => {
    Promise.all([
      faceapi.nets.tinyFaceDetector.loadFromUri('/models'),
      faceapi.nets.faceLandmark68Net.loadFromUri('/models'),
      faceapi.nets.faceRecognitionNet.loadFromUri('/models'),
      faceapi.nets.faceExpressionNet.loadFromUri('/models'),
      faceapi.nets.ssdMobilenetv1.loadFromUri('./models'),
    ]).then(() => {})
  }

  const addEvent = async (id_tbsk) => {
    const device = await getMyDetailUser()
    const formData = new FormData()

    formData.append('ten_sukien', 'tằng hiền')
    formData.append('noidung_su_kien', 'trời đẹp quá')

    formData.append('ten_nam', device.nameM)
    formData.append('ten_nu', device.nameF)
    formData.append('device_them_su_kien', device.browser)
    formData.append('ip_them_su_kien', device.ip)

    formData.append('link_img', 'mai hằng')
    formData.append('link_video', 'mai hằng')
    formData.append('id_template', 'mai hằng')
    formData.append('id_user', idUser)

    try {
      const { data } = await axios.post(
        `${SERVER_API_METATECH}/lovehistory/add/${id_tbsk}`,
        formData,
        {
          headers: {
            Link1: 'image upload',
            Link2: 'image upload',
            Authorization: `Bearer ${token}`,
            'Content-Type': 'multipart/form-data',
          },
        }
      )

      console.log('new event:', data)
      toast.success('Add success!')
    } catch (error) {
      console.log(error)
    }
  }

  const uploadImage = async (imgFile) => {
    if (!idUser) {
      toast.warning('Login is required')
      navigate('/login')
    }

    const formData = new FormData()
    formData.append('src_img', imgFile)

    try {
      if (imgFile) {
        // Gửi cả hai hình ảnh lên server
        const apiResponse = await axios.post(
          `https://metatechvn.store/upload-gensk/${idUser}?type=src_vid`,
          formData,
          {
            headers: {
              Authorization: `Bearer ${token}`,
              'Content-Type': 'multipart/form-data',
            },
          }
        )
        return apiResponse.data
      }

      return null
    } catch (error) {
      toast.warning(error)
      return null
    }
  }

  const [imageVid, setImageVid] = useState('')
  const [isLoading, setIsLoading] = useState(false)

  // * handle image

  const [imageFile, setImageFile] = useState(null)
  const [imgUrl, setImgUrl] = useState(null)

  const validImage = async (image) => {
    try {
      const imageElement = document.createElement('img')
      imageElement.src = image
      const netInput = imageElement

      let detections = await faceapi
        .detectAllFaces(netInput, new faceapi.TinyFaceDetectorOptions())
        .withFaceLandmarks()
        .withFaceExpressions()
      const detections2 = await faceapi
        .detectAllFaces(netInput, new faceapi.SsdMobilenetv1Options())
        .withFaceLandmarks()
        .withFaceExpressions()

      if (detections.length > 1) return detections
      if (detections2.length == 0) return detections2
      if (detections2.length == 1) return detections2
      return detections
    } catch (error) {
      console.log(error)
    }
  }

  const handleChangeImage = async (e) => {
    let file = e.target.files[0]
    const imageUrl = URL.createObjectURL(file)

    if (!file) return

    setIsLoading(true)

    try {
      const res = await validImage(imageUrl)
      if (res.length == 0) {
        setIsLoading(false)
        return Swal.fire(
          'Oops...',
          'No faces can be recognized in the photo!',
          'warning'
        )
      }
      if (res.length > 1) {
        setIsLoading(false)
        return Swal.fire(
          'Oops...',
          'Photos must contain only one face!',
          'warning'
        )
      }

      setIsLoading(false)

      setImgUrl(imageUrl)
      const imageFile = await uploadImage(file)
      setImageFile(imageFile)
    } catch (error) {
      console.log(error)
      setIsLoading(false)
    }
  }

  const settingTemplate = {
    dots: false,
    infinite: true,
    speed: 500,
    slidesToShow: 1,
    slidesToScroll: 1,
    centerMode: true,
  }

  const settings = {
    dots: false,
    infinite: true,
    speed: 500,
    slidesToShow: 2,
    slidesToScroll: 2,
    centerMode: true,
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

      <div className="addEvent">
        <div className="w-1/4 addEvent-left">
          <div className="addEvent-template">
            <div className="addEvent-view">
              <h4>Templates</h4>
              <a href="#">View all</a>
            </div>

            <div className="addEvent-template-content">
              <Slider {...settingTemplate}>
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
              <a href="#">View all</a>
            </div>

            <Slider {...settings}>
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
            <div className="addEvent-video-upload addEvent-btn">
              <input type="file" accept="video/*" />
              <p>Upload video</p>
            </div>
          </div>

          <div className="addEvent-image">
            <div className="addEvent-view">
              <h4>Images</h4>
              <a href="#">View all</a>
            </div>

            <Slider {...settings}>
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

            <div className="addEvent-image-upload addEvent-btn">
              <input type="file" accept="image/*" />
              <p>Upload image</p>
            </div>
          </div>
        </div>

        <div className="w-3/4 addEvent-right">
          <TemplateDefault />
        </div>
      </div>
    </>
  )
}

export default EventAdd
