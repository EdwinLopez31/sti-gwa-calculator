import React from 'react'
import FocusLock from 'react-focus-lock'

const Modal = (props) => {
  return (
    <FocusLock>
      <div className="bg-[#f2f2f2] w-1/3 overflow-hidden rounded-md z-20 absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2">
        {props.children}
      </div>

      <div className="absolute inset-0 z-10 bg-gray-900 bg-opacity-80" />
    </FocusLock>
  )
}

export default Modal
