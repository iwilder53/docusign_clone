'use client'
import React, { useEffect } from 'react';

import { useSelector, useDispatch } from 'react-redux';

import SignIn from '@/components/SignIn/SignIn';


import Header from '@/components/Header';

import Welcome from '@/components/Welcome';
import { auth, generateUserDocument } from '@/app/firebase/firebase';
import { setUser, selectUser } from '@/app/firebase/firebaseSlice';

import './app.css';
import { getAuth, onAuthStateChanged } from "firebase/auth";
import dynamic from 'next/dynamic';



const App = () => {
  const user = useSelector(selectUser);
  const dispatch = useDispatch();

  useEffect(() => {

    onAuthStateChanged(auth, async (user) => {
      if (!auth.currentUser) {
        return
      }

      const userData = await generateUserDocument(user);
      console.info(userData)
      console.info(user)
      console.info(`auth: ${auth.currentUser}`)
      const { uid, displayName, email, photoURL } = auth.currentUser;

      dispatch(setUser({ uid, displayName, email, photoURL }));

    });
  }, [dispatch]);

  return user ? (

    <Welcome path="/" />


  ) : (
    <div >
      <Header />
      <SignIn path="/" />
      {/*    <SignUp path="signUp" /> */}
      {/*       <PasswordReset path="passwordReset" /> */}
    </div>
  );
};

export default dynamic(() => Promise.resolve(App), {
  ssr: false
});
