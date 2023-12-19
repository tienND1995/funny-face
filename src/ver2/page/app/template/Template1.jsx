import axios from 'axios'
import React, { useEffect, useState } from 'react'
import { useParams } from 'react-router'
import CmtPopup from '../CmtPopup'

import bgTemplate1 from '../../../components/image/bg-template1.png'
import frameTemplate1 from '../../../components/image/frame-template1.png'

import comment from '../../../components/image/comment.png'
import view from '../../../components/image/view.png'

import './Template1.css'

function Template1(props) {
  const params = useParams()
  const data = props?.data
  const stt = params?.stt
  const id = params?.id

  const [isOpenPopup, setIsOpenPopup] = useState(false)
  // const user = JSON.parse(window.localStorage.getItem('user-info'))
  // const token = user?.token

  // useEffect(() => {
  //   isOpenPopup && updateView()
  // }, [isOpenPopup])

  // const updateView = async () => {
  //   const formData = new FormData()
  //   formData.append('id_toan_bo_su_kien', id)
  //   formData.append('so_thu_tu_su_kien', stt)

  //   try {
  //     const res = await axios.post(`${SERVER_SAKAIVN}/countview`, formData, {
  //       headers: {
  //         Authorization: `Bearer ${token}`,
  //         'Content-Type': 'multipart/form-data',
  //       },
  //     })

  //     console.log('update view success!!')
  //   } catch (error) {
  //     console.log(error)
  //   }
  // }

  useEffect(() => {
    document.addEventListener('DOMContentLoaded', function () {
      const ogImageMeta = document.querySelector('meta[property="og:image"]')
      ogImageMeta.setAttribute('content', data?.link_da_swap)
    })
  }, [])

  return (
    <>
      <div
        className="template"
        style={{ background: `center/cover no-repeat url(${bgTemplate1})` }}
        onClick={() => {
          setIsOpenPopup(true)
        }}
      >
        <div className="template-main">
          {/* <input
          className="template-title template-input"
          placeholder="Title here"
          type="text"
        />

        <input
          className="template-input template-text"
          placeholder="Content here"
          type="text"
        />
         */}
          <h3 className="template-title" to={`/ array / ${data.id}`}>
            {data.ten_su_kien}
          </h3>

          <p className="template-text">{data.noi_dung_su_kien}</p>

          <div className="template-icon">
            <div className="template-icon__child">
              <img src={comment} alt="comment" />
              <span>{data.count_comment}</span>
            </div>

            <div className="template-icon__child">
              <img src={view} alt="view" />
              <span>{data.count_view}</span>
            </div>
          </div>

          <time> {data.real_time}</time>
        </div>

        <div className="template-image">
          <img
            className="template-image__bg"
            src={frameTemplate1}
            alt="first date"
          />
          <img
            className="template-image__swap"
            src={data.link_nu_goc}
            alt="image swap"
          />
        </div>
      </div>

      {isOpenPopup && (
        <CmtPopup
          setIsOpenPopup={setIsOpenPopup}
          data={data}
          stt={stt}
          TemplateCmt="TemplateCmt1"
        />
      )}
    </>
  )
}

export default Template1
