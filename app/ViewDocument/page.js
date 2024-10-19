'use client'
import React from 'react'

import dynamic from 'next/dynamic'
import { useIsClient } from '../isClientCtx';


const ViewDocument = dynamic(() => import('@/components/ViewDocument/ViewDocument'), { ssr: false })

const ViewDocumentPage = () => {
    const isClient = useIsClient();


    return (
        <div>   <ViewDocument /></div>
    )

}

export default ViewDocumentPage