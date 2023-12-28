import React, { useEffect, useState } from 'react'

import axios from 'axios'
import { NavLink } from 'react-router-dom'
import { toast } from 'react-toastify'
import Swal from 'sweetalert2'
import { v4 as uuid } from 'uuid'

import { useNavigate, useParams } from 'react-router-dom'
import { getMyDetailUser } from '../../../utils/getDataCommon'
import './EventHistory.css'

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
 const navigate = useNavigate()
 const [count, setCount] = useState(1)

 const [user, setUser] = useState([])
 const userInfo = JSON.parse(window.localStorage.getItem('user-info'))
 const idUser = userInfo?.id_user || 0
 const token = userInfo?.token

 // *  get event recent and total page
 const sortedData = data.sort((a, b) => {
  const dateA = new Date(a.real_time)
  const dateB = new Date(b.real_time)
  return dateB - dateA
 })

 const MAX_PAGE = 3
 const dataShow = sortedData.slice(0, MAX_PAGE)

 const totalPage = dataShow.reduce((sum, item) => {
  return sum + item.sukien.length
 }, 0)

 //  ______________________________

 const getUserProfile = async () => {
  try {
   const response = await axios.get(`${SERVER_API_METATECH}/profile/${idUser}`)
   setUser(response.data)
  } catch (error) {
   console.log(error)
  }
 }

 const fetchData = async () => {
  setIsLoading(true)
  try {
   const response = await axios.get(
    `${SERVER_API_METATECH}/lovehistory/page/${
     id ? id : count
    }?id_user=${idUser}`
   )

   console.log(response.data)

   setData(response.data.list_sukien)
   setIsLoading(false)
  } catch (error) {
   console.log(error)
   setIsLoading(false)
  }
 }

 useEffect(() => {
  fetchData()
 }, [count, id])

 useEffect(() => {
  idUser && getUserProfile()
  id && setCount(parseInt(id))
 }, [])

 const changePageUp = () => {
  if (id) {
   const idNumber = parseInt(id)
   if (idNumber < totalPage) {
    const newId = idNumber + 1
    setCount(newId)
    navigate(`/events/${newId}`)
   }

   return
  }

  if (count < totalPage) {
   setCount((prev) => prev + 1)
   navigate(`/events/${count + 1}`)
  }
 }

 const changePageDown = () => {
  if (id) {
   const idNumber = parseInt(id)
   if (idNumber > 1) {
    const newId = idNumber - 1
    setCount(newId)
    navigate(`/events/${newId}`)
   }

   return
  }

  if (count > 1) {
   setCount((prev) => prev - 1)
   navigate(`/events/${count - 1}`)
  }
 }

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

 const [inputValue, setInputValue] = useState('')
 const handleChangeValueCmt = (e) => {
  setInputValue(e.target.value)
 }

 const HandleSubmitFormCmt = async (idTbsk, sttTbsk, linkImgEvent) => {
  if (inputValue.trim() === '') {
   return Swal.fire('Oops...', `Comment cannot be empty!`, 'warning')
  }

  const device = await getMyDetailUser()

  const comment = {
   device_cmt: device.browser,
   ipComment: device.ip,
   id_toan_bo_su_kien: idTbsk,
   so_thu_tu_su_kien: sttTbsk,
   imageattach: '',
   id_user: user?.id_user,
   location: location.city,
   link_imagesk: linkImgEvent,
   noi_dung_cmt: inputValue,
  }

  try {
   const response = await axios.post(
    `${SERVER_API_METATECH}/lovehistory/comment`,
    comment,
    {
     headers: {
      'Content-Type': 'multipart/form-data',
      Authorization: `Bearer ${token}`,
     },
    }
   )

   console.log(response)
   setInputValue('')
   toast.success('Commented!!!')
  } catch (error) {
   console.log(error)
   toast.error('comment failed')
  }
 }

 return (
  <div className='events-history'>
   {/* <Loading status={isLoading} /> */}

   <div className='events-history-main'>
    {dataShow.map((array, index) => (
     <div className='event-history-item' key={uuid()}>
      <div className='event-history-user'>
       <div className='event-user__avatar'>
        <img src={user.link_avatar} alt='avatar' />
       </div>
       <h4 className='event-user__name'>{user.user_name}</h4>
      </div>

      <NavLink
       to={`/events/${
        array.sukien[array.sukien.length - 1].id_toan_bo_su_kien
       }/${array.sukien[array.sukien.length - 1].so_thu_tu_su_kien}`}
      >
       {renderEventTemplate(
        array.sukien[array.sukien.length - 1].id_template,
        array.sukien[array.sukien.length - 1]
       )}
      </NavLink>

      <div className='event-history-comment'>
       <div className='event-history__avatar'>
        <img src={user.link_avatar} alt='avatar' />
       </div>

       <form
        className='event-history-form'
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
         type='text'
         placeholder='Comment...'
         onChange={handleChangeValueCmt}
        />

        <button type='submit'>
         <img src={send} alt='image send' />
        </button>
       </form>
      </div>

      {dataShow.length - 1 !== index && <hr />}
     </div>
    ))}
   </div>

   <div className='event-history-pagination'>
    <button
     className={`event-history-pagination__btn ${count == 1 ? 'disabled' : ''}`}
     onClick={() => changePageDown()}
    >
     <ArrowBackIosNewIcon />
    </button>

    <span>{id ? id : count}</span>

    <button
     className={`event-history-pagination__btn ${
      count >= totalPage ? 'disabled' : ''
     }`}
     onClick={() => changePageUp()}
    >
     <ArrowForwardIosIcon />
    </button>
   </div>
  </div>
 )
}

export default EventHistory
