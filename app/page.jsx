"use client";
import Image from "next/image";
import Link from "next/link";

import App from "./App/page";
// import { configureBucketCors } from "./setupCors";

import { IsClientCtxProvider } from "./isClientCtx";

export default function Home() {
  // configureBucketCors

  return (
    <IsClientCtxProvider>
      {" "}
      <App />
    </IsClientCtxProvider>
  );
}
