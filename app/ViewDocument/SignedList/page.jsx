'use client'
import React from 'react'

import dynamic from 'next/dynamic'
import ProfilePage from '@/components/Profile/Profile'


const SignedList = dynamic(() => import('@/components/Lists/SignedList'), { ssr: false })

const SignedListPage = () => {
   


    return (
     <div>
            <ProfilePage/>


         <SignedList />
     </div>
    )

}

export default SignedListPage