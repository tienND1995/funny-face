import axios from 'axios'
import React, { useEffect, useState } from 'react'
import { useParams } from 'react-router'
import CmtPopup from '../CmtPopup'
import nam1 from '../img/nam1.png'
import nu1 from '../img/nu1.png'
import img1 from '../img/vien.png'

import bgTemplate2 from '../../../components/image/bg-template2.png'
import frameTemplate2 from '../../../components/image/frame-template2.png'

import comment from '../../../components/image/comment.png'
import view from '../../../components/image/view.png'

function Template2(props) {
  const { id } = useParams()
  const data = props.data
  const stt = data.so_thu_tu_su_kien
  const [isOpenPopup, setIsOpenPopup] = useState(false)
  document.addEventListener('DOMContentLoaded', function () {
    const ogImageMeta = document.querySelector('meta[property="og:image"]')
    ogImageMeta.setAttribute(
      'content',
      'https://i.ibb.co/2jgmv3M/fdd83ed3cbe0.jpg'
    )
  })
  
  const handleTouchEnd = (e) => {
    e.preventDefault()
    setIsOpenPopup(true)
  }

  useEffect(() => {
    if (isOpenPopup) {
      const formData = new FormData()
      formData.append('id_toan_bo_su_kien', id)
      formData.append('so_thu_tu_su_kien', stt)

      axios
        .post('https://sakaivn.online/countview', formData)
        .then((response) => {
          console.log('API response:', response.data.count_view)
        })
        .catch((error) => {
          console.error('Lỗi khi gửi request API:', error)
        })
    }
  }, [isOpenPopup, id, stt])

  const {
    real_time,
    noi_dung_su_kien,
    link_nu_goc,
    count_view,
    count_comment,
    ten_su_kien,
    link_da_swap,
  } = data

  return (
    <div className="flex flex-col items-center overflow-hidden">
      <div className=" lg:w-[1019px] w-[400px] h-[500px] border-8 border-pink-300  lg:h-[600px] bg-white  rounded-[36px] flex flex-row overflow-hidden relative">
        <div
          style={{ backgroundImage: `url(${link_da_swap})` }}
          className="lg:w-full lg:h-[340px] w-full h-[400px] bg-top  bg-no-repeat bg-cover object-contain  z-20"
          onClick={handleTouchEnd}
        >
          <img
            src={img1}
            className="absolute lg:top-[180px] top-[150px] object-contain w-[600px] h-[400px] lg:w-full"
            alt="avatar"
          />
          <div className="absolute flex flex-col items-center justify-center w-full px-4 lg:bottom-28 lg:left-10 bottom-4 lg:justify-evenly lg:flex-row">
            <div className="flex flex-col items-center justify-center lg:gap-y-3">
              <p className="mb-2 text-3xl font-bold lg:text-5xl">
                {ten_su_kien}
              </p>
              <div className="flex items-center text-2xl lg:text-3xl gap-x-7">
                <div className="flex items-center font-bold gap-x-2">
                  <img src={comment} className="w-7" alt="view" />
                  <span>{count_comment}</span>
                </div>
                <div className="flex items-center font-bold gap-x-2">
                  <img src={view} className="w-7" alt="view" />
                  <span>{count_view}</span>
                </div>
              </div>
              <span className="text-2xl font-bold lg:text-3xl">
                {data.real_time}
              </span>
            </div>
            <p className="max-w-[400px] text-center text-2xl lg:text-3xl font-[Montserrat]">
              {noi_dung_su_kien}
            </p>
          </div>
        </div>
        {isOpenPopup && (
          <div className="z-20">
            <CmtPopup
              setIsOpenPopup={setIsOpenPopup}
              data={data}
              TemplateCmt="TemplateCmt2"
              stt={props.stt}
            />
          </div>
        )}
      </div>
    </div>
  )
}

export default Template2
