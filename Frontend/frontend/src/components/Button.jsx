import React from 'react'
import { AiOutlineLoading } from "react-icons/ai";
const Button = ({loading,children,type="button",className,onClick}) => {
    return (
        <button
            type={type}
            onClick={onClick}
            className={`"  bg-green-700 p-2 rounded  not-italic
            text-white font-semibold flex items-center justify-center gap-2 transition duration-300 hover:scale-105 hover:bg-green-800" ${className}`}
        >
            {loading ? <AiOutlineLoading className='animate-spin  text-2xl' /> : children}
        </button>
    )
}

export default Button
