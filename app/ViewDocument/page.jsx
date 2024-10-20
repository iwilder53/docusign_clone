'use client'
import React from 'react'

import dynamic from 'next/dynamic'

//dynamic loading to prevent nextjs SSR 
const ViewDocument = dynamic(() => import('@/components/ViewDocument/ViewDocument'), { ssr: false })

const ViewDocumentPage = () => {
   


    return (
     <ViewDocument />
    )

}

export default ViewDocumentPage