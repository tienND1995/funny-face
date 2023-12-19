import React, { useEffect, useState } from 'react'
import img2 from '../components/image/Rectangle4958.png'
import axios from 'axios'
import useEventStore from '../../utils/store'
import ReactLoading from 'react-loading'
import * as faceapi from 'face-api.js'
import { toast } from 'react-toastify'
import { Link, useLocation } from 'react-router-dom'
import '../components/Profile.css'
import HistoryCommentList from './HistoryCommentList'
import EventListProfile from './EventListProfile'
import ManagerAcount from './ManagerAcount'
import { IoCloseCircle } from 'react-icons/io5'

export default function Profile() {
  const {state} = useLocation()
  const user = JSON.parse(localStorage.getItem('user-info'))
  const token =  user?.token
  
  const userId = state?.id || user?.id_user 

  const [data, setData] = useState([])
  // const [userName, setUserName] = useState([]);
  const [showModal, setShowModal] = React.useState(false)
  const [showModals, setShowModals] = React.useState(false)
  const [showModals22, setShowModals22] = React.useState(false)
  const [imgdata, setImgData] = useState(false)

  const [showManagerAccount, setShowManagerAccount] = React.useState(false)

  const setUserName = (value) => {
    setData({ ...data, user_name: value })
  }

  // const [showEvent, setShowEvent] = React.useState(false);
  const [listEvent, setListEvent] = useState([])

  const api_key = 'ba35005b6d728bd9197bfd95d64e4e39'
  const server = 'https://metatechvn.store'
  const [notiImage, setNotiImage] = React.useState({
    status: false,
    value: null,
  })

  const [imageVerify, setImageVerify] = React.useState([])
  const [isLoading, setIsLoading] = React.useState(false)
  const [imgSucess, setImgSucces] = React.useState([
    'https://i.ibb.co/qmpDk2W/Man-Big-Shoes-Avatar.png',
  ])
  const [imgError, setImgError] = React.useState([
    'https://i.ibb.co/vBNPH32/Not-Face-Girl-Big-Shoes-Avatar.png',
  ])


  const [selectedImage, setSelectedImage] = useState(null)
  const img_url = {
    // "1": "https://mega.com.vn/media/news/0106_hinh-nen-4k-may-tinh59.jpg",
    // "2": "https://mega.com.vn/media/news/0106_hinh-nen-4k-may-tinh4.jpg"
  }

  const fetchDataIMG = async () => {
    try {
      const { data } = await axios.post(
        `${server}/saveimage/${userId}`,
        JSON.stringify(img_url),
        {
          headers: {
            Authorization: `Bearer ${token}`, // Thêm token vào header
          },
        }
      )
      setImgData(data.list_img)
      console.log(imgdata)
    } catch (error) {
      console.error('Error fetching data:', error)
      // alert("Server error getList 8-12 images");
    }
  }

  const fetchData = async () => {
    try {
      const response = await fetch(`${server}/profile/${userId}`, {
        headers: {
          Authorization: `Bearer ${token}`, // Thêm token vào header
        },
      })
      if (!response.ok) {
        throw new Error('Failed to fetch data')
      }
      const jsonData = await response.json()
      if (jsonData.ketqua === 'khong co user nay') {
        window.localStorage.clear()
        return (window.location.href = '/login')
      }

      setData(jsonData)
    } catch (error) {
      console.log(error)
    }
  }

  const openModals = () => {
    setShowModals(true)
  }

  const closeModals = () => {
    setShowModals(false)
    // closeModal();
  }

  const openModal = () => {
    // console.log("open");
    setShowModal(true)
  }

  const closeModal = () => {
    setShowModal(false)
  }
  // Check height
  const y = window.innerHeight
  //comments
  const [datas, setDatas] = useState([])
  const setEvent = useEventStore((state) => state.setEvent)

  const fetchDatas = async () => {
    try {
      const res = await axios.get(
        `${server}/lovehistory/comment/user/${user.id_user}`
      )
      // console.log(res);
      const reverseData = await res.data.comment_user.reverse()
      // console.log(reverseData);
      setDatas(reverseData)
      setEvent(res.data)
      // console.log(res);
      // const ipAddress = data.dia_chi_ip; // Lấy địa chỉ IP từ dữ liệu response
      // console.log(`Địa chỉ IP của bạn là: ${ipAddress}`);
    } catch (error) {
      console.log(error)
    }
  }

  // ---end commnets

  //   Upload from 8-> 12 images
  //

  const onHandleUploadImage = async () => {
    if (!userId) return window.location.href('/')

    const list_img = {}
    try {
      setIsLoading(true)
      for (const [i, file] of imageVerify.entries()) {
        const res = await uploadImage(file)
        list_img[`'${i + 1}'`] = res.success
      }
      const res = await axios.post(
        `${server}/saveimage/${userId}`,
        list_img
      )
      setIsLoading(false)
      resetImgShow()
      console.log(res)
      await toast.success('Upload and save data completed successfully')
      setShowModals(false)
      setShowModals22(false)
      setImgSucces(['https://i.ibb.co/qmpDk2W/Man-Big-Shoes-Avatar.png'])
      setImgError([
        'https://i.ibb.co/vBNPH32/Not-Face-Girl-Big-Shoes-Avatar.png',
      ])
      window.location.reload()
    } catch (error) {
      console.log(error)
    }
  }

  //

  const loadModels = () => {
    Promise.all([
      faceapi.nets.tinyFaceDetector.loadFromUri('/models'),
      faceapi.nets.faceLandmark68Net.loadFromUri('/models'),
      faceapi.nets.faceRecognitionNet.loadFromUri('/models'),
      faceapi.nets.faceExpressionNet.loadFromUri('/models'),
      faceapi.nets.ssdMobilenetv1.loadFromUri('./models'),
    ]).then(() => {
      // faceDetection();
    })
  }
  const resetImgShow = () => {
    setImgSucces([])
    setImgError([])
    setImageVerify([])
  }

  const onChangeImage = async (event) => {
    const files = event.target.files
    if (files.length < 8) {
      return setNotiImage({ status: true, value: 'Minimum 8 images' })
    }
    if (files.length > 12) {
      return setNotiImage({ status: true, value: 'Up to 12 images' })
    }
    resetImgShow()
    setIsLoading(true)
    const imgSuccess = []
    const imgError = []
    const imgVerify = []
    for (const file of files) {
      try {
        const res = await validImage(URL.createObjectURL(file))
        if (!res || res == null || res.length === 0) {
          imgError.push(URL.createObjectURL(file))
        } else {
          imgSuccess.push(URL.createObjectURL(file))
          imgVerify.push(file)
        }
      } catch (error) {
        console.log(error)
        alert('Lỗi xử lý hình ảnh')
      }
    }
    setImgError(imgError)
    setImgSucces(imgSuccess)
    setImageVerify(imgVerify)
    setIsLoading(false)
    return
  }
  const validateImgage = (res) => {
    if (!res || res == null || res.length > 1 || res.length === 0)
      return setNotiImage({
        status: true,
        value: 'Photos can only contain 1 face',
      })
    return true
  }

  const validImage = async (image) => {
    try {
      const imageElement = document.createElement('img')
      imageElement.src = image
      const netInput = imageElement
      // console.log(netInput); // object img with src = blob:....
      const detections = await faceapi
        .detectAllFaces(netInput, new faceapi.SsdMobilenetv1Options())
        .withFaceLandmarks()
        .withFaceExpressions()
      // console.log(detections);
      const detections2 = await faceapi
        .detectAllFaces(netInput, new faceapi.SsdMobilenetv1Options())
        .withFaceLandmarks()
        .withFaceExpressions()
      if (detections2.length === 0) return detections2
      return detections
    } catch (error) {
      console.log(error)
    }
  }

  const uploadImage = async (image) => {
    const formData = new FormData()
    formData.append('image', image)
    try {
      if (image) {
        const apiResponse = await axios.post(
          `https://api.imgbb.com/1/upload?key=${api_key}`,
          formData
        )
        return { success: apiResponse.data.data.url }
      }
      return false
    } catch (error) {
      console.log(error)
      return false
    }
  }

  const renderLoading = () => {
    if (isLoading) {
      return (
        <div className="fixed top-0 min-w-[100%] h-[100vh] z-[999]">
          <div className="absolute top-0 min-w-[100%] h-[100vh] bg-black opacity-70 z-10"></div>
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

  // --- End

  // UPLOAD AVT

  const handleImageChange = async (event) => {
    setIsLoading(true)
    if (!event.target.files[0]) {
      setSelectedImage(false)
      if (document.querySelector('#imgUploadedAvatar').querySelector('img')) {
        document.querySelector('#imgUploadedAvatar').querySelector('img').src =
          null
      }
      setIsLoading(false)
      return false
    }
    const res = await validImage(URL.createObjectURL(event.target.files[0]))
    if (validateImgage(res) == undefined) {
      setSelectedImage(false)
      return setIsLoading(false)
    }
    if (!res || res.length === 0) {
      setIsLoading(false)
      setSelectedImage(false)
      if (document.querySelector('#imgUploadedAvatar').querySelector('img')) {
        document.querySelector('#imgUploadedAvatar').querySelector('img').src =
          null
      }
      return setNotiImage({
        status: true,
        value: 'The picture is not in the correct format',
      })
    }
    if (res.length > 1) {
      setIsLoading(false)
      setSelectedImage(false)
      return setNotiImage({
        status: true,
        value: 'Photos can only contain 1 face',
      })
    }
    setSelectedImage(event.target.files[0])
    setIsLoading(false)
  }

  const handleUploadAvatar = async () => {
    if (!selectedImage) return
    setIsLoading(true)
    try {
      const imageUrl = await uploadImage(selectedImage)
      if (!imageUrl) return alert('Fail API upload image')
      let data = new FormData()
      data.append('link_img', imageUrl.success)
      data.append('check_img ', 'upload')
      const res = await axios.post(
        `${server}/changeavatar/${userId}`,
        JSON.stringify(data),
        {
          headers: {
            Authorization: `Bearer ${token}`, // Thêm token vào header
          },
        }
      )
      if (res.status !== 200) {
        setIsLoading(false)
        return alert('API errors')
      }
      setIsLoading(false)
      await toast.success('Upload and save avatar completed successfully')
      window.document.querySelector('.change_img_profile').src = res.link_img
      // window.location.reload();
      closeModals()
    } catch (error) {
      console.log(error)
      setIsLoading(false)
    }
  }

  // onHandlePickAvatar
  const handlePickAvatar = async (url) => {
    setIsLoading(true)
    try {
      let data = new FormData()
      data.append('link_img', url)
      data.append('check_img ', 'upload')
      const res = await axios.post(
        `${server}/changeavatar/${userId}`,
        JSON.stringify(data),
        {
          headers: {
            Authorization: `Bearer ${token}`, // Thêm token vào header
          },
        }
      )
      if (res.status !== 200) {
        setIsLoading(false)
        return alert('API errors')
      }
      setIsLoading(false)
      await toast.success('Upload and save avatar completed successfully')
      // window.location.reload();
      window.document.querySelector('.change_img_profile').src = res.link_img
      closeModals()
    } catch (error) {
      console.log(error)
      setIsLoading(false)
    }
  }

  // ---- END

  // --- EVENT
  const getAllEventUser = async (idUser) => {
    try {
      const { data } = await axios.get(`${server}/lovehistory/user/${idUser}`, {
        headers: {
          Authorization: `Bearer ${token}`, // Thêm token vào header
        },
      })
      console.log(data)
      setListEvent(data.list_sukien)
    } catch (error) {
      console.log(error)
    }
  }
  const nic = listEvent
  console.log(nic)
  // --- END

  useEffect(() => {
    getAllEventUser(userId)
    fetchDatas()
    fetchDataIMG()
    fetchData()
    loadModels()
  }, [])

  return (
    <div className="bg-[#323232] w-[100%] h-full">
      {notiImage.status ? (
        <>
          <div className="justify-center items-center flex overflow-x-hidden overflow-y-auto fixed inset-0 z-[1000] outline-none focus:outline-none">
            <div className="relative max-w-3xl mx-auto my-6 w-96">
              <div className="relative flex flex-col w-full bg-white border-0 rounded-lg shadow-lg outline-none focus:outline-none">
                <div className="relative flex-auto p-6">
                  <p className="my-4 text-3xl leading-relaxed text-slate-500 slab">
                    {notiImage.value}
                  </p>
                </div>
                <div className="flex items-center justify-end p-6 border-t border-solid rounded-b border-slate-200">
                  <button
                    className="text-[#FF2C61] slab hover:bg-[#ED709D] hover:text-white font-bold uppercase px-6 py-3 rounded-xl text-2xl outline-none focus:outline-none mr-1 mb-1 ease-linear transition-all duration-150"
                    type="button"
                    onClick={() => {
                      setNotiImage({ status: false, value: null })
                    }}
                  >
                    Close
                  </button>
                </div>
              </div>
            </div>
          </div>
          <div className="fixed inset-0 z-40 bg-black opacity-25"></div>
        </>
      ) : null}
      <div className="h-full">
        <div className="relative">
          <div
            style={{ backgroundImage: `url(${img2})` }}
            className=" lg:w-[100%] h-[300px] rounded-t-3xl bg-no-repeat bg-cover "
          ></div>
          <img
            src={
              data.link_avatar === '1'
                ? 'https://i.ibb.co/WHmrzPt/106287976-917734608745320-4594528301123064306-n.jpg'
                : data.link_avatar
            }
            className=" absolute bottom-10 left-20 lg:ml-1 ml-40 lg:w-[130px] lg:h-[130px] w-[160px] h-[160px] border border-white rounded-full object-cover"
            alt=""
          />
        </div>
        {setIsLoading ? renderLoading() : null}
        <div className="line border-[#C6C6C6]">
          <div className="flex mt-12 w-[100%]">
            <div className="flex-1 w-full text-center">
              <h1 className="lg:text-5xl lg:my-3 lg:max-w-[150px] text-white max-lg:my-2 max-lg:text-3xl pl-4">
                @{data.user_name}
              </h1>
            </div>
            <div className="flex">
              <button
                onClick={() => openModal()}
                className="max-lg:hidden bg-white shadow-gray-500 rounded-full py-4 px-9 text-[15px] my-8 mx-5"
              >
                <div className="flex items-center justify-center">
                  <span> Edit profile</span>
                </div>
              </button>
              <button
                className="py-2 pr-2 transition-all rounded-lg max-lg:hidden hover:bg-gray-300"
                onClick={() => setShowManagerAccount(true)}
              >
                <svg
                  width="32"
                  height="32"
                  viewBox="0 0 24 24"
                  fill="none"
                  xmlns="http://www.w3.org/2000/svg"
                >
                  <path
                    d="M20.1 9.21994C18.29 9.21994 17.55 7.93994 18.45 6.36994C18.97 5.45994 18.66 4.29994 17.75 3.77994L16.02 2.78994C15.23 2.31994 14.21 2.59994 13.74 3.38994L13.63 3.57994C12.73 5.14994 11.25 5.14994 10.34 3.57994L10.23 3.38994C9.78 2.59994 8.76 2.31994 7.97 2.78994L6.24 3.77994C5.33 4.29994 5.02 5.46994 5.54 6.37994C6.45 7.93994 5.71 9.21994 3.9 9.21994C2.86 9.21994 2 10.0699 2 11.1199V12.8799C2 13.9199 2.85 14.7799 3.9 14.7799C5.71 14.7799 6.45 16.0599 5.54 17.6299C5.02 18.5399 5.33 19.6999 6.24 20.2199L7.97 21.2099C8.76 21.6799 9.78 21.3999 10.25 20.6099L10.36 20.4199C11.26 18.8499 12.74 18.8499 13.65 20.4199L13.76 20.6099C14.23 21.3999 15.25 21.6799 16.04 21.2099L17.77 20.2199C18.68 19.6999 18.99 18.5299 18.47 17.6299C17.56 16.0599 18.3 14.7799 20.11 14.7799C21.15 14.7799 22.01 13.9299 22.01 12.8799V11.1199C22 10.0799 21.15 9.21994 20.1 9.21994ZM12 15.2499C10.21 15.2499 8.75 13.7899 8.75 11.9999C8.75 10.2099 10.21 8.74994 12 8.74994C13.79 8.74994 15.25 10.2099 15.25 11.9999C15.25 13.7899 13.79 15.2499 12 15.2499Z"
                    fill="white"
                  />
                </svg>
              </button>
              {showManagerAccount && (
                <ManagerAcount close={() => setShowManagerAccount(false)} />
              )}
              {showModal ? (
                <>
                  <div className="fixed inset-0 z-50 flex items-center justify-center overflow-x-hidden overflow-y-auto outline-none focus:outline-none">
                    <div className="relative lg:w-[1000px] h-[600px] mt-60 max-w-3xl">
                      <div className="border-0 w-[672px] h-[303px] rounded-lg shadow-lg relative bg-[#323232] outline-none focus:outline-none">
                        <div className="relative flex-auto p-6">
                          <div className="relative flex flex-auto ">
                            <p className="text-3xl leading-relaxed text-center text-white slab header_profile">
                              Profile
                            </p>
                            <div className="rounded-b btn_close">
                              <button
                                className="text-[#FF2C61] "
                                type="button"
                                onClick={() => closeModal()}
                              >
                                <svg
                                  width="32"
                                  height="32"
                                  viewBox="0 0 32 32"
                                  fill="none"
                                  xmlns="http://www.w3.org/2000/svg"
                                >
                                  <path
                                    d="M16.0003 2.6665C8.65366 2.6665 2.66699 8.65317 2.66699 15.9998C2.66699 23.3465 8.65366 29.3332 16.0003 29.3332C23.347 29.3332 29.3337 23.3465 29.3337 15.9998C29.3337 8.65317 23.347 2.6665 16.0003 2.6665ZM20.4803 19.0665C20.867 19.4532 20.867 20.0932 20.4803 20.4798C20.2803 20.6798 20.027 20.7732 19.7737 20.7732C19.5203 20.7732 19.267 20.6798 19.067 20.4798L16.0003 17.4132L12.9337 20.4798C12.7337 20.6798 12.4803 20.7732 12.227 20.7732C11.9737 20.7732 11.7203 20.6798 11.5203 20.4798C11.1337 20.0932 11.1337 19.4532 11.5203 19.0665L14.587 15.9998L11.5203 12.9332C11.1337 12.5465 11.1337 11.9065 11.5203 11.5198C11.907 11.1332 12.547 11.1332 12.9337 11.5198L16.0003 14.5865L19.067 11.5198C19.4537 11.1332 20.0937 11.1332 20.4803 11.5198C20.867 11.9065 20.867 12.5465 20.4803 12.9332L17.4137 15.9998L20.4803 19.0665Z"
                                    fill="white"
                                  />
                                </svg>
                              </button>
                            </div>
                          </div>
                          <div className="flex text-3xl text-black mt-14 ">
                            <div className="w-1/3 ">
                              <img
                                alt=""
                                src={
                                  data.link_avatar == '1'
                                    ? 'https://i.ibb.co/WHmrzPt/106287976-917734608745320-4594528301123064306-n.jpg'
                                    : data.link_avatar
                                }
                                className="lg:w-[130px] lg:h-[130px] w-{160px} h-{160px} mt-5 rounded-full object-cover m-auto change_img_profile"
                              ></img>
                            </div>
                            <div className="w-2/3 mt-10 ">
                              <div className="w-full input_name">
                                <input
                                  type="text"
                                  id="name"
                                  value={data.user_name}
                                  className="w-full rounded-xl "
                                  onChange={(e) => setUserName(e.target.value)}
                                />
                              </div>
                              <div className="flex ">
                                <button
                                  onClick={() => openModals()}
                                  className="w-1/2 mr-2 bg-white rounded-lg btn shadow-gray-500"
                                >
                                  Upload image
                                </button>
                                <button
                                  // onClick={() => openModals()}
                                  className="w-1/2 ml-2 text-white rounded-lg bg-lime-500 btn shadow-gray-500"
                                >
                                  Save
                                </button>
                              </div>
                              {showModals ? (
                                <>
                                  <div className="fixed inset-0 z-50 flex justify-center overflow-auto outline-none md:items-center focus:outline-none">
                                    <div className="">
                                      <div className="max-lg:ml-0 max-lg:w-full lg:-ml-16 ml-6 lg:w-[700px] w-[400px] border-0 rounded-lg shadow-lg relative flex flex-col bg-white outline-none focus:outline-none">
                                        <div className="relative p-6 flex-auto lg:h-[800px] h-[700px]">
                                          <p className="text-3xl leading-relaxed text-center text-black text-black-500 slab">
                                            Update Avatar
                                          </p>
                                          <div className="mt-10 text-3xl text-black">
                                            <div>
                                              <h1 className="py-3">
                                                Suggestion
                                              </h1>
                                            </div>
                                            <div className="grid lg:grid-cols-6 gap-x-8 gap-y-4 grid-cols-3 h-[120px] overflow-x-hidden">
                                              {imgdata.map((item, index) => (
                                                <div
                                                  key={index}
                                                  className="w-[100px] h-[100px] border-2 flex justify-center items-center"
                                                  onClick={() =>
                                                    handlePickAvatar(item)
                                                  }
                                                >
                                                  <img
                                                    src={item}
                                                    className="w-[90px] h-[90px] hover:scale-105 transition-all cursor-pointer"
                                                    type="file"
                                                    alt=""
                                                  />
                                                </div>
                                              ))}
                                            </div>
                                            <div className="min-w-full my-4 border-t bg-slate-700"></div>
                                          </div>
                                          <div className="md:mt-10 md:my-10">
                                            <div className="flex flex-col text-3xl text-black md:justify-between">
                                              <div>
                                                <h1 className="my-1">
                                                  Uploaded Avatar
                                                </h1>
                                              </div>

                                              <div className="max-sm:py-2">
                                                <input
                                                  type="file"
                                                  accept="image/*"
                                                  onChange={handleImageChange}
                                                />
                                              </div>
                                            </div>
                                            <div className="grid lg:grid-cols-6 gap-x-8 gap-y-4 grid-cols-3 overflow-x-hidden h-[120px]">
                                              <div
                                                className="w-[100px] h-[100px] border-2"
                                                id="imgUploadedAvatar"
                                              >
                                                {selectedImage && (
                                                  <img
                                                    src={URL.createObjectURL(
                                                      selectedImage
                                                    )}
                                                    className="w-[100px] h-[100px]"
                                                    alt="Selected"
                                                  />
                                                )}
                                              </div>
                                            </div>
                                            <div className="min-w-full my-4 border-t bg-slate-700"></div>
                                          </div>
                                          <div className="md:mt-10">
                                            <div className="flex justify-between text-3xl text-black">
                                              <div>
                                                <h1 className="py-3">
                                                  Your Gallery
                                                </h1>
                                              </div>
                                            </div>
                                            <div className="grid lg:grid-cols-6 gap-x-8 gap-y-4 grid-cols-3 overflow-x-hidden h-[120px]">
                                              {imgdata.map((item, index) => (
                                                <div
                                                  key={index}
                                                  className="w-[100px] h-[100px] border-2 flex justify-center items-center"
                                                  onClick={() =>
                                                    handlePickAvatar(item)
                                                  }
                                                >
                                                  <img
                                                    alt=""
                                                    src={item}
                                                    className="w-[90px] h-[90px] hover:scale-105 transition-all cursor-pointer"
                                                    type="file"
                                                  />
                                                </div>
                                              ))}
                                            </div>
                                          </div>
                                          <div className="mt-10">
                                            <h1 className="text-center">
                                              Access Your Gallery
                                            </h1>
                                            <div className="flex justify-between mt-10 text-3xl text-black">
                                              <button
                                                onClick={() =>
                                                  handleUploadAvatar()
                                                }
                                                className="hover:scale-105 hover:bg-gray-700 hover:transition-all lg:ml-80 ml-20 text-white bg-gray-500 shadow-white rounded-full w-[250px] h-[30px]"
                                              >
                                                Update Avatar
                                              </button>
                                            </div>
                                          </div>
                                          <div className="absolute top-0 right-0 pt-2 pr-2 cursor-pointer">
                                            <IoCloseCircle
                                              onClick={() => closeModals()}
                                              className="text-5xl"
                                            />
                                          </div>
                                        </div>
                                      </div>
                                    </div>
                                  </div>
                                  <div className="fixed inset-0 z-40 bg-black opacity-25"></div>
                                </>
                              ) : null}
                            </div>
                          </div>
                        </div>
                      </div>
                    </div>
                  </div>
                  <div className="fixed inset-0 z-40 bg-black opacity-25"></div>
                </>
              ) : null}
            </div>
          </div>
          <div className="md:py-5">
            <div className="flex justify-around lg:w-[300px] text-center pb-2 pl-4">
              <div className="flex text-3xl text-white mr-9">
                <h1 className="mr-3 ">{data.count_sukien}</h1>
                <p>Events</p>
              </div>
              <div className="flex text-3xl text-white mr-9">
                <h1 className="mr-3">{data.count_view}</h1>
                <p>View</p>
              </div>
              <div className="flex text-3xl text-white">
                <h1 className="mr-3">{data.count_comment}</h1>
                <p>Comments</p>
              </div>
            </div>
          </div>
        </div>
        <div className="flex pr-1">
          <div className="w-2/3 event">
            <button className=" text-white shadow-gray-500 rounded-full py-2 px-5 text-[24px] uppercase ">
              Events
            </button>
            {/* <button
              onClick={() => openModal()}
              className="md:hidden bg-white shadow-gray-500 rounded-full py-2 px-5 text-[14px]"
            >
              <div className="flex items-center justify-center">
                <svg
                  xmlns="http://www.w3.org/2000/svg"
                  width={16}
                  height={16}
                  viewBox="0 0 24 24"
                  style={{
                    fill: "rgba(0, 0, 0, 1)",
                    transform: "",
                    msfilter: "",
                  }}
                >
                  <path d="M11.587 6.999H7.702a2 2 0 0 0-1.88 1.316l-3.76 10.342c-.133.365-.042.774.232 1.049l.293.293 6.422-6.422c-.001-.026-.008-.052-.008-.078a1.5 1.5 0 1 1 1.5 1.5c-.026 0-.052-.007-.078-.008l-6.422 6.422.293.293a.997.997 0 0 0 1.049.232l10.342-3.761a2 2 0 0 0 1.316-1.88v-3.885L19 10.414 13.586 5l-1.999 1.999zm8.353 2.062-5-5 2.12-2.121 5 5z" />
                </svg>
                <span> Edit </span>
              </div>
            </button> */}
            {/* <button
              className="px-2 py-2 transition-all rounded-lg lg:hidden hover:bg-gray-100"
              onClick={() => setShowManagerAccount(true)}
            >
              <svg
                xmlns="http://www.w3.org/2000/svg"
                width={16}
                height={16}
                viewBox="0 0 24 24"
                style={{
                  fill: "rgba(0, 0, 0, 1)",
                  transform: "",
                  msfilter: "",
                }}
              >
                <path d="M12 10c-1.1 0-2 .9-2 2s.9 2 2 2 2-.9 2-2-.9-2-2-2zm6 0c-1.1 0-2 .9-2 2s.9 2 2 2 2-.9 2-2-.9-2-2-2zM6 10c-1.1 0-2 .9-2 2s.9 2 2 2 2-.9 2-2-.9-2-2-2z" />
              </svg>
            </button> */}
            <div>
              {nic.length > 0 ? (
                <EventListProfile
                  data={nic}
                  // closeTab={() => setShowEvent(false)}
                />
              ) : null}
            </div>
            {/* <div className="w-full py-5 text-left ">
              <h1 className="text-xl text-white lg:text-4xl">
                You don't have any event yet
              </h1>
            </div> */}
          </div>
          <div className="w-1/3 comment">
            <button className=" text-white shadow-gray-500 rounded-full py-2 px-5 text-[24px] uppercase ">
              Comments
            </button>
            {/* <button
              onClick={() => openModal()}
              className="md:hidden bg-white shadow-gray-500 rounded-full py-2 px-5 text-[14px]"
            >
              <div className="flex items-center justify-center">
                <svg
                  xmlns="http://www.w3.org/2000/svg"
                  width={16}
                  height={16}
                  viewBox="0 0 24 24"
                  style={{
                    fill: "rgba(0, 0, 0, 1)",
                    transform: "",
                    msfilter: "",
                  }}
                >
                  <path d="M11.587 6.999H7.702a2 2 0 0 0-1.88 1.316l-3.76 10.342c-.133.365-.042.774.232 1.049l.293.293 6.422-6.422c-.001-.026-.008-.052-.008-.078a1.5 1.5 0 1 1 1.5 1.5c-.026 0-.052-.007-.078-.008l-6.422 6.422.293.293a.997.997 0 0 0 1.049.232l10.342-3.761a2 2 0 0 0 1.316-1.88v-3.885L19 10.414 13.586 5l-1.999 1.999zm8.353 2.062-5-5 2.12-2.121 5 5z" />
                </svg>
                <span> Edit </span>
              </div>
            </button>
            <button
              className="px-2 py-2 transition-all rounded-lg lg:hidden hover:bg-gray-100"
              onClick={() => setShowManagerAccount(true)}
            >
              <svg
                xmlns="http://www.w3.org/2000/svg"
                width={16}
                height={16}
                viewBox="0 0 24 24"
                style={{
                  fill: "rgba(0, 0, 0, 1)",
                  transform: "",
                  msfilter: "",
                }}
              >
                <path d="M12 10c-1.1 0-2 .9-2 2s.9 2 2 2 2-.9 2-2-.9-2-2-2zm6 0c-1.1 0-2 .9-2 2s.9 2 2 2 2-.9 2-2-.9-2-2-2zM6 10c-1.1 0-2 .9-2 2s.9 2 2 2 2-.9 2-2-.9-2-2-2z" />
              </svg>
            </button> */}
            <div>
              <HistoryCommentList datas={datas} />
            </div>
            {/* {datas.length === 0 && (
              <div className="w-full py-5 text-left ">
                <h1 className="text-xl text-white lg:text-4xl">
                  You don't have any coment yet
                </h1>
              </div>
            )} */}
          </div>
        </div>
        {imgdata.length === 0 && (
          <div
            className={`bg-amber-400 w-screen h-[50px] text-1xl ${
              y > 420 ? 'sticky top-0' : 'relative top-[400px]'
            } sticky  mb-8 -mt-20`}
          >
            <div className="flex justify-center pt-6">
              <div className="mt-2">You haven't finished the procedure yet</div>
              <div className="mx-8">
                <button
                  onClick={() => setShowModals22(true)}
                  className=" bg-white shadow-gray-500 rounded-full w-[150px] h-[25px]"
                >
                  Complete your profile
                </button>
              </div>
            </div>
          </div>
        )}
        {showModals22 ? (
          <>
            <div className="fixed inset-0 z-50 flex items-center justify-center overflow-auto outline-none focus:outline-none">
              <div className="relative w-[1000px]  max-w-3xl">
                <div className="lg:-ml-16 ml-6 lg:w-[680px] lg:py-4 lg:px-8 w-[400px] border-0 rounded-lg shadow-lg relative flex flex-col bg-black outline-none focus:outline-none">
                  <div className="relative px-10 flex-auto  lg:h-[700px] h-[600px] text-white">
                    <h1 className=" text-center text-black-500 slab max-lg:pt-8 text-4xl md:text-[32px] leading-relaxed text-white">
                      Complete profile
                    </h1>
                    <p className="text-4xl leading-relaxed text-white text-black-500 slab max-lg:text-3xl">
                      Pick 8-12 photos of yourself
                    </p>
                    <div className="text-3xl text-white md:mt-10">
                      <div className="my-8">
                        <h1 className="flex text-4xl text-green-600 md:py-1">
                          <img
                            className="h-[30px]"
                            src="https://png.pngtree.com/png-vector/20221215/ourmid/pngtree-green-check-mark-png-image_6525691.png"
                            alt=""
                          />{' '}
                          Good photos
                        </h1>
                        <p className="w-[350px] max-lg:text-2xl">
                          close-up selfies, same subject, variety of background,
                          expressions and face angles
                        </p>
                      </div>

                      <div className="flex gap-3 overflow-x-scroll">
                        {imgSucess?.map((item, index) => (
                          <div
                            key={index}
                            className="relative lg:w-[90px] lg:h-[90px] w-[60px] h-[60px] rounded-lg overflow-hidden"
                          >
                            <img
                              src={item}
                              alt=""
                              className="lg:w-[90px] lg:h-[90px] w-[60px] h-[60px] object-cover"
                            />
                            <img
                              src="https://png.pngtree.com/png-vector/20221215/ourmid/pngtree-green-check-mark-png-image_6525691.png"
                              className="absolute h-[25px] bottom-0 right-3"
                              alt=""
                            />
                          </div>
                        ))}
                      </div>
                    </div>
                    <div className="text-3xl text-white md:mt-10">
                      <div className="my-8">
                        <h1 className="flex text-4xl text-red-600 md:py-1">
                          <img
                            className="h-[30px]"
                            src="https://i.ibb.co/bJ517B1/close-removebg-preview.png"
                            alt=""
                          />{' '}
                          Bad photos
                        </h1>
                        <p className="w-[350px] max-lg:text-2xl">
                          Group pics, face small or not visible, sunglass,
                          animal
                        </p>
                      </div>
                      <div className="flex gap-3 overflow-x-scroll">
                        {imgError?.map((item, index) => (
                          <div
                            key={index}
                            className="relative lg:w-[90px] lg:h-[90px] w-[60px] h-[60px] rounded-lg overflow-hidden"
                          >
                            <img
                              src={item}
                              alt=""
                              className="lg:w-[90px] lg:h-[90px] w-[60px] h-[60px] object-cover"
                            />
                            <img
                              src="https://i.ibb.co/bJ517B1/close-removebg-preview.png"
                              className="absolute h-[25px] bottom-0 right-3"
                              alt=""
                            />
                          </div>
                        ))}
                      </div>
                    </div>
                    <div className="mt-10">
                      <div className="text-3xl text-white">
                        <div>
                          <h1 className="lg:w-[550px] w-[300px] max-lg:text-2xl">
                            Your photos will be deleted permanetly from our
                            servers within 24h, and won’t be used for any other
                            purpose
                          </h1>
                        </div>
                      </div>
                    </div>

                    {imgSucess?.length >= 8 ? (
                      <div className="py-3 mt-10">
                        <div className="flex justify-between mt-10 text-3xl text-black">
                          <div className="flex items-center justify-center w-full text-gray-300 max-md:py-4 hover:text-gray-100">
                            <button
                              onClick={() => onHandleUploadImage()}
                              className="px-20 py-3 mb-2 text-sm text-black rounded-full dark:text-gray-400 bg-slate-200 hover:scale-110 hover:bg-slate-100"
                            >
                              <span className="text-4xl font-semibold">
                                Upload
                              </span>
                            </button>
                          </div>
                        </div>
                      </div>
                    ) : (
                      <div className="mt-10">
                        <div className="flex justify-between mt-10 text-3xl text-black">
                          <div className="flex items-center justify-center w-full text-gray-300 max-md:py-4 hover:text-gray-100">
                            <label
                              htmlFor="dropzone-file"
                              className="flex flex-col items-center justify-center w-full cursor-pointer"
                            >
                              <div className="flex flex-col items-center justify-center pt-5 pb-1">
                                <svg
                                  className="w-8 h-8 dark:text-gray-400"
                                  aria-hidden="true"
                                  xmlns="http://www.w3.org/2000/svg"
                                  fill="none"
                                  viewBox="0 0 20 16"
                                >
                                  <path
                                    stroke="currentColor"
                                    strokeLinecap="round"
                                    strokeLinejoin="round"
                                    strokeWidth="2"
                                    d="M13 13h3a3 3 0 0 0 0-6h-.025A5.56 5.56 0 0 0 16 6.5 5.5 5.5 0 0 0 5.207 5.021C5.137 5.017 5.071 5 5 5a4 4 0 0 0 0 8h2.167M10 15V6m0 0L8 8m2-2 2 2"
                                  />
                                </svg>
                                <p className="mb-2 text-sm dark:text-gray-400">
                                  <span className="text-4xl font-semibold">
                                    Select 8-12 Photos
                                  </span>
                                </p>
                                <p className="text-xs dark:text-gray-400">
                                  PNG, JPG
                                </p>
                              </div>
                              <input
                                id="dropzone-file"
                                type="file"
                                className="hidden"
                                multiple
                                accept="image/*"
                                onChange={(e) => onChangeImage(e)}
                              />
                            </label>
                          </div>
                        </div>
                      </div>
                    )}
                  </div>
                  <div className="relative lg:left-[540px] lg:-top-[700px] left-[340px] -top-[610px] w-[50px] flex items-center justify-end p-6 border-t border-solid border-slate-200 rounded-b">
                    <button
                      className="text-[#FF2C61] slab hover:bg-[#ED709D] hover:text-white font-bold uppercase px-6 py-3 rounded-xl text-2xl outline-none focus:outline-none mr-1 mb-1 ease-linear transition-all duration-150"
                      type="button"
                      onClick={() => setShowModals22(false)}
                    >
                      X
                    </button>
                  </div>
                </div>
              </div>
            </div>
            <div className="fixed inset-0 z-40 bg-black opacity-25"></div>
          </>
        ) : null}
      </div>
    </div>
  )
}
