import React, { useEffect, useState } from 'react'
import axios from 'axios'

import './HomeHistory.css'
import EventHistory from '../../EventHistory/EventHistory'
import CommentsHistory from '../../CommentsHistory/CommentsHistory'

import addsquare from '../../../components/image/add-square.png'
import commentwhite from '../../../components/image/comment-white.png'
import comment from '../../../components/image/comment.png'
import firstdate from '../../../components/image/first-date.png'
import share from '../../../components/image/share.png'
import view from '../../../components/image/view.png'

function HomeHistory() {
 

  return (
    <div className="homehistory">
      <div className="homehistory-container">
        <div className="homehistory-episodes">
          <div className="episodes-head">
            <h3 className="homehistory-title">episodes for you</h3>
            <button>Show all</button>
          </div>

          <div className="episodes-main">
            <div className="episodes-item h-[400px] bg-white lg:w-1/4 md:w-1/3 sm:w-1/2"></div>

            <div className="episodes-item h-[400px] bg-white lg:w-1/4 md:w-1/3 sm:w-1/2"></div>

            <div className="episodes-item h-[400px] bg-white lg:w-1/4 md:w-1/3 sm:w-1/2"></div>

            <div className="episodes-item h-[400px] bg-white lg:w-1/4 md:w-1/3 sm:w-1/2"></div>
          </div>
        </div>

        <div className="homehistory-recent">
          <h3 className="homehistory-title">Recent Events</h3>

          <div className="homehistory-recent-main">
            <div className="homehistory-events lg:w-2/3 w-full">
              <EventHistory />
            </div>
            
            <div className="homehistory-comment lg:w-1/3 w-ful">
              <CommentsHistory />
            </div>

            
          </div>
        </div>
      </div>
    </div>
  )
}

export default HomeHistory
