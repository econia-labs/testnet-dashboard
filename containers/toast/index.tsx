import React from 'react'
import { ToastContainer as Container } from 'react-toastify'
const CloseToastButton = () => {
    const closeToast = () => {}
    return (
        <button onClick={closeToast} className="Toastify__close-button Toastify__close-button--dark " type="button" aria-label="close">
            <svg width="18" height="18" viewBox="0 0 18 18" fill="none" xmlns="http://www.w3.org/2000/svg">
                <g id="Add">
                    <path id="Vector" d="M5.22656 4.31433L13.7163 12.8041" stroke="white" strokeLinecap="square" />
                    <path id="Vector_2" d="M5.22656 12.8041L13.7163 4.31433" stroke="white" strokeLinecap="square" />
                </g>
            </svg>

        </button>
    )
};

const ToastContainer = () => {
    return (
        <Container
            position="bottom-right"
            autoClose={2000}
            hideProgressBar={false}
            newestOnTop={false}
            closeOnClick
            rtl={false}
            pauseOnFocusLoss
            draggable
            pauseOnHover
            theme="dark"
            toastClassName="border border-600  !font-mono"
            closeButton={
                <CloseToastButton />
            }
        />
    )
}

export default ToastContainer