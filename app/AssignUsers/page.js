'use client'
import React from 'react'
import AssignUsers from '../../components/AssignUsers'
import { useIsClient } from '../isClientCtx';


const AssignUsersPage = () => {
    const isClient = useIsClient();
    return (
        isClient && <AssignUsers />
    )
}

export default AssignUsersPage