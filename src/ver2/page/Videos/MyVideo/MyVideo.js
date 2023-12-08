import axios from 'axios'
import React, { useEffect, useState } from 'react'
import ReactLoading from 'react-loading'
import { Link } from 'react-router-dom'
import { toast } from 'react-toastify'
import 'react-toastify/dist/ReactToastify.css'
import '../../../css/AddEvent.css'
import RenderRandomWaitImage from '../../../components/randomImages'
import './MyVideo.css'

import { VideoItem } from '../../../components/VideoItem/VideoItem'
import Header from '../../../components/Header/Header'

function MyVideo() {
  const [isLoading, setIsLoading] = useState(false)
  const [randomImages, setRandomImages] = useState(null)
  const userInfo = JSON.parse(window.localStorage.getItem('user-info'))
  const token = userInfo && userInfo.token

  const totalPages = 100

  const handlePageChange = (page) => {
    // Kiểm tra giới hạn trang để đảm bảo rằng trang không vượt quá giới hạn
    const newPage = Math.min(Math.max(1, page), totalPages)
    setCount(newPage)
  }

  const idUser = userInfo && userInfo.id_user
  const [apiKeys, setApiKeys] = useState([])

  useEffect(() => {
    fetch(
      'https://raw.githubusercontent.com/sonnh7289/python3-download/main/key-ios.json?fbclid=IwAR0CQmAJ4L10gG-po0-LcEja-gNZoNaz01J9CLvGP4shGFnUhcmZvBw-3O0'
    )
      .then((response) => response.json())
      .then((data) => {
        const keys = data.map((item) => item.APIKey)
        setApiKeys(keys)
      })
      .catch((error) => console.error('Lỗi:', error))
  }, [])

  useEffect(() => {
    if (apiKeys.length > 0) {
      const apiKey = chooseAPIKey()
    }
  }, [apiKeys])

  function chooseAPIKey() {
    const randomIndex = Math.floor(Math.random() * apiKeys.length)
    return apiKeys[randomIndex]
  }

  //
  const [videos, setVideos] = useState([])
  const [count, setCount] = useState(1)

  const getVideos = async () => {
    const { data, status } = await axios.get(
      `https://metatechvn.store/lovehistory/video/${count}`,
      {
        headers: {
          Authorization: `Bearer ${token}`,
          'Content-Type': 'multipart/form-data',
        },
      }
    )
    const errorMessage = 'exceed the number of pages!!!'

    if (data === errorMessage) {
      toast.error(errorMessage)
    }

    if (status === 200) {
      setVideos(data.list_sukien_video)
    }
  }

  useEffect(() => {
    getVideos()
  }, [count, token])

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
          title: 'my collection',
          download: true,
        }}
      />

      <div className="my-video">
        {randomImages !== null && (
          <RenderRandomWaitImage images1={randomImages} />
        )}
        {isLoading ? renderLoading() : ''}

        <div className="my-video-container">
          {videos &&
            videos.map((video) => (
              <VideoItem
                {...video.sukien_video[0]}
                type="video swap"
                key={video.id_video}
              />
            ))}
        </div>

        <div className="overflow-x-auto d-none">
          <div className="pagination text-4xl flex justify-start items-center my-6">
            <button
              onClick={() => handlePageChange(count - 1)}
              disabled={count === 1}
              className="py-2 px-3 bg-[#ff9f9f] rounded hover:bg-[#ff9f9f8c]"
            >
              <svg
                fill="white"
                xmlns="http://www.w3.org/2000/svg"
                width="24"
                height="24"
              >
                <path d="M12 2a10 10 0 1 0 10 10A10.011 10.011 0 0 0 12 2zm0 18a8 8 0 1 1 8-8 8.009 8.009 0 0 1-8 8z" />
                <path d="M13.293 7.293 8.586 12l4.707 4.707 1.414-1.414L11.414 12l3.293-3.293-1.414-1.414z" />
              </svg>
            </button>

            {Array.from({ length: totalPages }, (_, index) => (
              <button
                key={index + 1}
                onClick={() => handlePageChange(index + 1)}
                className={`mx-1 text-white font-medium py-2 px-3 rounded ${
                  count === index + 1 ? 'bg-red-700' : 'bg-[#ff9f9f]'
                }`}
              >
                {index + 1}
              </button>
            ))}

            <button
              onClick={() => handlePageChange(count + 1)}
              disabled={count === totalPages}
              className="py-2 px-3 bg-[#ff9f9f] rounded hover:bg-[#ff9f9f8c]"
            >
              <svg
                fill="white"
                xmlns="http://www.w3.org/2000/svg"
                width="24"
                height="24"
              >
                <path d="M12 2a10 10 0 1 0 10 10A10.011 10.011 0 0 0 12 2zm0 18a8 8 0 1 1 8-8 8.009 8.009 0 0 1-8 8z" />
                <path d="M9.293 8.707 12.586 12l-3.293 3.293 1.414 1.414L15.414 12l-4.707-4.707-1.414 1.414z" />
              </svg>
            </button>
          </div>
        </div>
        {/* <div className="pagination text-4xl flex justify-center my-6" >
        <button onClick={() => setCount(count - 1)} disabled={count === 1}
          className="py-2 px-3 bg-[#ff9f9f] rounded hover:bg-[#ff9f9f8c]">
          <svg
            fill="white"
            xmlns="http://www.w3.org/2000/svg"
            width="24"
            height="24"
          >
            <path d="M12 2a10 10 0 1 0 10 10A10.011 10.011 0 0 0 12 2zm0 18a8 8 0 1 1 8-8 8.009 8.009 0 0 1-8 8z" />
            <path d="M13.293 7.293 8.586 12l4.707 4.707 1.414-1.414L11.414 12l3.293-3.293-1.414-1.414z" />
          </svg>
        </button>
        <button
          className="mx-3 text-white font-medium py-2 px-4 rounded bg-red-700"
        >
          {count}
        </button>
        <button onClick={() => setCount(count + 1)}
          className="py-2 px-3 bg-[#ff9f9f] rounded hover:bg-[#ff9f9f8c]">
          <svg
            fill="white"
            xmlns="http://www.w3.org/2000/svg"
            width="24"
            height="24"
          >
            <path d="M12 2a10 10 0 1 0 10 10A10.011 10.011 0 0 0 12 2zm0 18a8 8 0 1 1 8-8 8.009 8.009 0 0 1-8 8z" />
            <path d="M9.293 8.707 12.586 12l-3.293 3.293 1.414 1.414L15.414 12l-4.707-4.707-1.414 1.414z" />
          </svg>
        </button>
      </div> */}
      </div>
    </>
  )
}

export default MyVideo
