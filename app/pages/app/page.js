import React, { useEffect } from 'react';

import { useSelector, useDispatch } from 'react-redux';

import AssignUsers from '@/app/components/AssignUsers';
import SignIn from '@/app/components/SignIn/SignIn';
import SignUp from '@/app/components/SignUp/SignUp';
import Preparation from '@/app/components/Preparation';
import Sign from '@/app/components/Sign';
import View from '@/app/components/View';
import Header from '@/app/components/Header';
import PasswordReset from '@/app/components/PasswordReset/PasswordReset';
import Welcome from '@/app/components/Welcome';
import { auth, generateUserDocument } from '@/app/firebase/firebase';
import { setUser, selectUser } from '@/app/firebase/firebaseSlice';

import './App.css';

const App = () => {
  const user = useSelector(selectUser);
  const dispatch = useDispatch();

  useEffect(() => {
    auth.onAuthStateChanged(async userAuth => {
      if (userAuth) {
        const user = await generateUserDocument(userAuth);
        const { uid, displayName, email, photoURL } = user;
        dispatch(setUser({ uid, displayName, email, photoURL }));
      }
    });
  }, [dispatch]);

  return user ? (
    <div>
      <Welcome path="/" />
      <AssignUsers path="/assignUsers" />
      <Preparation path="/prepareDocument" />
      <Sign path="/signDocument" />
      <View path="/viewDocument" />
    </div>
  ) : (
    <div className="flex flex-row">
      <Header />
      <SignIn path="/" />
      <SignUp path="signUp" />
      {/*       <PasswordReset path="passwordReset" /> */}
    </div>
  );
};

export default App;
