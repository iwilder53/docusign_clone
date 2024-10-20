"use client";
import React from "react";

import dynamic from "next/dynamic";

//dynamic loading to prevent nextjs SSR
const Profile = dynamic(() => import("@/components/Profile/Profile"), {
  ssr: false,
});

const ViewDocumentPage = () => {
  return <Profile />;
};

export default ViewDocumentPage;
