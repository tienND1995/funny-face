import React, { useEffect, useState } from 'react'

import axios from 'axios'
import { toast } from 'react-toastify'
import { NavLink } from 'react-router-dom'
import Loading from '../../../Loading/Loading'
import Swal from 'sweetalert2'

import { getMyDetailUser } from '../../../utils/getDataCommon'

import { useNavigate, useParams } from 'react-router-dom'
import './EventHistory.css'

import addsquare from '../../components/image/add-square.png'
import commentwhite from '../../components/image/comment-white.png'
import share from '../../components/image/share.png'
import addImage from '../../components/image/gallery-add.png'
import send from '../../components/image/send.png'

import ArrowBackIosNewIcon from '@mui/icons-material/ArrowBackIosNew'
import ArrowForwardIosIcon from '@mui/icons-material/ArrowForwardIos'

import Template1 from '../../page/app/template/Template1'
import Template2 from '../../page/app/template/Template2'
import Template3 from '../../page/app/template/Template3'
import Template4 from '../../page/app/template/Template4'

import configs from '../../../configs/configs.json'
const { SERVER_API_METATECH } = configs

function EventHistory() {
  const { id } = useParams()

  const [data, setData] = useState([])
  const [isLoading, setIsLoading] = useState(false)
  const [currentPage, setCurrentPage] = useState(1)
  const navigate = useNavigate()
  const [count, setCount] = useState(1)

  const [user, setUser] = useState([])
  const userInfo = JSON.parse(window.localStorage.getItem('user-info'))
  const idUser = userInfo?.id_user || 0
  const token = userInfo?.token

  useEffect(() => {
    idUser && getUserProfile()
  }, [])

  const getUserProfile = async () => {
    const response = await axios.get(
      `https://metatechvn.store/profile/${idUser}`
    )

    if (response.status) {
      setUser(response.data)
    }
  }

  const handlePageChange = (e) => {
    e.preventDefault()
    const page = Number.parseInt(e.target.innerText)

    // Kiểm tra giới hạn trang để đảm bảo rằng trang không vượt quá giới hạn
    const newPage = Math.min(Math.max(1, page), totalPages)

    setCount(newPage)
    navigate(`/event/${newPage}`)
  }

  const resultsPerPage = 3

  const fetchData = async () => {
    try {
      setIsLoading(true)
      const response = await fetch(
        `https://metatechvn.store/lovehistory/page/${
          id ? id : count
        }?id_user=${idUser}`
      )

      const jsonData = await response.json()
      const updatedData = jsonData.list_sukien.map((item) => {
        if (item.sukien.length === 0) {
          return { ...item, nodata: true }
        }

        return item
      })

      setData(updatedData)
      setIsLoading(false)
    } catch (error) {
      console.log(error)
    }
  }

  const changePageUp = () => {
    if (!id) {
      if (count < 200) {
        const newCount = count + 1
        setCount(newCount)
        navigate(`/events/${newCount}`)
      }
    } else {
      const numericId = parseInt(id, 10) // Chuyển đổi id thành số nguyên
      if (!isNaN(numericId) && numericId < 200) {
        const newId = numericId + 1
        setCount(newId)
        navigate(`/events/${newId}`)
      }
    }
  }

  const changePageDown = () => {
    if (!id) {
      if (count > 1) {
        const newCount = count - 1
        setCount(newCount)
        navigate(`/events/${newCount}`)
      }
    } else {
      const numericId = parseInt(id, 10)
      if (!isNaN(numericId) && numericId > 1) {
        const newId = numericId - 1
        setCount(newId)
        navigate(`/events/${newId}`)
      }
    }
  }

  useEffect(() => {
    fetchData()
  }, [count, id])

  const sortedData = data.sort((a, b) => {
    const dateA = new Date(a.real_time)
    const dateB = new Date(b.real_time)
    return dateB - dateA
  })

  const indexOfLastResult = currentPage * resultsPerPage
  const indexOfFirstResult = indexOfLastResult - resultsPerPage
  const currentResults = sortedData.slice(indexOfFirstResult, indexOfLastResult)
  const totalPages = Math.ceil(sortedData.length / resultsPerPage)

  const [paginates, setPaginates] = useState([1, 2, 3])

  const renderEventTemplate = (id, data) => {
    switch (id) {
      case 1:
        return <Template1 data={data} isRecent={true} />
      case 2:
        return <Template2 data={data} isRecent={true} />
      case 3:
        return <Template3 data={data} isRecent={true} />
      case 4:
        return <Template4 data={data} isRecent={true} />
      default:
        return <Template1 data={data} isRecent={true} />
    }
  }

  // handle comment

  const ipComment = localStorage.getItem('ip')
  const [location, setLocation] = useState([])

  useEffect(() => {
    fetch(`https://api.ip.sb/geoip/${ipComment}`)
      .then((resp) => resp.json())
      .then((data) => {
        setLocation(data)
      })
      .catch((err) => {
        console.log(err.message)
      })
  }, [ipComment])

  const [imgComment, setImgComment] = useState('')

  const handleChangeImgCmt = async (event) => {
    const formData = new FormData()
    formData.append('image', event.target.files[0])
    const apiResponse = await axios.post(
      `https://api.imgbb.com/1/upload?key=283182a99cb41ed4065016b64933524f`,
      formData
    )
    setImgComment(apiResponse.data.data.url)
  }

  const [inputValue, setInputValue] = useState('')

  const handleChangeValueCmt = (e) => {
    setInputValue(e.target.value)
  }


  const HandleSubmitFormCmt = async (idTbsk, sttTbsk, imgEvent) => {
    if (inputValue.trim() === '') {
      return Swal.fire('Oops...', `Comment cannot be empty!`, 'warning')
    }

    const device = await getMyDetailUser()
    let comment = {}
    let comment2 = {}

    comment = {
      device_cmt: device.browser,
      id_toan_bo_su_kien: idTbsk,
      ipComment: ipComment,
      so_thu_tu_su_kien: sttTbsk,
      imageattach: imgComment,
      id_user: idUser,
      location: location.city,
      noi_dung_cmt: inputValue,
    }

    comment2 = {
      id_toan_bo_su_kien: idTbsk,
      ipComment: ipComment,
      so_thu_tu_su_kien: sttTbsk,
      id_user: user?.id_user,
    }

    // const formData = new FormData()
    // formData.append('device_cmt', device.browser)
    // formData.append('id_toan_bo_su_kien', idTbsk)
    // formData.append('so_thu_tu_su_kien', sttTbsk)
    // formData.append('link_imagesk', imgEvent)
    // formData.append('id_user_comment', 87)
    // formData.append('ipComment', device.ip)
    // formData.append('imageattach', imgEvent)
    // formData.append('id_user', idUser)
    // formData.append('noi_dung_cmt', inputValue)
    // formData.append('location', location.city)

    const jsonData = JSON.stringify(comment2)
    websckt.send(jsonData)

    try {
      const response = await axios.post(
        `${SERVER_API_METATECH}/loverhistory/comment`,
        comment,
        {
          headers: {
            'Content-Type': 'multipart/form-data',
            Authorization: `Bearer ${token}`,
          },
        }
      )

      console.log(response)
    } catch (error) {
      console.log(error)
    }
  }

  const [websckt, setWebsckt] = useState('')


  useEffect(() => {
    const url = 'ws://localhost:3000/ws/' + 2
    const ws = new WebSocket(url)
    ws.onopen = () => {
      ws.send('Connect')
    }

    setWebsckt(ws)
    //clean up function when we close page
    return () => ws.close()
  }, [])

  return (
    <div className="events-history">
      {/* <Loading status={isLoading} /> */}

      <div className="events-history-main">
        {currentResults.map((array, index) => (
          <div className="event-history-item" key={index}>
            <div className="event-history-user">
              <div className="event-user__avatar">
                <img src={user.link_avatar} alt="avatar" />
              </div>
              <h4 className="event-user__name">{user.user_name}</h4>
            </div>

            <NavLink
              to={`/events/${
                array.sukien[array.sukien.length - 1].id_toan_bo_su_kien
              }/1`}
            >
              {renderEventTemplate(
                array.sukien[array.sukien.length - 1].id_template,
                array.sukien[array.sukien.length - 1]
              )}
            </NavLink>

            <div className="event-history-interact">
              <div>
                <img src={commentwhite} alt="" />
                <a href="#">Comment</a>
              </div>

              <div>
                <img src={addsquare} alt="" />
                <a href="#">follow</a>
              </div>

              <div>
                <img src={share} alt="" />
                <a href="#">share</a>
              </div>
            </div>

            <div className="event-history-comment">
              <div className="event-history__avatar">
                <img src={user.link_avatar} alt="avatar" />
              </div>

              <form
                className="event-history-form"
                onSubmit={(e) => {
                  e.preventDefault()
                  HandleSubmitFormCmt(
                    array.sukien[array.sukien.length - 1].id_toan_bo_su_kien,
                    array.sukien[array.sukien.length - 1].so_thu_tu_su_kien,
                    array.sukien[array.sukien.length - 1].link_da_swap
                  )
                }}
              >
                <input
                  type="text"
                  placeholder="Comment"
                  onChange={handleChangeValueCmt}
                />

                <div className="event-history-icon">
                  <div className="event-history-form__enter">
                    <img src={addImage} alt="image add" />

                    <input
                      type="file"
                      onChange={handleChangeImgCmt}
                      accept=".jpg"
                    />
                  </div>

                  <button type="submit">
                    <img src={send} alt="image send" />
                  </button>
                </div>
              </form>
              {/* {/* <div className="flex items-center gap-2 mt-2">
                <img
                  className="w-[80px] h-[70px]"
                  // src={imgComment}
                  alt="Uploaded"
                />
                <button
                  className="mt-[-50px]"
                  // onClick={removeImgComment}
                >
                  <i className="font-bold fas fa-times" />
                </button> */}
            </div>

            {currentResults.length - 1 !== index && <hr />}
          </div>
        ))}
      </div>

      <ul className="event-history-pagination">
        <li className="pagination-item arrow-link">
          <a
            className="pagination-link"
            href="#"
            onClick={() => changePageDown()}
          >
            <ArrowBackIosNewIcon />
          </a>
        </li>

        {paginates.map((number) => (
          <li
            className={`pagination-item ${number === count ? 'active' : ''}`}
            key={number}
          >
            <a className="pagination-link" href="#" onClick={handlePageChange}>
              {number}
            </a>
          </li>
        ))}

        <li
          className="pagination-item arrow-link"
          onClick={() => changePageUp()}
        >
          <a className="pagination-link" href="#">
            <ArrowForwardIosIcon />
          </a>
        </li>
      </ul>
    </div>
  )
}

export default EventHistory
