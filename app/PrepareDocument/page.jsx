"use client";

import React from "react";
import dynamic from "next/dynamic";

//dynamic loading to prevent nextjs SSR
const PrepareDocument = dynamic(
  () => import("@/components/PrepareDocument/PrepareDocument"),
  { ssr: false }
);

const PrepareDocumentPage = () => {
  return <PrepareDocument />;
};

export default PrepareDocumentPage;
