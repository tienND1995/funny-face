import axios from 'axios'
import { useEffect, useState } from 'react'
import { toast } from 'react-toastify'
import './Videos.css'

import MenuItem from '@mui/material/MenuItem'
import Select from '@mui/material/Select'
import filterApp from '../../components/image/filter-app.png'
import Header from '../../components/Header/Header'
import { VideoItem } from '../../components/VideoItem/VideoItem'

const Videos = () => {
  const [category, setCategory] = useState(0)
  const [listVideo, setListVideo] = useState([])
  const [count, setCount] = useState(1)
  const totalPages = 40

  const [categoryList, setCategoryList] = useState([])

  useEffect(() => {
    const categories = []
    Promise.all([
      axios.get(`https://metatechvn.store/lovehistory/listvideo/1?category=1`),
      axios.get(`https://metatechvn.store/lovehistory/listvideo/1?category=2`),
      axios.get(`https://metatechvn.store/lovehistory/listvideo/1?category=3`),
      axios.get(`https://metatechvn.store/lovehistory/listvideo/1?category=4`),
      axios.get(`https://metatechvn.store/lovehistory/listvideo/1?category=5`),
      axios.get(`https://metatechvn.store/lovehistory/listvideo/1?category=6`),
      axios.get(`https://metatechvn.store/lovehistory/listvideo/1?category=7`),
      axios.get(`https://metatechvn.store/lovehistory/listvideo/1?category=8`),
      axios.get(`https://metatechvn.store/lovehistory/listvideo/1?category=9`),
      axios.get(`https://metatechvn.store/lovehistory/listvideo/1?category=10`),
    ]).then((values) => {
      values.map(({ data }) => {
        const category = {
          value: data.list_sukien_video[0].id_categories,
          name: data.list_sukien_video[0].name_categories,
          id: data.list_sukien_video[0].id,
        }

        return categories.push(category)
      })
      setCategoryList(categories)
    })
  }, [])

  useEffect(() => {
    axios
      .get(
        `https://metatechvn.store/lovehistory/listvideo/${count}?category=${category}`
      )
      .then((response) => {
        const errorMessage = 'exceed the number of pages!!!'

        if (response.data === errorMessage) {
          // Nếu response.data trùng với chuỗi thông báo, hiển thị alert
          toast.error(errorMessage)
        } else {
          // Nếu không trùng, cập nhật state như bình thường
          setListVideo(response.data.list_sukien_video)
          console.log('list video', response.data)
        }
      })
      .catch((error) => {
        console.error(error)
      })
  }, [count, category])

  const handlePageChange = (page) => {
    // Kiểm tra giới hạn trang để đảm bảo rằng trang không vượt quá giới hạn
    const newPage = Math.min(Math.max(1, page), totalPages)
    setCount(newPage)
  }

  const handleChangeCategory = (e) => {
    setCategory(Number.parseInt(e.target.value))
  }

  return (
    <>
      <Header
        data={{
          title: 'videos',
          myCollection: true,
          download: true,
        }}
      />
      <div className="video-list">
        <div className="video-list-main">
          <div class="video-list-category">
            <div className="video-list-filterIcon">
              <img src={filterApp} alt="" />
            </div>

            <Select
              className="video-list-select"
              value={category}
              onChange={handleChangeCategory}
            >
              <MenuItem value={0}>Category</MenuItem>
              {categoryList.map(({ id, name, value }) => (
                <MenuItem key={id} value={value}>
                  {name}
                </MenuItem>
              ))}
            </Select>
          </div>

          <ul className="video-list-content">
            {listVideo &&
              listVideo.map((video) => (
                <VideoItem {...video} type="video goc" key={video.id} />
              ))}
          </ul>
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
      </div>
    </>
  )
}

export default Videos
