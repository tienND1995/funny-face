import React from 'react'

import comment from '../../../components/image/comment.png'
import firstdate from '../../../components/image/first-date.png'
import view from '../../../components/image/view.png'

const TemplateDefault = () => {
  return (
    <div className="event-history-marry">
      <div className="event-marry__info">
        <h3>Title here</h3>
        <p>Nội dung</p>

        <div className="event-marry__view">
          <div>
            <img src={comment} alt="" />
            <span>0</span>
          </div>
          <div>
            <img src={view} alt="" />
            <span>0</span>
          </div>
        </div>
        <time className="event-marry__times">12/12/2023</time>
      </div>

      <div className="event-marry__image">
        <img className="image1" src={firstdate} alt="" />
        {/* <img className="image2" src="" alt="" /> */}
      </div>
    </div>
  )
}

export default TemplateDefault
