"use client";
import React from "react";
import dynamic from "next/dynamic";

//dynamic loading to prevent nextjs SSR
const AssignUsers = dynamic(
  () => import("@/components/AssignUsers/AssignUsers"),
  { ssr: false }
);

const AssignUsersPage = () => {
  return <AssignUsers />;
};

export default AssignUsersPage;
