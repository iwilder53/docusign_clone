'use client'
import React from 'react'
import { useIsClient } from '../isClientCtx';
import dynamic from 'next/dynamic';

const AssignUsers = dynamic(() => import('@/components/AssignUsers/AssignUsers'), { ssr: false })
const AssignUsersPage = () => {
    const isClient = useIsClient();
    return (
        isClient && <AssignUsers />
    )
}

export default AssignUsersPage