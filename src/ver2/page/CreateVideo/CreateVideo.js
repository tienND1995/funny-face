import React, { useState, useRef, useEffect } from 'react'
import axios from 'axios'
import * as faceapi from 'face-api.js'
import './CreateVideo.css'

import { useNavigate } from 'react-router-dom'
import { useDispatch } from 'react-redux'

import { toast } from 'react-toastify'
import Swal from 'sweetalert2'
import ReactLoading from 'react-loading'

import Header from '../../components/Header/Header'
import addCircle from '../../components/image/add-circle.png'

export const CreateVideo = () => {
  const TITLE_DEFAULT = 'Video title'

  const userInfo = JSON.parse(window.localStorage.getItem('user-info'))
  const token = userInfo?.token || null
  const idUser = userInfo?.id_user || null

  const [isLoading, setIsLoading] = useState(false)
  const navigate = useNavigate()
  const dispatch = useDispatch()

  const [image1, setImage1] = useState(null)
  const [imageVid, setImageVid] = useState('')
  const [imgUrl, setImgUrl] = useState(null)

  const [videoUrl, setVideoUrl] = useState(null)
  const [title, setTitle] = useState(TITLE_DEFAULT)

  const videoRef = useRef()
  const videoUploadRef = useRef()
  const titleRef = useRef()
  const inputTitleRef = useRef()
  const imgRef = useRef()

  useEffect(() => {
    loadModels()
  }, [])

  const loadModels = () => {
    Promise.all([
      faceapi.nets.tinyFaceDetector.loadFromUri('/models'),
      faceapi.nets.faceLandmark68Net.loadFromUri('/models'),
      faceapi.nets.faceRecognitionNet.loadFromUri('/models'),
      faceapi.nets.faceExpressionNet.loadFromUri('/models'),
      faceapi.nets.ssdMobilenetv1.loadFromUri('./models'),
    ]).then(() => {
      console.log('load models success!')
    })
  }

  const handleSubmitFrom = (e) => {
    e.preventDefault()
    console.log('submit')
  }

  const handleChangeTitle = (e) => {
    setTitle(e.target.value || TITLE_DEFAULT)
  }

  const handleChangeImage = async (e) => {
    let file = e.target.files[0]
    const imageUrl = URL.createObjectURL(file)

    if (!file) {
      return
    }

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
      setImage1(file)
      const imagevid = await uploadImage(file)
      setImageVid(imagevid)
    } catch (error) {
      console.log(error)
      setIsLoading(false)
    }
  }

  const handleChangeVideo = (e) => {
    const file = e.target.files[0]
    const reader = new FileReader()

    if (!file) {
      return
    }

    reader.readAsDataURL(file)
    reader.onload = async () => {
      const src = reader.result
      setVideoUrl(src)

      videoRef.current.load()
      videoUploadRef.current.load()
    }
  }

  const handleClear = () => {
    Swal.fire({
      title: 'Bạn có chắc chắn ?',
      icon: 'warning',
      showCancelButton: true,
      confirmButtonColor: '#3085d6',
      cancelButtonColor: '#d33',
      confirmButtonText: 'Yes!',
    }).then((result) => {
      if (result.isConfirmed) {
        setVideoUrl(null)
        setImgUrl(null)
        setTitle(TITLE_DEFAULT)

        videoRef.current.load()
        videoUploadRef.current.load()
        inputTitleRef.current.value = ''
        imgRef.current.value = ''
      }
    })
  }

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

  // * check image valid
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

  const renderLoading = () => {
    return (
      <div className="fixed left-0 top-0 min-w-[100%] h-[100vh] z-30">
        <div className="absolute top-0 min-w-[100%] h-[100vh] bg-red-500 opacity-30 z-10"></div>
        <div
          style={{
            display: 'flex',
            justifyContent: 'right',
            alignItems: 'center',
          }}
          className="absolute -translate-x-2/4 opacity-100 -translate-y-2/4 left-2/4 top-2/4 z-20"
        >
          <ReactLoading type={'bars'} color={'#C0C0C0'} />
        </div>
      </div>
    )
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

      <div className="createVideo">
        {isLoading && renderLoading()}

        <div className="w-1/4 createVideo-upload">
          <form onSubmit={handleSubmitFrom} action="">
            <div className="createVideo-title">
              <label htmlFor="">Video title</label>
              <input
                type="text"
                placeholder="Video title"
                onChange={handleChangeTitle}
                ref={inputTitleRef}
              />
            </div>

            <div className="createVideo-upload-video">
              <label htmlFor="">Upload your video</label>
              <div
                className="createVideo-wrap"
                style={{
                  border: videoUrl ? 'none' : '1px dashed #fff',
                  background: '#00000033',
                }}
              >
                <img
                  src={addCircle}
                  alt=""
                  className="createVideo-wrap__icon"
                />
                <input
                  type="file"
                  onChange={handleChangeVideo}
                  accept="video/*"
                />

                <video ref={videoUploadRef}>
                  <source src={videoUrl} type="video/mp4" />
                </video>
              </div>
            </div>

            <div className="createVideo-upload-image">
              <label htmlFor="">Upload your image</label>
              <div
                className="createVideo-wrap"
                style={{
                  border: imgUrl ? 'none' : '1px dashed #fff',
                  background: imgUrl
                    ? `center/cover no-repeat url(${imgUrl})`
                    : '#00000033',
                }}
              >
                {!imgUrl && (
                  <img
                    src={addCircle}
                    alt=""
                    className="createVideo-wrap__icon"
                  />
                )}

                <input
                  type="file"
                  onChange={handleChangeImage}
                  accept="image/*"
                  ref={imgRef}
                />
              </div>
            </div>

            <button className="createVideo-btn" type="submit">
              Create
            </button>
            {imgUrl || videoUrl || title !== TITLE_DEFAULT ? (
              <button
                onClick={handleClear}
                className="createVideo-btn createVideo-clear"
                type="submit"
              >
                Clear ALL
              </button>
            ) : null}
          </form>
        </div>

        <div className="w-3/4 createVideo-show">
          <div className="createVideo-show-title">
            <h3 ref={titleRef}>{title}</h3>
          </div>
          <div className="createVideo-content">
            <video controls ref={videoRef}>
              <source src={videoUrl} type="video/mp4" />
            </video>
          </div>
        </div>
      </div>
    </>
  )
}
