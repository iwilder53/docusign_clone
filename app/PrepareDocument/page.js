'use client'

import React from 'react'
import { useIsClient } from '../isClientCtx';
import dynamic from 'next/dynamic';


const PrepareDocument = dynamic(() => import('@/components/PrepareDocument/PrepareDocument'), { ssr: false })
const PrepareDocumentPage = () => {

    const isClient = useIsClient();
    return (
        isClient && <PrepareDocument />
    )
}


export default PrepareDocumentPage