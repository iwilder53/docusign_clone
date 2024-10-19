'use client';
import React from 'react';
import {
  Text,
 
  Row,
  Heading,

  Column,
} from 'gestalt';
import 'gestalt/dist/gestalt.css';

import {Box,Button,Avatar } from '@mui/material'
import { auth } from '../../app/firebase/firebase';
import { useSelector, useDispatch } from 'react-redux';
import { selectUser, setUser } from '../../app/firebase/firebaseSlice';
import { resetSignee } from '../Assign/AssignSlice';
import './Profile.css';
import Link from 'next/link';
import { useRouter } from 'next/navigation';

const ProfilePage = () => {

  const dispatch = useDispatch();
  const user = auth.currentUser

  console.info(user)
  const { displayName, photoURL, email } = user;
  const router = useRouter()

  return (
    <Box display="flex" direction="row" paddingY={1} color={'lightGray'}>
      <Column span={9}>
        <Box padding={3}>
          <Link href="/" className='profileLink'><Heading size="lg">Docs Sign </Heading></Link>
        </Box>
      </Column >
<Row padding={3}>  <Link href="/" className='profileLink'><p className='text-slate-800' >Prepare Document</p></Link>
<Link href="/" className='profileLink'><p className='text-slate-800'>Signed Docs</p></Link>
      </Row>

 
      <Column span={3}>
        <Box padding={1}>
          <div className='flex flex-row'>
            <Box padding={1}>
              <Avatar name={displayName} size="md" src={photoURL} />
            </Box>
            <Box >
              <Text weight="bold">{displayName}</Text>
              <Text>{email}</Text>
            </Box>
            <Box padding={1}>
              <Button
                onClick={() => {
                  auth.signOut();
                  dispatch(setUser(null));
                  dispatch(resetSignee())

                  router.push("/")
                }}
                accessibilityLabel="Sign out of your account"
                text="Sign out"
              />
            </Box>
          </div>
        </Box>
      </Column>
    </Box>
  );
};
export default ProfilePage;
