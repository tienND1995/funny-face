import axios from 'axios'
import React, { useEffect } from 'react'
import { Route, Routes } from 'react-router-dom'
import 'slick-carousel/slick/slick-theme.css'
import 'slick-carousel/slick/slick.css'
import './App.scss'
import './container/tailwincss.css'
import YoutubeScandal from './ver2/YoutubeScandal'
import EventResults from './ver2/components/EventResults'
import NotFound from './ver2/components/NotFound'
import OnBoard from './ver2/components/OnBoard'
import Policy from './ver2/components/Policy'
import Profile from './ver2/components/Profile'
import ProfileGuest from './ver2/components/ProfileGuest'

import Home from './ver2/page/Home/Home'
import Love from './ver2/page/Love/Love'

import DetailVideo from './ver2/page/Videos/DetailVideo/DetailVideo'
import MakeVideo from './ver2/page/Videos/MakeVideo/MakeVideo'
import MyVideo from './ver2/page/Videos/MyVideo/MyVideo'
import Videos from './ver2/page/Videos/Videos'

import Events from './ver2/page/Events/Events'
import EventResult from './ver2/page/Events/EventResult/EventResult'

import './ver2/css/index.css'
import LayoutGuest from './ver2/layouts/LayoutGuest'
import LayoutUser from './ver2/layouts/LayoutUser'

// import Home from './ver2/page/Home'
import ChangePassword from './ver2/components/ChangePassword'
import CreateVideo from './ver2/page/CreateVideo/CreateVideo'
import CreateImage from './ver2/page/CreateImage/CreateImage'
import Download from './ver2/page/Download/Download'
import ForgotPassword from './ver2/page/Forgotpassword'
import Login from './ver2/page/Login'
import Register from './ver2/page/Register'
import TiktokScandal from './ver2/tiktok-scandal'
import EventAdd from './ver2/page/Events/EventAdd/EventAdd'

function App() {
  const user = window.localStorage.getItem('user-info')
  useEffect(() => {
    async function getIPAddress() {
      try {
        const response = await axios.get('https://api.ipify.org?format=json')
        localStorage.setItem('ip', response.data.ip)
      } catch (error) {
        console.error('Error getting IP address:', error)
        return null
      }
    }
    getIPAddress()
  }, [])

  if (!user)
    return (
      <Routes>
        <Route path="" element={<LayoutGuest />}>
          <Route index element={<OnBoard />} />
          <Route path="login" element={<Login />} />
          <Route path="register" element={<Register />} />
          <Route path="forgot" element={<ForgotPassword />} />
          <Route path="reset" element={<ChangePassword />} />
          <Route path="policy" element={<Policy />} />
        </Route>
        <Route path="youtube/:idVideo" element={<YoutubeScandal />} />
        <Route path="tiktok/:idVideo" element={<TiktokScandal />} />
        <Route path="*" exact={true} element={<NotFound />} />
      </Routes>
    )

  return (
    <Routes>
      <Route path="" element={<LayoutUser />}>
        <Route index element={<Home />} />

        <Route path="event/:id" element={<Home />} />

        <Route path="events">
          <Route index element={<Events />} />
          <Route path=":id/:stt" element={<EventResult />} />
          <Route path="add" element={<EventAdd />} />
        </Route>

        <Route path="love" element={<Love />} />
        <Route path="detail/:id/:stt" element={<Events />} />

        <Route path="viewEvent" element={<EventResults />} />

        <Route path="videos">
          <Route index element={<Videos />} />
          <Route path="make-video" element={<MakeVideo />} />
          <Route path="detail-video/:id" element={<DetailVideo />} />
          <Route path="my-video" element={<MyVideo />} />
        </Route>

        <Route path="create-video" element={<CreateVideo />} />
        <Route path="create-image" element={<CreateImage />} />

        <Route path="login" element={<Login />} />
        <Route path="profile" element={<Profile />} />
        <Route path="policy" element={<Policy />} />
        <Route path="user/:id" element={<ProfileGuest />} />

        <Route path="/download" element={<Download />} />
      </Route>

      <Route path="tiktok/:idVideo" element={<TiktokScandal />} />
      <Route path="youtube/:idVideo" element={<YoutubeScandal />} />
      <Route path="*" exact={true} element={<NotFound />} />
    </Routes>
  )
}

export default App
