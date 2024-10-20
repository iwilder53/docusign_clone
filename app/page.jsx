"use client";

import App from "./App/page";
import { IsClientCtxProvider } from "./isClientCtx";

//Client context needed to delay ssr on certain components
export default function Home() {
  return (
    <IsClientCtxProvider>
      <App />
    </IsClientCtxProvider>
  );
}
