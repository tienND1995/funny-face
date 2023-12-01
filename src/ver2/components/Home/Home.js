import React, { useState, useEffect } from 'react'
import ReactLoading from 'react-loading'

import badPhoto from '../../components/image/badPhoto/vuesax/bold/close-circle.png'
import goodPhoto from '../../components/image/GoodPhoto/vuesax/bold/tick-circle.png'
import add from '../../components/image/add.png'
import female from '../../components/image/Female.png'
import male from '../../components/image/Male.png'

import g1 from '../../components/image/howto-1.jpeg'
import g2 from '../../components/image/howto-2.jpg'
import g3 from '../../components/image/howto-3.jpg'
import g4 from '../../components/image/howto-4.png'
import g5 from '../../components/image/howto-5.png'

import l1 from '../../components/image/loi-1.jpeg'
import l2 from '../../components/image/loi-2.jpeg'
import l3 from '../../components/image/loi-3.png'

import l5 from '../../components/image/loi-5.png'
import l6 from '../../components/image/loi-6.jpg'

import Modal from 'react-modal'
import Swal from 'sweetalert2'
import * as faceapi from 'face-api.js'
import './Home.css'
import CloseIcon from '@mui/icons-material/Close'

const NewHome = () => {
  const [imgSucess] = React.useState([g1, g2, g3, g4, g5])
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
      url: l6,
      description:
        'You must not grimace or cover your face with your hands, You must choose a photo with a clear face, only one face, no mask, no glasses, no backlight, no makeup',
    },

    {
      url: l5,
      description:
        'Photos with unclear faces, photos of people practicing yoga, or photos that are too far away with unclear faces are also not accepted, You must choose a photo with a clear face, only one face, no mask, no glasses, no backlight, no makeup',
    },
  ]

  const handleImageClick = (modal) => {
    setIsModal(true)
    setModalImage(modal)
  }

  const [isModal, setIsModal] = useState(false)
  const modalHide = () => setIsModal(false)
  const [modalImage, setModalImage] = useState({ url: '', description: '' })

  const [showImg, setShowImg] = useState({ img1: null })
  const [isLoading, setIsLoading] = useState(false)
  const [image1, setImage1] = useState(null)

  useEffect(() => {
    Promise.all([
      faceapi.nets.tinyFaceDetector.loadFromUri('/models'),
      faceapi.nets.faceLandmark68Net.loadFromUri('/models'),
      faceapi.nets.faceRecognitionNet.loadFromUri('/models'),
      faceapi.nets.faceExpressionNet.loadFromUri('/models'),
      faceapi.nets.ssdMobilenetv1.loadFromUri('./models'),
    ]).then(() => {})
  }, [])

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
        // const imagevid = await uploadImage(file)
        // setImageVid(imagevid)
      }
    } catch (error) {
      console.log(error)
      setIsLoading(false)
      closeUploadImg()
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
    <div className="home-container">
      {isLoading ? renderLoading() : ''}

      <div className="home-header">
        <div className="home-upload">
          <img className="home-upload__icon" src={add} alt="" />

          <div
            className="home-upload__img"
            style={
              showImg.img1 ? { backgroundImage: `url(${showImg.img1})` } : null
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

        <div className="home-button">
          <div>
            <img src={male} alt="" />
          </div>
          <div>
            <img src={female} alt="" />
          </div>
        </div>
      </div>

      <div className="home-main">
        <div className="home-main__item">
          <div className="home-main__status">
            <img src={goodPhoto} alt="good" />
            <h2 className="">Good Photo</h2>
          </div>

          <p className="home-main__p">
            Close-up selfies, same subject, variety of background, expressions
            and face angles
          </p>

          <div className="home-main__images">
            {imgSucess?.map((item, index) => (
              <div
                key={index}
                className="relative lg:w-[100px] lg:h-[100px] w-[60px] h-[60px] rounded-[8px] overflow-hidden"
              >
                <img src={item} alt="" className="w-full h-full object-cover" />
                <img
                  src="https://png.pngtree.com/png-vector/20221215/ourmid/pngtree-green-check-mark-png-image_6525691.png"
                  className="absolute h-[20px] bottom-2 right-2"
                  alt=""
                />
              </div>
            ))}
          </div>
        </div>
        <div className="home-main__item">
          <div className="home-main__status">
            <img src={badPhoto} alt="bad" />
            <h2 className="">Bad Photo</h2>
          </div>

          <p className="home-main__p">
            Group pics, face small or not visible, sunglass, animal
          </p>

          <div className="home-main__images">
            {images?.map((item, index) => (
              <div
                key={index}
                className="relative lg:w-[100px] lg:h-[100px] w-[60px] h-[60px] rounded-[8px] overflow-hidden"
                onClick={() => handleImageClick(item)}
              >
                <img
                  src={item.url}
                  alt=""
                  className="w-full h-full object-cover"
                />
                <img
                  src="https://i.ibb.co/bJ517B1/close-removebg-preview.png"
                  className="absolute h-[20px] bottom-2 right-2"
                  alt=""
                />
              </div>
            ))}
          </div>
        </div>
      </div>

      <Modal
        isOpen={isModal}
        onRequestClose={modalHide}
        contentLabel="Example Modal"
        style={{
          content: {
            width: '33%',
            height: 'max-content',
            margin: 'auto',
          },
        }}
      >
        <div style={{ display: 'flex', justifyContent: 'flex-end' }}>
          <button onClick={modalHide}>
            <CloseIcon />
          </button>
        </div>
        <div style={{ width: '70%', margin: '0 auto' }}>
          <img
            style={{ width: '100%', height: '300px', objectFit: 'cover' }}
            src={modalImage.url}
            alt=""
          />
        </div>
        <p
          style={{
            paddingTop: '20px',
            fontWeight: '600',
            fontSize: '14px',
            lineHeight: '1.3',
          }}
        >
          {modalImage.description}
        </p>
      </Modal>
    </div>
  )
}

export default NewHome
