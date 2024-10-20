"use client";

import React from "react";
import dynamic from "next/dynamic";

//dynamic loading to prevent nextjs SSR 
const SignedList = dynamic(() => import("@/components/Lists/SignedList"), {
  ssr: false,
});
const ProfilePage = dynamic(() => import("@/components/Profile/Profile"), {
  ssr: false,
});

const SignedListPage = () => {
  return (
    <div>
      <ProfilePage />

      <SignedList />
    </div>
  );
};

export default SignedListPage;
