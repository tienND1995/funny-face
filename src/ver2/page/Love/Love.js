import axios from 'axios'
import React, { useEffect, useState } from 'react'
import { useNavigate } from 'react-router-dom'

import {
  default as girl,
  default as girlM,
} from '../../components/image/Component130.png'
import {
  default as boy,
  default as boyM,
} from '../../components/image/Component131.png'
import heart from '../../components/image/heart-double.png'
import imgBg from '../../components/image/love-bg.png'
import uilPlus from '../../components/image/uil_plus.png'

import boysmall from '../../components/image/boy-small.png'
import girlsmall from '../../components/image/girl-small.png'

import g1 from '../../components/image/howto-1.jpeg'
import g2 from '../../components/image/howto-2.jpg'
import g3 from '../../components/image/howto-3.jpg'
import g4 from '../../components/image/howto-4.png'
import g5 from '../../components/image/howto-5.png'
import g6 from '../../components/image/howto-6.png'
import l1 from '../../components/image/loi-1.jpeg'
import l2 from '../../components/image/loi-2.jpeg'
import l3 from '../../components/image/loi-3.png'
import l4 from '../../components/image/loi-4.png'
import l5 from '../../components/image/loi-5.png'
import l6 from '../../components/image/loi-6.jpg'

import ReactLoading from 'react-loading'
import { toast } from 'react-toastify'
import 'react-toastify/dist/ReactToastify.css'

import * as faceapi from 'face-api.js'
import RenderRandomWaitImage from '../../components/randomImages'
import '../../css/AddEvent.css'

import Swal from 'sweetalert2'
import add from '../../components/image/add.png'
import './Love.css'
import Header from '../../components/Header/Header'

function Love() {
  const Api_key = 'ba35005b6d728bd9197bfd95d64e4e39'
  const serverGenarateSK = 'https://thinkdiff.us'

  const [showModal, setShowModal] = React.useState(false)
  const [nam1, setBoy] = useState(boy)
  const [nu1, setNu] = useState(girl)
  const [nam2, setBoy2] = useState(boyM)
  const [nu2, setNu2] = useState(girlM)
  const [uil, setUil] = useState(uilPlus)
  const [bsHeart, setHeart] = useState(heart)
  const [image1, setImage1] = useState(null)
  const [image2, setImage2] = useState(null)
  const [isLoading, setIsLoading] = useState(false)
  const navigate = useNavigate()
  const [showImg, setShowImg] = useState({ img1: null, img2: null })
  const [randomImages, setRandomImages] = useState(null)
  const [isModelWarning, setIsModelWarning] = useState(false)

  const userInfo = JSON.parse(window.localStorage.getItem('user-info'))
  const token = userInfo && userInfo.token
  const [filled, setFilled] = useState(0)
  const [isRunning, setIsRunning] = useState(false)
  const [hi, setHi] = useState(false)

  useEffect(() => {
    if (filled < 100 && isRunning) {
      setTimeout(() => setFilled((prev) => (prev += 2)), 1900)
    }
  }, [filled, isRunning])

  const [sameFace, setSameFace] = useState({
    img1: null,
    img2: null,
  })

  const [imgSucess] = React.useState([g1, g2, g6, g3, g4, g5])
  const [imgError] = React.useState([l1, l2, l3, l4, l5, l6])

  const images = [
    {
      url: l1,
      description:
        'Glasses are not allowed, You must choose a photo with a clear face, only one face, no mask, no glasses, no backlight, no makeup',
    },
    {
      url: l2,
      description:
        'Do not turn your back on the lens, You must choose a photo with a clear face, only one face, no mask, no glasses, no backlight, no makeup',
    },
    {
      url: l3,
      description:
        'Do not turn your back on the lens, You must choose a photo with a clear face, only one face, no mask, no glasses, no backlight, no makeup',
    },
    {
      url: l4,
      description:
        'Photos with unclear faces, photos of people practicing yoga, or photos that are too far away with unclear faces are also not accepted, You must choose a photo with a clear face, only one face, no mask, no glasses, no backlight, no makeup',
    },
    {
      url: l5,
      description:
        'Photos with unclear faces, photos of people practicing yoga, or photos that are too far away with unclear faces are also not accepted, You must choose a photo with a clear face, only one face, no mask, no glasses, no backlight, no makeup',
    },
    {
      url: l6,
      description:
        'You must not grimace or cover your face with your hands, You must choose a photo with a clear face, only one face, no mask, no glasses, no backlight, no makeup',
    },
  ]

  const [showModals22, setShowModals22] = React.useState(true)
  const [isModalVisible, setIsModalVisible] = useState(false)
  const [selectedImage, setSelectedImage] = useState(null)

  const handleImageClick = (item) => {
    setSelectedImage(item)
    setIsModalVisible(true)
  }

  const handleCloseModal = () => {
    setIsModalVisible(false)
  }

  const [isModalVisible1, setModalVisible1] = useState(false)

  const handleOpenModal = async () => {
    try {
      await Images()
      setModalVisible1(true)
    } catch (error) {
      console.error(error)
    }
  }

  const handleCloseModalne = () => {
    setModalVisible1(false)
  }

  const [image, setImage] = useState('')
  const Images = async () => {
    try {
      const response = await axios.get(
        `https://metatechvn.store/images/${idUser}?type=video`
      )
      const message = 'Missing param!!!, your type is video'
      if (response.data === message) {
        toast.warning('Missing param!!!, your type is video')
      }
      setImage(response.data.image_links_video)
      console.log(response.data.image_links_video)
    } catch (error) {
      toast.warning(error)
    }
  }

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
    ]).then(() => {})
  }

  const closeUploadImg = async () => {
    setImage1(null)
    setImage2(null)
    setShowModal(false)
    setIsLoading(false)
    setShowImg({ img1: null, img2: null })
    setSameFace({
      img1: null,
      img2: null,
    })

    document.querySelector('#img1').value = ''
    document.querySelector('#img2').value = ''
    return
  }

  const validImage = async (image) => {
    try {
      const imageElement = document.createElement('img')
      imageElement.src = image
      const netInput = imageElement
      // console.log(netInput); // object img with src = blob:....
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

  const [srcnam, Setsrcnam] = useState('')
  const [srcnu, Setsrcnu] = useState('')
  const handleChangeImage = async (event, setImage, atImg) => {
    let file = event.target.files[0]
    if (!file) {
      return
    }
    setIsLoading(true)
    try {
      if (!URL.createObjectURL(file)) return setShowModal(true)
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

      atImg === 'img1'
        ? setSameFace({
            img1: res[0]?.detection?._score,
            img2: sameFace.img2,
          })
        : setSameFace({
            img1: sameFace.img1,
            img2: res[0]?.detection?._score,
          })
      if (
        sameFace.img1 === res[0]?.detection?._score ||
        sameFace.img2 === res[0]?.detection?._score
      ) {
        setIsLoading(false)
        closeUploadImg()

        return Swal.fire('Oops...', 'Photos cannot be the same', 'warning')
      }

      setIsLoading(false)
      // if (validateImgage(res) == undefined) return;

      if (atImg == 'img1') {
        let send = showImg
        send.img1 = URL.createObjectURL(file)
        setShowImg(send)
        setImage(file)
        const res1 = await uploadImage(file)
        if (!res1) {
          closeUploadImg()
        }

        Setsrcnam(res1)
      } else {
        let send = showImg
        send.img2 = URL.createObjectURL(file)
        setShowImg(send)
        setImage(file)
        const res2 = await uploadImageNu(file)

        if (!res2) {
          closeUploadImg()
        }
        Setsrcnu(res2)
      }
    } catch (error) {
      console.log(error)
      setShowModal(true)
      setIsLoading(false)
      closeUploadImg()
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

  const idUser = userInfo && userInfo.id_user

  const uploadImage = async (image) => {
    if (idUser === null) {
      toast.warning('Login is required')
      navigate('/login')
    }
    const formData = new FormData()
    formData.append('src_img', image)
    try {
      if (image) {
        const apiResponse = await axios.post(
          `https://metatechvn.store/upload-gensk/${idUser}?type=src_nam`,
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
      toast.error(error.response.data.message)
      return null
    }
  }

  const uploadImageNu = async (image) => {
    if (idUser === null) {
      toast.warning('Login is required')
      navigate('/login')
    }
    const formData = new FormData()
    formData.append('src_img', image)
    try {
      if (image) {
        const apiResponse = await axios.post(
          `https://metatechvn.store/upload-gensk/${idUser}?type=src_nu`,
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
      console.log(error)
      return null
    }
  }

  const [name, setName] = useState({ male: '', female: '' })

  const handleChangeName = (e) => {
    setName({ ...name, [`${e.target.name}`]: e.target.value })
  }

  const fetchData = async () => {
    const { male, female } = name
    try {
      if (image1 == null || image2 == null) {
        return Swal.fire('Oops..., Please choose the image!!')
      }

      if (male == '' || female == '') {
        return Swal.fire(
          'Oops..., Please enter a male name and a female name!!!'
        )
      }

      setIsLoading(true)
      setHi(true)
      setIsRunning(true)

      const device = await getMyDetailUser()

      const res3 = await createEvent(
        srcnam,
        srcnu,
        device.browser,
        device.ip,
        device.nameM,
        device.nameF
      )

      if (res3 && res3.error) {
        toast.error(res3.error)
        return
      }

      setIsLoading(false)
      toast.success('Upload and save data completed successfully')
      const eventId = res3.success.sukien[0].id_toan_bo_su_kien
      const folder = res3.success.sukien[0].folder
      navigate(`/events/${eventId}/1`)

      await createAnotherEvent(
        eventId,
        folder,
        device.browser,
        device.ip,
        device.nameM,
        device.nameF
      )
    } catch (error) {
      setRandomImages(null)
      setIsLoading(false)
      console.error(error)
    }
  }

  const createEvent = async (srcnam, srcnu, browser, ip, male, female) => {
    try {
      const user = JSON.parse(window.localStorage.getItem('user-info'))
      if (!user) throw new Error('User info not found')

      const response = await axios.get(`${serverGenarateSK}/getdata`, {
        params: {
          device_them_su_kien: browser,
          ip_them_su_kien: ip,
          id_user: user.id_user,
          ten_nam: male,
          ten_nu: female,
        },

        headers: {
          linknam: srcnam,
          linknu: srcnu,
          Authorization: `Bearer ${token}`,
        },
      })

      console.log(response.data)
      return { success: response.data }
    } catch (error) {
      setIsLoading(false)
      // console.error(error.message);
      return { error: error.message }
    }
  }

  const createAnotherEvent = async (
    idTB,
    folder,
    browser,
    ip,
    male,
    female
  ) => {
    const user = JSON.parse(window.localStorage.getItem('user-info'))
    if (!user) {
      return false
    }
    try {
      const response = await axios.get(`${serverGenarateSK}/getdata/skngam`, {
        params: {
          id_toan_bo_su_kien: idTB,
          device_them_su_kien: browser,
          ip_them_su_kien: ip,
          id_user: user.id_user,
          ten_nam: male,
          ten_nu: female,
        },
        headers: {
          linknam: srcnam,
          linknu: srcnu,
          folder,
          Authorization: `Bearer ${token}`,
        },
      })
      toast.success(
        'Created implicit event successfully. Please reload the page or the system will reload the page in 7 seconds!!'
      )
      setTimeout(() => {
        window.location.reload()
      }, 7000)
      return { success: response }
    } catch (error) {
      console.log(error)
      return error
    }
  }

  useEffect(() => {}, [image1], [image2])
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
            className="absolute -translate-x-2/4 opacity-100 -translate-y-2/4 left-2/4 top-2/4 z-20"
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
          title: 'create love',
        }}
      />
      <div
        style={{ backgroundImage: `url(${imgBg})`, minHeight: '100vh' }}
        className="bg-no-repeat bg-cover"
      >
        {/* <div className="flex justify-center max-lg:mt-11 mb-24">
        <Clock check={randomImages} />
      </div> */}

        {hi ? (
          <div className="flex justify-center items-center ">
            <div className="progressbar z-50 ">
              <div
                style={{
                  height: '100%',
                  width: `${filled}%`,
                  backgroundColor: '#a66cff',
                  transition: 'width 0.5s',
                }}
              ></div>
              <span className="progressPercent">{filled}%</span>
            </div>
          </div>
        ) : (
          ''
        )}

        {randomImages !== null && (
          <RenderRandomWaitImage images1={randomImages} />
        )}

        {isLoading ? renderLoading() : ''}

        <div className="love">
          <div className="love-content flex justify-between">
            <div className="love-item">
              <div className="love-small">
                <img src={boysmall} alt="" />
              </div>

              <div className="love-main">
                <div className="love-upload-image love-boy">
                  <img className="love-icon-add" src={add} alt="" />

                  <div
                    className="love-img"
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
                  />
                </div>

                <div className="love-name love-boy">
                  <input
                    name="male"
                    onChange={handleChangeName}
                    type="text"
                    placeholder="His name"
                  />
                </div>
              </div>
            </div>

            <div
              onClick={() => fetchData()}
              className="transition-transform duration-300 hover:scale-125"
            >
              <img src={bsHeart} alt="" className="cursor-pointer love-heart" />
            </div>

            <div className="love-item">
              <div className="love-small">
                <img src={girlsmall} alt="" />
              </div>

              <div className="love-main">
                <div className="love-upload-image love-girl">
                  <img className="love-icon-add" src={add} alt="" />

                  <div
                    className="love-img"
                    style={
                      showImg.img2
                        ? { backgroundImage: `url(${showImg.img2})` }
                        : null
                    }
                  ></div>

                  <input
                    onChange={(e) => {
                      handleChangeImage(e, setImage2, 'img2')
                    }}
                    type="file"
                    accept="image/*"
                    id="img2"
                  />
                </div>

                <div className="love-name love-girl">
                  <input
                    name="female"
                    onChange={handleChangeName}
                    type="text"
                    placeholder="Her name"
                  />
                </div>
              </div>
            </div>
          </div>

          <div className="love-start transition-transform duration-300 hover:scale-125 ">
            <button onClick={fetchData} className="text-4xl">
              Bắt đầu
            </button>
          </div>
        </div>

        {/* MOBILE */}

        <div className="flex justify-between mx-9 pb-32 hidden">
          <div>
            <div
              style={{
                backgroundImage: `url(${nam2})`,
                height: `120px`,
                width: `116px`,
              }}
              alt=""
              className="relative"
            >
              <div
                className="absolute top-[5%] right-[12.5%]  cursor-pointer w-[95px] h-[95.5px]  rounded-[50%] mt-4 bg-center bg-no-repeat bg-cover"
                style={
                  showImg.img1
                    ? { backgroundImage: `url(${showImg.img1})` }
                    : null
                }
              ></div>
              <input
                onChange={(e) => handleChangeImage(e, setImage1, 'img1')}
                id="img1"
                style={
                  image1
                    ? { backgroundImage: `url(${image1})` }
                    : { backgroundImage: `url(${uil})` }
                }
                type="file"
                accept="image/*"
                className={
                  image1
                    ? ' opacity-0 cursor-pointer w-[95px] h-[95.5px] rounded-[50%] absolute bg-center bg-no-repeat bg-cover'
                    : 'opacity-0 cursor-pointer w-[95px] h-[95.5px] rounded-[50%] absolute bg-center bg-no-repeat'
                }
              />
            </div>

            <div className="text-center lg:mt-16 my-3 text-2xl slab text-[#7A1E3E] font-semibold">
              {/* MALE */}
              {/* <div className="my-2 border mx-auto w-10/12 justify-center flex items-center rounded-md shadow-md">
              <div className="w-full max-w-[120px]">
                <input
                  type="search"
                  x-model="input1"
                  className="w-full h-[28px] px-4 py-4 rounded-r-md border border-gray-100 text-gray-800 focus:outline-none"
                  placeholder="Male"
                  onChange={(e) => setNameMale(e.target.value)}
                />
              </div>
            </div> */}
            </div>
          </div>

          {/*  */}
          <div
            onClick={() => fetchData()}
            className="flex justify-center items-center transition-transform duration-300 hover:scale-125 mx-auto"
          >
            <img
              src={bsHeart}
              alt=""
              className="cursor-pointer lg:w-32 lg:h-28 W-[70px] h-[90px] bg-center bg-no-repeat"
            />
          </div>
          {/*  */}

          <div>
            <div
              style={{
                backgroundImage: `url(${nu2})`,
                height: `120px`,
                width: `116px`,
              }}
              alt=""
              className="relative"
            >
              <div
                className="absolute top-[-9.5%] right-[2%]  cursor-pointer w-[95px] h-[95.5px]  rounded-[50%] mt-4 bg-center bg-no-repeat bg-cover"
                style={
                  showImg.img2
                    ? { backgroundImage: `url(${showImg.img2})` }
                    : null
                }
              ></div>
              <input
                onChange={(e) => handleChangeImage(e, setImage2, 'img2')}
                id="img2"
                style={
                  image2
                    ? { backgroundImage: `url(${image2})` }
                    : { backgroundImage: `url(${uil})` }
                }
                type="file"
                accept="image/*"
                className={
                  image2
                    ? ' opacity-0 cursor-pointer w-[95px] h-[95.5px] rounded-[50%] absolute bg-center bg-no-repeat bg-cover'
                    : 'opacity-0 cursor-pointer w-[95px] h-[95.5px] rounded-[50%] absolute bg-center bg-no-repeat'
                }
              />
            </div>
            <div className="text-center lg:mt-16 my-3  text-2xl slab text-[#7A1E3E] font-semibold">
              {/* FEMALE */}
              {/* <div className="my-2 border mx-auto w-10/12 justify-center flex items-center rounded-md shadow-md">
              <div className="w-full max-w-[120px]">
                <input
                  type="search"
                  x-model="input1"
                  className="w-full h-[28px] px-4 py-4 rounded-r-md border border-gray-100 text-gray-800 focus:outline-none"
                  placeholder="Female"
                  onChange={(e) => setNameFemale(e.target.value)}
                />
              </div>
            </div> */}
            </div>
          </div>
        </div>

        {isModelWarning ? (
          <>
            <div className="justify-center items-center flex overflow-x-hidden overflow-y-auto fixed inset-0 z-50 outline-none focus:outline-none">
              <div className="relative w-96 my-6 mx-auto max-w-3xl">
                <div className="border-0 rounded-lg shadow-lg relative flex flex-col w-full bg-white outline-none focus:outline-none">
                  <div className="relative p-6 flex-auto">
                    <p className="my-4 text-slate-500 slab text-3xl leading-relaxed">
                      Please select a photo to continue
                    </p>
                  </div>
                  <div className="flex items-center justify-end p-6 border-t border-solid border-slate-200 rounded-b">
                    <button
                      className="text-[#FF2C61] slab hover:bg-[#ED709D] hover:text-white font-bold uppercase px-6 py-3 rounded-xl text-2xl outline-none focus:outline-none mr-1 mb-1 ease-linear transition-all duration-150"
                      type="button"
                      onClick={() => {
                        setIsModelWarning(false)
                      }}
                    >
                      Continue
                    </button>
                  </div>
                </div>
              </div>
            </div>
            <div className="opacity-25 fixed inset-0 z-40 bg-black"></div>
          </>
        ) : null}

        <div className="relative" style={{ zIndex: 60 }}>
          {/* Nội dung khác của bạn */}
          {isModalVisible && (
            <div className="fixed top-1/2 left-1/2 transform -translate-x-1/2 -translate-y-1/2 z-50 bg-white p-8 rounded-md shadow-lg flex flex-col items-center">
              <button
                className="absolute top-2 right-2 text-gray-500 hover:text-gray-700"
                onClick={handleCloseModal}
              >
                {/* Bạn có thể thay thế 'X' bằng biểu tượng đóng hoặc bất kỳ văn bản nào bạn muốn */}
                X
              </button>
              <div className="flex-grow"></div>
              <img
                className="max-w-full h-auto lg:max-w-lg md:max-w-md sm:max-w-sm"
                src={selectedImage.url}
                alt=""
              />
              <div className="flex-grow"></div>
              <p className="text-center">{selectedImage.description}</p>
              {/* Thêm nút đóng hoặc bất kỳ phần tử nào khác nếu cần */}
            </div>
          )}
        </div>

        {showModal ? (
          <>
            <div className="justify-center items-center flex overflow-x-hidden overflow-y-auto fixed inset-0 z-50 outline-none focus:outline-none">
              <div className="relative w-96 my-6 mx-auto max-w-3xl">
                <div className="border-0 rounded-lg shadow-lg relative flex flex-col w-full bg-white outline-none focus:outline-none">
                  <div className="relative p-6 flex-auto">
                    <p className="my-4 text-slate-500 slab text-3xl leading-relaxed">
                      Can't recognize faces
                    </p>
                  </div>
                  <div className="flex items-center justify-end p-6 border-t border-solid border-slate-200 rounded-b">
                    <button
                      className="text-[#FF2C61] slab hover:bg-[#ED709D] hover:text-white font-bold uppercase px-6 py-3 rounded-xl text-2xl outline-none focus:outline-none mr-1 mb-1 ease-linear transition-all duration-150"
                      type="button"
                      onClick={() => {
                        closeUploadImg()
                      }}
                    >
                      Close
                    </button>
                  </div>
                </div>
              </div>
            </div>
            <div className="opacity-25 fixed inset-0 z-40 bg-black"></div>
          </>
        ) : null}
        {showModals22 ? (
          <>
            <div className="justify-center items-center flex overflow-auto fixed inset-0 z-50 outline-none focus:outline-none">
              <div className="relative w-[1000px]  max-w-3xl">
                <div className="lg:-ml-16 ml-6 lg:w-[680px] lg:py-4 lg:px-8 w-[400px] border-0 rounded-lg shadow-lg relative flex flex-col bg-black outline-none focus:outline-none">
                  <div className="relative px-10 flex-auto  lg:h-[700px] h-[600px] text-white">
                    <h1 className="mt-40 text-center text-black-500 slab max-lg:pt-8 text-4xl md:text-[32px] leading-relaxed text-white">
                      Complete upload
                    </h1>
                    <div className="md:mt-10 text-3xl text-white">
                      <div className="my-8">
                        <h1 className="text-4xl text-green-600 flex md:py-1">
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
                    <div className="md:mt-10 text-3xl text-white">
                      <div className="my-8">
                        <h1 className="text-4xl text-red-600 flex md:py-1">
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
                        {images?.map((item, index) => (
                          <div
                            key={index}
                            className="relative lg:w-[90px] lg:h-[90px] w-[60px] h-[60px] rounded-lg overflow-hidden"
                            onClick={() => handleImageClick(item)}
                          >
                            <img
                              src={item.url}
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
                  </div>
                  <div className="mt-40 relative lg:left-[540px] lg:-top-[700px] left-[340px] -top-[610px] w-[50px] flex items-center justify-end p-6 border-t border-solid border-slate-200 rounded-b">
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
            <div className="opacity-25 fixed inset-0 z-40 bg-black"></div>
          </>
        ) : null}

        {/* footer */}
      </div>
    </>
  )
}

export default Love
