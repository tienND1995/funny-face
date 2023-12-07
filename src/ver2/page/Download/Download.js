import React from 'react'
import Header from '../../components/Header/Header'
import { Link } from 'react-router-dom'
import './Download.css'

function Download() {
  return (
    <>
      <Header
        data={{
          title: 'download',
          download: true,
        }}
      />

      <div className="downloadApp">
        <div className="downloadApp-image"></div>
        <div className="downloadApp-btn">
          <Link
            to={
              'https://play.google.com/store/apps/details?id=com.thinkdiffai.futurelove'
            }
          >
            <div className="downloadApp-icon">
              <img
                src="https://i.rada.vn/data/image/2022/08/02/Google-Play-Store-200.png"
                alt=""
              />
            </div>

            <div className="downloadApp-link">
              <h5 className="downloadApp-sub-title">Get it on</h5>
              <h3 className="downloadApp-title">google play</h3>
            </div>
          </Link>

          <Link
            to={
              'https://apps.apple.com/us/app/futurelove-ai-love-future/id6463770787'
            }
          >
            <div className="downloadApp-icon">
              <img
                src="https://upload.wikimedia.org/wikipedia/commons/6/67/App_Store_%28iOS%29.svg"
                alt=""
              />
            </div>

            <div className="downloadApp-link">
              <h5 className="downloadApp-sub-title">Get it on</h5>
              <h3 className="downloadApp-title">app store</h3>
            </div>
          </Link>
        </div>
      </div>
    </>
  )
}

export default Download
