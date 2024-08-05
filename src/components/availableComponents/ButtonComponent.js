'use client'

import React from 'react'
import { useRouter } from 'next/navigation'

const ButtonComponent = ({ data }) => {
    const buttondata = data.data
    const remove = data.hidden
    
    const router = useRouter()

    return remove ? false : (
        <button
            className={`bg-blue-500 hover:bg-blue-700 text-white py-2 px-4 rounded-lg ${buttondata.class}`}
            onClick={() => router.push(buttondata.url)}
        >
            {buttondata.caption}
        </button>
    )
}

export default ButtonComponent