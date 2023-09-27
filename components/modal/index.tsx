import XIcon from '@/icons/XIcon'
import React, { ReactNode, useRef } from 'react'
import { useOnClickOutside } from 'usehooks-ts'

export interface IModal {
    open: boolean
    onClose: () => void
    children?: ReactNode
    className?: string

}

const Modal = (props: IModal) => {
    const { open, onClose, children, className } = props
    const contentRef = useRef<HTMLDivElement>(null)
    const wrapperRef = useRef<HTMLDivElement>(null)

    const handleClose = () => {
        wrapperRef.current?.classList.add('animate-fadeOut')
        setTimeout(() => {
            onClose()
        }, 200)
    }

    useOnClickOutside(contentRef, () => {
        handleClose()
    })

    if (!open) {
        return null
    }

    return (
        <div ref={wrapperRef} className='modal-wrapper animate-fadeIn h-[100vh] w-[100vw] fixed left-0 top-0 bg-bg1 backdrop-blur-[10px] flex justify-center items-center z-50' >
            <div
                ref={contentRef}
                className={`modal-content-wrapper bg-800 shadow-4 lg:w-1/4 bg-center bg-cover bg-no-repeat bg-[url('/background-noise.png')] ${className} relative max-w-[calc(100%-32px)]`}>
                <button
                    onClick={handleClose}
                    className='border border-600 absolute right-0 top-0 p-3 hover:border-blue hover:bg-blue transition-colors [&:hover~div]:!border-blue z-50'>
                    <XIcon />
                </button>
                <div className={`modal-content relative border border-600 w-full min-h-[60px] group-hover:border-blue`}>
                    {children}
                </div>
            </div>
        </div>
    )
}

export default Modal