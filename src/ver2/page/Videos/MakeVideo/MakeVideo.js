import axios from 'axios'
import * as faceapi from 'face-api.js'
import React, { useEffect, useState } from 'react'
import ReactLoading from 'react-loading'
import { useDispatch } from 'react-redux'
import { useLocation, useNavigate } from 'react-router-dom'
import { toast } from 'react-toastify'
import 'react-toastify/dist/ReactToastify.css'
import '../../../css/AddEvent.css'
import RenderRandomWaitImage from '../../../components/randomImages'

import add from '../../../components/image/add.png'
import pen from '../../../components/image/edit-2.png'
import './MakeVideo.css'
import Swal from 'sweetalert2'
import Header from '../../../components/Header/Header'

function MakeVideo() {
  const [image1, setImage1] = useState(null)
  const [isLoading, setIsLoading] = useState(false)
  const [showImg, setShowImg] = useState({ img1: null })
  const [randomImages, setRandomImages] = useState(null)
  const userInfo = JSON.parse(window.localStorage.getItem('user-info'))
  const token = userInfo && userInfo.token
  const navigate = useNavigate()
  const dispatch = useDispatch()

  const ID_DEFAULT = 2
  const VIDEO_DEFAULT =
    'https://github.com/sonnh7289/funnyvideo_faceFunny/raw/main/catbanh2.mp4'

  useEffect(() => {
    Promise.all([
      faceapi.nets.tinyFaceDetector.loadFromUri('/models'),
      faceapi.nets.faceLandmark68Net.loadFromUri('/models'),
      faceapi.nets.faceRecognitionNet.loadFromUri('/models'),
      faceapi.nets.faceExpressionNet.loadFromUri('/models'),
      faceapi.nets.ssdMobilenetv1.loadFromUri('./models'),
    ]).then(() => {})
  }, [])

  const idUser = userInfo && userInfo.id_user

  const getMyDetailUser = async () => {
    try {
      const { data } = await axios.get('https://api.ipify.org/?format=json')
      if (data.ip) {
        const browser = window.navigator.userAgent
        return {
          browser: browser,
          ip: data.ip,
        }
      }
      return false
    } catch (error) {
      console.log(error)
      return false
    }
  }

  const closeUploadImg = async () => {
    setImage1(null)
    setIsLoading(false)
    setShowImg({ img1: null })
    document.querySelector('#img1').value = ''
    return
  }

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

  const [imageVid, setImageVid] = useState('')

  const handleChangeImage = async (event, setImage, atImg) => {
    let file = event.target.files[0]
    if (!file) {
      return
    }
    setIsLoading(true)
    try {
      const res = await validImage(URL.createObjectURL(file))
      if (res.length == 0) {
        setIsLoading(false)
        closeUploadImg()
        return Swal.fire(
          'Oops...',
          'No faces can be recognized in the photo!',
          'warning'
        )
      }
      if (res.length > 1) {
        setIsLoading(false)
        closeUploadImg()
        return Swal.fire(
          'Oops...',
          'Photos must contain only one face!',
          'warning'
        )
      }

      setIsLoading(false)
      if (atImg == 'img1') {
        let send = showImg
        send.img1 = URL.createObjectURL(file)
        setShowImg(send)
        setImage(file)
        const imagevid = await uploadImage(file)
        setImageVid(imagevid)
      }
    } catch (error) {
      console.log(error)
      setIsLoading(false)
      closeUploadImg()
    }
  }

  const [tenVideo, setTenVideo] = useState()
  const location = useLocation()

  const queryParams = new URLSearchParams(location.search)
  const id = queryParams.get('id') || ID_DEFAULT
  const link = queryParams.get('link') || VIDEO_DEFAULT
  const history = useNavigate()

  const uploadImage = async (image1) => {
    if (idUser === null) {
      toast.warning('Login is required')
      navigate('/login')
    }

    const formData = new FormData()
    formData.append('src_img', image1)

    try {
      if (image1) {
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
        return apiResponse.data // Trả về dữ liệu từ API
      }

      return null
    } catch (error) {
      toast.warning(error)
      return null
    }
  }

  const fetchData = async () => {
    if (!tenVideo.trim() || !showImg.img1) {
      toast.warning('Enter Name Video!')
      return
    }

    setIsLoading(true)
    try {
      const device = await getMyDetailUser()

      const response = await axios.get(
        `https://lhvn.online/getdata/genvideo?id_video=${id}&device_them_su_kien=${device.browser}&ip_them_su_kien=${device.ip}&id_user=${idUser}&image=${imageVid}&ten_video=${tenVideo}`,
        {
          headers: {
            Authorization: `Bearer ${token}`,
            'Content-Type': 'multipart/form-data',
          },
        }
      )

      dispatch({
        type: 'SET_RESPONSE_DATA',
        payload: response.data,
      })

      const idEvent = response.data.sukien_video.id_sukien_video
      history(`videos/detail-video/${idEvent}`)

      // toast.success("Successful");
    } catch (error) {
      toast.warning(error.message)
      setIsLoading(false)
    }
  }

  const renderLoading = () => {
    if (isLoading) {
      return (
        <div className="fixed top-0 min-w-[100%] h-[100vh] z-30">
          <div className="absolute top-0 min-w-[100%] h-[100vh] bg-red-500 opacity-30 z-10"></div>
          <div
            style={{
              display: 'flex',
              justifyContent: 'right',
              alignItems: 'center',
            }}
            className="absolute z-20 opacity-100 -translate-x-2/4 -translate-y-2/4 left-2/4 top-2/4"
          >
            <ReactLoading type={'bars'} color={'#C0C0C0'} />
          </div>
        </div>
      )
    }
    return null
  }

  return (
    <>
      <Header
        data={{
          title: 'create a video',
          myCollection: true,
          download: true,
        }}
      />

      <div className="make-video">
        {randomImages !== null && (
          <RenderRandomWaitImage images1={randomImages} />
        )}
        {isLoading ? renderLoading() : ''}
        <div className="flex flex-col lg:flex-row lg:items-center">
          <div className="p-4 lg:w-1/2">
            <div className="flex items-center justify-center name-video">
              <img src={pen} alt="edit" />
              <input
                type="text"
                placeholder="Video title"
                value={tenVideo}
                onChange={(e) => setTenVideo(e.target.value)}
              />
            </div>

            <div className="flex items-center justify-center">
              <div className="relative responsiveImg create-video">
                <img className="create-video-add" src={add} alt="" />

                <div
                  className="responsiveImg absolute cursor-pointer w-full h-full rounded-[50%] bg-center bg-no-repeat bg-cover bottom-0 "
                  style={
                    showImg.img1
                      ? { backgroundImage: `url(${showImg.img1})` }
                      : null
                  }
                ></div>

                <input
                  onChange={(e) => {
                    handleChangeImage(e, setImage1, 'img1')
                  }}
                  type="file"
                  accept="image/*"
                  id="img1"
                  className={
                    image1
                      ? ' opacity-0 responsiveImg cursor-pointer w-full h-full rounded-[50%]  bg-center bg-no-repeat bg-cover'
                      : ' opacity-0 cursor-pointer w-full h-full rounded-[50%] absolute bg-center bg-no-repeat bg-black'
                  }
                />
              </div>
            </div>

            <button
              onClick={() => fetchData()}
              className="flex items-center justify-center transition-transform duration-300 start-video "
            >
              Start
            </button>
          </div>

          <div className="p-4 lg:w-1/2">
            <div className="flex flex-col">
              <div className="flex items-center justify-center">
                <div className="make-video__video">
                  <video controls>
                    <source src={link} type="video/mp4" />
                    Trình duyệt của bạn không hỗ trợ thẻ video.
                  </video>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </>
  )
}

export default MakeVideo
