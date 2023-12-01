import React from 'react'

import './HomeHistory.css'

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
            {/* <div style={{width: '66%'}} className="homehistory-events">
              <EventHistory search={search_w} data={dataSearch} />
            </div>

            <div style={{width: '33%'}} className="homehistory-comments">
              <Comments />
            </div> */}

            <div className="homehistory-events lg:w-2/3 w-full">
              <div className="homehistory-events-item">
                <div className="event-user">
                  <div className="event-user__avatar">
                    <img src="" alt="avatar" />
                  </div>
                  <h4 className="event-user__name">dang tien</h4>
                </div>

                <div className="event-marry">
                  <div className="marry-info">
                    <h3>first date</h3>
                    <p>
                      Our first date was a mix of nervousness and excitement. We
                      shared stories, laughed, and felt a growing connection
                    </p>

                    <div className="marry-view">
                      <div>
                        <img src={comment} alt="" />
                        <span>15</span>
                      </div>
                      <div>
                        <img src={view} alt="" />
                        <span>2.3k</span>
                      </div>
                    </div>
                    <time className="marry-times">12/10/2023 </time>
                  </div>

                  <div className="marry-image">
                    <div>
                      <img src={firstdate} alt="" />
                    </div>
                  </div>
                </div>

                <div className="event-interact">
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
              </div>

              <div className="homehistory-events-item">
                <div className="event-user">
                  <div className="event-user__avatar">
                    <img src="" alt="avatar" />
                  </div>
                  <h4 className="event-user__name">dang tien</h4>
                </div>

                <div className="event-marry">
                  <div className="marry-info">
                    <h3>first date</h3>
                    <p>
                      Our first date was a mix of nervousness and excitement. We
                      shared stories, laughed, and felt a growing connection
                    </p>

                    <div className="marry-view">
                      <div>
                        <img src={comment} alt="" />
                        <span>15</span>
                      </div>
                      <div>
                        <img src={view} alt="" />
                        <span>2.3k</span>
                      </div>
                    </div>
                    <time className="marry-times">12/10/2023 </time>
                  </div>

                  <div className="marry-image">
                    <div>
                      <img src={firstdate} alt="" />
                    </div>
                  </div>
                </div>

                <div className="event-interact">
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
              </div>

              <div className="homehistory-events-item">
                <div className="event-user">
                  <div className="event-user__avatar">
                    <img src="" alt="avatar" />
                  </div>
                  <h4 className="event-user__name">dang tien</h4>
                </div>

                <div className="event-marry">
                  <div className="marry-info">
                    <h3>first date</h3>
                    <p>
                      Our first date was a mix of nervousness and excitement. We
                      shared stories, laughed, and felt a growing connection
                    </p>

                    <div className="marry-view">
                      <div>
                        <img src={comment} alt="" />
                        <span>15</span>
                      </div>
                      <div>
                        <img src={view} alt="" />
                        <span>2.3k</span>
                      </div>
                    </div>
                    <time className="marry-times">12/10/2023 </time>
                  </div>

                  <div className="marry-image">
                    <div>
                      <img src={firstdate} alt="" />
                    </div>
                  </div>
                </div>

                <div className="event-interact">
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
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  )
}

export default HomeHistory
