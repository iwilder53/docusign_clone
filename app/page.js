"use client"
import Image from "next/image";
import Link from "next/link";
import { Provider } from 'react-redux';
import store from "./store/store";

import App from "./pages/app/page";
export default function Home() {
  return (
    <Provider store={store}>
      <App />
    </Provider>
  );
}
