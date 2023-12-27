import axios from 'axios'
import React, { useEffect, useState } from 'react'
import { useParams } from 'react-router-dom'
import Template1 from './template/Template1'
import Template2 from './template/Template2'
import Template3 from './template/Template3'
import Template4 from './template/Template4'

const templateComponentList = [Template1, Template2, Template3, Template4]

function CommonEvent(props) {
  const [indexTemplate, setIndexTemplate] = useState(0)
  const TemplateComponent = templateComponentList[indexTemplate]

  const [data, setData] = useState({})
  const { id, stt } = useParams()

  const fetchData = async () => {
    try {
      const response = await axios.get(
        `https://metatechvn.store/lovehistory/${id || props?.idDefault}`
      )

      setData(response.data.sukien[stt - 1 || 0]) // Chỉnh index để lấy đúng sự kiện
      setIndexTemplate(response.data.sukien[stt - 1|| 0].id_template - 1)
    } catch (err) {
      console.log(err)
    }
  }

  useEffect(() => {
    fetchData()
  }, [stt])

  return (
    <div className="flex items-center justify-center h-full">
      <TemplateComponent data={data} />
    </div>
  )
}

export default CommonEvent
