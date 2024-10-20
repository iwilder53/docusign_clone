"use client";
import React, { useEffect, useState } from "react";

import { useSelector, useDispatch } from "react-redux";

import SignIn from "@/components/SignIn/SignIn";

import Header from "@/components/Header";

import Welcome from "@/components/Welcome";
import { auth, generateUserDocument } from "@/app/services/firebase/firebase";
import { setUser, selectUser } from "@/app/services/firebase/firebaseSlice";

import "./app.css";
import { onAuthStateChanged } from "firebase/auth";
import dynamic from "next/dynamic";
import CircularIndeterminate from "@/components/ui/CircularProgressIndicator";

const App = () => {
  const user = useSelector(selectUser);
  const [isLoading, setLoading] = useState(true);

  const dispatch = useDispatch();
  //this can be imporved
  useEffect(() => {
    //set the user provider with user data
    onAuthStateChanged(auth, async (user) => {
      const userData = await generateUserDocument(user);
      console.info(userData);
      console.info(user);
      console.info(`auth: ${auth.currentUser}`);
      const { uid, displayName, email, photoURL } = auth.currentUser;
      dispatch(setUser({ uid, displayName, email, photoURL }));
      setLoading(false);
    });
  }, [dispatch]);
  //check login status and return component
  return isLoading ? (
    <div className=" h-screen flex items-center justify-center">
      <CircularIndeterminate />
    </div>
  ) : user ? (
    <Welcome path="/" />
  ) : (
    <div>
      <Header />
      <SignIn path="/" />
    </div>
  );
};

export default dynamic(() => Promise.resolve(App), {
  ssr: false,
});
