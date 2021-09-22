import React from 'react'
import FocusLock from 'react-focus-lock';

const Modal = (props) => {
  return (
    <FocusLock>
      {props.children}
    </FocusLock>
  )
}

export default Modal
