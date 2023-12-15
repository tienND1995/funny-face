import React from 'react'
import ReactLoading from 'react-loading'

const Loading = ({ status }) => {
  return status ? (
    <div className="fixed left-0 top-0 min-w-[100%] h-[100vh] z-[99]">
      <div className="absolute top-0 min-w-[100%] h-[100vh] bg-black opacity-70"></div>
      <div
        style={{
          display: 'flex',
          justifyContent: 'right',
          alignItems: 'center',
        }}
        className="absolute -translate-x-2/4 opacity-100 -translate-y-2/4 left-2/4 top-2/4 z-20"
      >
        <ReactLoading type={'bars'} color={'#C0C0C0'} />
      </div>
    </div>
  ) : null
}

export default Loading
