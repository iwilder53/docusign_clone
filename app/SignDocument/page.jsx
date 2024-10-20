'use client'
import React from 'react'
import { useIsClient } from '../isClientCtx'
import dynamic from 'next/dynamic'

const SignDocument = dynamic(() => import('@/components/SignDocument/SignDocument'), { ssr: false })

const SignDocumentPage = () => {
    const isClient = useIsClient();


    return (
        <SignDocument />
    )


}

export default SignDocumentPage