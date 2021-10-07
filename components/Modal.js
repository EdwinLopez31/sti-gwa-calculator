import { useEffect } from 'react'
import { Dialog } from '@headlessui/react'

const Modal = (props) => {
  return (
    <Dialog as="div" className='absolute inset-0 z-40 flex items-center justify-center' open={props.isOpen} onClose={() => props.setIsOpen(false)}>

        <Dialog.Overlay className='fixed inset-0 z-10 bg-gray-900 bg-opacity-80' />
          <div className='bg-[#f2f2f2] w-2/3 md:w-1/3 overflow-hidden rounded-md z-20 '>
            {props.children}
          </div>

    </Dialog>
  )
}

export default Modal
