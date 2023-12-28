import axios from 'axios'
import React, { useEffect, useRef, useState } from 'react'
import { useNavigate } from 'react-router-dom'
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

import Swal from 'sweetalert2'
import Header from '../../components/Header/Header'
import addCircle from '../../components/image/add-circle.png'

import '@tensorflow/tfjs'
import * as faceapi from 'face-api.js'

function CreateImage() {
 const serverGenarateSK = 'https://thinkdiff.us'

 const [image1, setImage1] = useState(null)
 const [image2, setImage2] = useState(null)

 const [isLoading, setIsLoading] = useState(false)
 const navigate = useNavigate()
 const [showImg, setShowImg] = useState({ img1: null, img2: null })

 const userInfo = JSON.parse(window.localStorage.getItem('user-info'))
 const token = userInfo && userInfo.token

 const [sameFace, setSameFace] = useState({
  img1: null,
  img2: null,
 })

 // todo ------------------------------------
 const img1Ref = useRef()
 const img2Ref = useRef()
 const inputTitleRef = useRef()
 const titleRef = useRef()

 const TITLE_DEFAULT = 'Image title'
 const [title, setTitle] = useState(TITLE_DEFAULT)

 const [isCreated, setIsCreated] = useState(false)
 const [timeCreate, setTimeCreate] = useState(null)
 const [imageSwap, setImageSwap] = useState('')

 const imgSucess = [g1, g2, g6, g3, g4, g5]
 const imageError = [
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
  setIsLoading(false)
  setSameFace({ img1: null, img2: null })
  img1Ref.current.value = ''
  img2Ref.current.value = ''
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

 const [srcnam, Setsrcnam] = useState('')
 const [srcnu, Setsrcnu] = useState('')

 const handleChangeImage = async (event, setImage, atImg) => {
  let file = event.target.files[0]
  if (!file) return
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
    return Swal.fire('Oops...', 'Photos must contain only one face!', 'warning')
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

    return Swal.fire('Oops...', 'Photos cannot be the same!', 'warning')
   }
   setIsLoading(false)

   if (atImg == 'img1') {
    let send = showImg
    send.img1 = URL.createObjectURL(file)
    setShowImg(send)
    setImage(file)
    const res1 = await uploadImageNam(file)
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
 const uploadImageNam = async (image) => {
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

 const handleChangeTitle = (e) => {
  setTitle(e.target.value || TITLE_DEFAULT)
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
    setShowImg({ img1: null, img2: null })
    setSameFace({ img1: null, img2: null })

    setTitle(TITLE_DEFAULT)
    inputTitleRef.current.value = ''
    img1Ref.current.value = ''
    img2Ref.current.value = ''
   }
  })
 }

 const handleSubmitFrom = (e) => {
  e.preventDefault()
  if (isCreated) return
  if (!showImg.img1 || !showImg.img2 || title === TITLE_DEFAULT)
   return Swal.fire('Oops...', 'Please enter complete information!!!', 'info')

  fetchData()
 }

 const fetchData = async () => {
  try {
   setIsLoading(true)

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
  } catch (error) {
   setIsLoading(false)
   console.error(error)
  }
 }

 const createEvent = async (srcnam, srcnu, browser, ip) => {
  try {
   const user = JSON.parse(window.localStorage.getItem('user-info'))
   if (!user) throw new Error('User info not found')

   const response = await axios.get(
    `${serverGenarateSK}/getdata/swap/2/image`,
    {
     params: {
      device_them_su_kien: browser,
      ip_them_su_kien: ip,
      id_user: user.id_user,
     },

     headers: {
      link1: srcnu,
      link2: srcnam,
      Authorization: `Bearer ${token}`,
     },
    }
   )
   setImageSwap(response.data.sukien_2_image.link_da_swap)
   setTimeCreate(response.data.sukien_2_image.thoigian_sukien)
   setIsCreated(true)

   console.log(response.data)
   return { success: response.data }
  } catch (error) {
   setIsLoading(false)
   // console.error(error.message);
   return { error: error.message }
  }
 }

 useEffect(() => {}, [image1], [image2])
 const renderLoading = () => {
  if (isLoading) {
   return (
    <div className='fixed left-0 top-0 min-w-[100%] h-[100vh] z-30'>
     <div className='absolute top-0 min-w-[100%] h-[100vh] bg-red-500 opacity-30 z-10'></div>
     <div
      style={{
       display: 'flex',
       justifyContent: 'right',
       alignItems: 'center',
      }}
      className='absolute z-20 opacity-100 -translate-x-2/4 -translate-y-2/4 left-2/4 top-2/4'
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

   <div className='createVideo'>
    {isLoading && renderLoading()}

    <div className='w-1/4 createVideo-upload'>
     <form onSubmit={handleSubmitFrom} action=''>
      <div className='createVideo-title'>
       <label htmlFor=''>Image title</label>
       <input
        type='text'
        placeholder='Image title'
        onChange={handleChangeTitle}
        ref={inputTitleRef}
       />
      </div>

      <div className='createVideo-upload-image'>
       <label htmlFor=''>Upload the replaced image</label>
       <div
        className='createVideo-wrap'
        style={{
         border: showImg?.img1 ? 'none' : '1px dashed #fff',
         backgroundColor: '#00000033',
         backgroundImage: `url(${showImg?.img1})`,
         backgroundSize: 'contain',
         backgroundRepeat: 'no-repeat',
         backgroundPosition: 'center',
        }}
       >
        {!showImg.img1 && (
         <img src={addCircle} alt='' className='createVideo-wrap__icon' />
        )}

        <input
         type='file'
         onChange={(e) => handleChangeImage(e, setImage1, 'img1')}
         accept='image/*'
         ref={img1Ref}
        />
       </div>
      </div>

      <div className='createVideo-upload-image'>
       <label htmlFor=''>Upload your alternative image</label>
       <div
        className='createVideo-wrap'
        style={{
         border: showImg?.img2 ? 'none' : '1px dashed #fff',
         backgroundColor: '#00000033',
         backgroundImage: `url(${showImg?.img2})`,
         backgroundSize: 'contain',
         backgroundRepeat: 'no-repeat',
         backgroundPosition: 'center',
        }}
       >
        {!showImg.img2 && (
         <img src={addCircle} alt='' className='createVideo-wrap__icon' />
        )}

        <input
         type='file'
         onChange={(e) => handleChangeImage(e, setImage2, 'img2')}
         accept='image/*'
         ref={img2Ref}
        />
       </div>
      </div>

      {!isCreated && (
       <button className='createVideo-btn' type='submit'>
        Create
       </button>
      )}

      {(showImg.img1 || showImg.img2 || title !== TITLE_DEFAULT) &&
      !isCreated ? (
       <button
        onClick={handleClear}
        className='createVideo-btn createVideo-clear'
        type='button'
       >
        Clear ALL
       </button>
      ) : null}

      {isCreated ? (
       <>
        <button type='button' className='createVideo-btn createVideo-download'>
         Download image
        </button>
        <button type='button' className='createVideo-btn createVideo-save'>
         Save to my collection
        </button>
       </>
      ) : null}
     </form>
    </div>

    <div className='w-3/4 createVideo-show'>
     <div className='createVideo-show-title'>
      <h3 ref={titleRef}>{title}</h3>
      {isCreated && <time>{timeCreate}</time>}
     </div>
     <div className='createVideo-content'>
      {!isCreated ? (
       showImg.img1 ? (
        <img src={showImg.img1} alt='image root' />
       ) : null
      ) : (
       <img src={imageSwap} alt='image swap' />
      )}
     </div>
    </div>
   </div>

   {showModals22 ? (
    <>
     <div className='fixed inset-0 z-50 flex items-center justify-center overflow-auto outline-none focus:outline-none'>
      <div className='relative w-[1000px]  max-w-3xl'>
       <div className='lg:-ml-16 ml-6 lg:w-[680px] lg:py-4 lg:px-8 w-[400px] border-0 rounded-lg shadow-lg relative flex flex-col bg-black outline-none focus:outline-none'>
        <div className='relative px-10 flex-auto  lg:h-[700px] h-[600px] text-white'>
         <h1 className='mt-40 text-center text-black-500 slab max-lg:pt-8 text-4xl md:text-[32px] leading-relaxed text-white'>
          Complete upload
         </h1>
         <div className='text-3xl text-white md:mt-10'>
          <div className='my-8'>
           <h1 className='flex text-4xl text-green-600 md:py-1'>
            <img
             className='h-[30px]'
             src='https://png.pngtree.com/png-vector/20221215/ourmid/pngtree-green-check-mark-png-image_6525691.png'
             alt=''
            />{' '}
            Good photos
           </h1>
           <p className='w-[350px] max-lg:text-2xl'>
            close-up selfies, same subject, variety of background, expressions
            and face angles
           </p>
          </div>

          <div className='flex gap-3 overflow-x-scroll'>
           {imgSucess?.map((item, index) => (
            <div
             key={index}
             className='relative lg:w-[90px] lg:h-[90px] w-[60px] h-[60px] rounded-lg overflow-hidden'
            >
             <img
              src={item}
              alt=''
              className='lg:w-[90px] lg:h-[90px] w-[60px] h-[60px] object-cover'
             />
             <img
              src='https://png.pngtree.com/png-vector/20221215/ourmid/pngtree-green-check-mark-png-image_6525691.png'
              className='absolute h-[25px] bottom-0 right-3'
              alt=''
             />
            </div>
           ))}
          </div>
         </div>
         <div className='text-3xl text-white md:mt-10'>
          <div className='my-8'>
           <h1 className='flex text-4xl text-red-600 md:py-1'>
            <img
             className='h-[30px]'
             src='https://i.ibb.co/bJ517B1/close-removebg-preview.png'
             alt=''
            />
            Bad photos
           </h1>
           <p className='w-[350px] max-lg:text-2xl'>
            Group pics, face small or not visible, sunglass, animal
           </p>
          </div>
          <div className='flex gap-3 overflow-x-scroll'>
           {imageError?.map((item, index) => (
            <div
             key={index}
             className='relative lg:w-[90px] lg:h-[90px] w-[60px] h-[60px] rounded-lg overflow-hidden'
            >
             <img
              src={item.url}
              alt=''
              className='lg:w-[90px] lg:h-[90px] w-[60px] h-[60px] object-cover'
             />
             <img
              src='https://i.ibb.co/bJ517B1/close-removebg-preview.png'
              className='absolute h-[25px] bottom-0 right-3'
              alt=''
             />
            </div>
           ))}
          </div>
         </div>
         <div className='mt-10'>
          <div className='text-3xl text-white'>
           <div>
            <h1 className='lg:w-[550px] w-[300px] max-lg:text-2xl'>
             Your photos will be deleted permanetly from our servers within 24h,
             and won’t be used for any other purpose
            </h1>
           </div>
          </div>
         </div>
        </div>
        <div className='mt-40 relative lg:left-[540px] lg:-top-[700px] left-[340px] -top-[610px] w-[50px] flex items-center justify-end p-6 border-t border-solid border-slate-200 rounded-b'>
         <button
          className='text-[#FF2C61] slab hover:bg-[#ED709D] hover:text-white font-bold uppercase px-6 py-3 rounded-xl text-2xl outline-none focus:outline-none mr-1 mb-1 ease-linear transition-all duration-150'
          type='button'
          onClick={() => setShowModals22(false)}
         >
          X
         </button>
        </div>
       </div>
      </div>
     </div>
     <div className='fixed inset-0 z-40 bg-black opacity-25'></div>
    </>
   ) : null}
  </>
 )
}

export default CreateImage
