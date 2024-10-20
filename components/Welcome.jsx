"use client"
import React, { useEffect } from 'react';
import Profile from './Profile/Profile';

import { useDispatch } from 'react-redux';
import SignList from './Lists/SignList';
import SignedList from './Lists/SignedList';
import { resetDocToView } from './ViewDocument/ViewDocumentSlice';
import { resetDocToSign } from './SignDocument/SignDocumentSlice';
import { Box, Button, Column, Container, Heading, Row, SideNavigation, Text } from 'gestalt';
import 'gestalt/dist/gestalt.css';
import { useRouter } from 'next/navigation';



const ProfilePage = () => {
  const dispatch = useDispatch();
  const router = useRouter();


  useEffect(() => {
    dispatch(resetDocToView());
    dispatch(resetDocToSign());
  }, [dispatch]);

  return (
    <div>
      <Profile />
      <Container>
        <div className='w-100%'>
 
          <Column>
          
            <Box padding={3}>
          <Heading size="md">{`Sign Documents`}</Heading>
          <div className=' text-gray-900'>Pending document you&apos;ve been asked to sign</div>
        </Box>
        <Box padding={3}>
          <SignList />   
        </Box> </Column></div>
{/*         <Box padding={3}>
          <Heading size="md">{`Prepare Document`}</Heading>
        </Box>
        <Box padding={2}>
          <Button
            onClick={event => {
              router.push(`/AssignUsers`);
            }}
            text="Prepare Document for Signing"
            color="blue"
            inline
          />
        </Box> */}


{/*         <Box padding={3}>
          <Heading size="md">{`Review Signed Documents`}</Heading>
        </Box>
        <Box padding={3}>
          <SignedList />
        </Box> */}
      </Container>
    </div>
  );
};
export default ProfilePage;
