'use client'
import React from 'react'

import dynamic from 'next/dynamic'
import { useIsClient } from '../isClientCtx';


const Profile = dynamic(() => import('@/components/Profile/Profile'), { ssr: false })

const ViewDocumentPage = () => {
    const isClient = useIsClient();


    return (
        <Profile />
    )

}

export default ViewDocumentPage