import React, { useEffect, useRef, useState } from 'react'
import { Link } from 'react-router-dom'
import './VideoItem.css'

export const VideoItem = (props) => {
  const videoRef = useRef()
  const [height, setHeight] = useState('650px')
  const { type } = props

  useEffect(() => {
    const width = videoRef.current.offsetWidth
    setHeight(Math.trunc(width * 1.7))
  }, [videoRef.current])

  return (
    <li className="w-full md:w-1/2 lg:w-1/3 xl:w-1/4 component-video">
      <div className="component-video-wrap">
        <Link
          to={
            type === 'video swap'
              ? `/videos/detail-video/${props.id_video}`
              : `/videos/make-video?link=${props.link_video}&id=${props.id}`
          }
        >
          <video style={{ height }} controls ref={videoRef}>
            <source
              src={
                type === 'video swap' ? props.link_vid_swap : props.link_video
              }
              type="video/mp4"
            />
          </video>

          <div className="component-video-link">
            <h3>
              {type === 'video swap' ? props.ten_su_kien : props.noi_dung}
            </h3>
            {type === 'video swap' && (
              <p className="">{props.thoigian_taosk}</p>
            )}
          </div>
        </Link>
      </div>
    </li>
  )
}
