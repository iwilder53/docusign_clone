"use client";
import React from "react";

import dynamic from "next/dynamic";

//dynamic loading to prevent nextjs SSR
const SignDocument = dynamic(
  () => import("@/components/SignDocument/SignDocument"),
  { ssr: false }
);

const SignDocumentPage = () => {
  return <SignDocument />;
};

export default SignDocumentPage;
