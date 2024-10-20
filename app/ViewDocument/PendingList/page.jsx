'use client'
import React from 'react'

import dynamic from 'next/dynamic'


const SignList = dynamic(() => import('@/components/Lists/SignList'), { ssr: false })

const PendingListPage = () => {
   


    return (
     <SignList />
    )

}

export default PendingListPage