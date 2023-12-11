import axios from 'axios'
import React, { useEffect, useState } from 'react'
import { NavLink } from 'react-router-dom'

import AddCircleIcon from '@mui/icons-material/AddCircle'
import headerbg from '../../../ver2/components/image/bg-header.png'
import Header from '../../components/Header/Header'
import './Events.css'

import configs from '../../../configs/configs.json'
import CommonEvent from '../app/CommonEvent'

const { SERVER_API_METATECH } = configs

function Events() {
  const [listEvent, setListEvent] = useState([])
  const user = JSON.parse(window.localStorage.getItem('user-info'))

  const getEventListUser = async (id) => {
    try {
      const { data } = await axios.get(
        `${SERVER_API_METATECH}/lovehistory/user/${id}`
      )
      setListEvent(data.list_sukien)
    } catch (error) {
      console.log(error)
    }
  }

  useEffect(() => {
    getEventListUser(user.id_user)
  }, [])

  return (
    <>
      <Header
        data={{
          background: `center/cover no-repeat url(${headerbg})`,
          title: 'events',
          download: true,
          events: true,
        }}
      />
      <div className=" min-h-screen overflow-hidden events">
        <div className="events-main">
          <div
            className={
              'lg:w-1/4 z-[10] transition-all transform duration-300 ease-out'
            }
            style={{
              overflowY: 'auto',
            }}
          >
            <ul className="events-menu">
              <li className="events-menu-item events-menu-add">
                <NavLink to={`/events/add`}>
                  <AddCircleIcon /> Add new event
                </NavLink>
              </li>

              {listEvent.length > 0
                ? listEvent.map((event, index) => (
                    <li
                      className="events-menu-item"
                      key={event.sukien[0].id_toan_bo_su_kien}
                    >
                      <NavLink
                        to={`/events/${event.sukien[0].id_toan_bo_su_kien}/1`}
                        className={(props) =>
                          index === 0 ? 'active' : ''
                        }
                      >
                        {event.sukien[0].ten_su_kien}
                      </NavLink>
                    </li>
                  ))
                : null}
            </ul>
          </div>
          <div className="lg:w-3/4 w-full min-h-screen">
            <aside className="events-content">
              {listEvent.length > 0 ? (
                <CommonEvent
                  key={listEvent[0].sukien[0].id_toan_bo_su_kien}
                  stt={listEvent[0].sukien[0].so_thu_tu_su_kien}
                  idDefault={listEvent[0].sukien[0].id_toan_bo_su_kien}
                />
              ) : null}
            </aside>
          </div>
        </div>
      </div>
    </>
  )
}

export default Events
