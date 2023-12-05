import React from 'react'

import CommentsHistory from '../../components/CommentsHistory/CommentsHistory'
import EventHistory from '../../components/EventHistory/EventHistory'
import './Home.css'

function Home() {
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

export default Home
