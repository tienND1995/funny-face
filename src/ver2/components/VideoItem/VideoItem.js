import React from 'react'
import { Link } from 'react-router-dom'
import './VideoItem.css'

export const VideoItem = (props) => {
  const { type } = props
  return (
    <li className="w-full sm:w-1/2 md:w-1/3 lg:w-1/4 component-video">
      <div className="component-video-wrap">
        <video controls>
          <source
            src={type === 'video swap' ? props.link_vid_swap : props.link_video}
            type="video/mp4"
          />
        </video>

        <Link
          className="component-video-link"
          to={
            type === 'video swap'
              ? `/detailVideo/${props.id_video}`
              : `/make-video?link=${props.link_video}&id=${props.id}`
          }
        >
          <div className="">
            {type === 'video swap' ? props.ten_su_kien : props.noi_dung}
          </div>
          {type === 'video swap' && <p className="">{props.thoigian_taosk}</p>}
        </Link>
      </div>
    </li>
  )
}
