'use client'
import React from 'react'

import dynamic from 'next/dynamic'


const ViewDocument = dynamic(() => import('@/components/ViewDocument/ViewDocument'), { ssr: false })

const ViewDocumentPage = () => {
   


    return (
     <ViewDocument />
    )

}

export default ViewDocumentPage