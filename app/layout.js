'use client'
import localFont from "next/font/local";
import "./globals.css";
import { Provider } from 'react-redux';
import store from "./store/store";
import { IsClientCtxProvider } from "./isClientCtx";

const geistSans = localFont({
  src: "./fonts/GeistVF.woff",
  variable: "--font-geist-sans",
  weight: "100 900",
});
const geistMono = localFont({
  src: "./fonts/GeistMonoVF.woff",
  variable: "--font-geist-mono",
  weight: "100 900",
});



export default function RootLayout({ children }) {
  return (
    <html lang="en">
      <Provider store={store}>

        <body
          className={`${geistSans.variable} ${geistMono.variable} antialiased bg-slate-50`}
        >
          {children}
        </body>
      </Provider>
    </html>
  );
}
