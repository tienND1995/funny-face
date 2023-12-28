import bgTemplate3 from '../../../components/image/bg-template3.png'
import comment from '../../../components/image/comment.png'
import frameTemplate3 from '../../../components/image/frame-template3.png'
import view from '../../../components/image/view.png'

import Moment from 'react-moment'

function TemplateCmt3(props) {
 // const { id } = useParams();
 const { data, onClick } = props

 return (
  <div className=' flex relative'>
   <div
    className='template template3 rounded-0'
    style={{ background: `center/cover no-repeat url(${bgTemplate3})` }}
   >
    <div className='template-main'>
     {data ? (
      <>
       <h3 className='template-title'>{data.ten_su_kien}</h3>

       <p className='template-text'>{data.noi_dung_su_kien}</p>
      </>
     ) : (
      ''
     )}

     <div className='template-icon'>
      <div className='template-icon__child'>
       <img src={comment} alt='comment' />
       <span>{data?.count_comment || 0}</span>
      </div>

      <div className='template-icon__child'>
       <img src={view} alt='view' />
       <span>{data?.count_view || 0}</span>
      </div>
     </div>

     <time>
      {data?.real_time || <Moment format='DD/MM/YYYY'>{new Date()}</Moment>}
     </time>
    </div>

    <div className='template-image cursor-pointer' onClick={onClick}>
     <img
      className='template-image__bg'
      src={frameTemplate3}
      alt='first date'
     />
     {data && (
      <img
       className='template-image__swap'
       src={data?.link_da_swap}
       alt='image swap'
      />
     )}
    </div>
   </div>
  </div>
 )
}

export default TemplateCmt3
