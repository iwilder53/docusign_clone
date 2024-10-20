"use client";
import React from "react";
import { Text, Row, Heading, Column } from "gestalt";
import "gestalt/dist/gestalt.css";

import { Box, Button, Avatar } from "@mui/material";
import { auth } from "../../app/firebase/firebase";
import { useDispatch } from "react-redux";
import { setUser } from "../../app/firebase/firebaseSlice";
import { resetSignee } from "../Assign/AssignSlice";
import "./Profile.css";
import Link from "next/link";
import { useRouter } from "next/navigation";

const ProfilePage = () => {
  const routes = [
    {
      name: "Prepare Documents",
      path: "/AssignUsers",
    },
    {
      name: "Singed Docs",
      path: "/ViewDocument/SignedList",
    },
  ];
  const dispatch = useDispatch();
  const user = auth.currentUser;

  console.info(user);
  const { displayName, photoURL, email } = user;
  const router = useRouter();

  return (
    <div className="flex flex-row py-1 bg-slate-900 text-white">
      <Column span={9}>
        <Box padding={2}>
          <Link href="/" className="profileLink">
            <div className=" text-white text-4xl">Docs Sign</div>
          </Link>
        </Box>
      </Column>
      <div className="flex flex-row p-6 mx-6 content-around  text-white ">
        {routes.map((element) => {
          return (
            <Link
              key={element.name}
              href={element.path}
              className="  mx-8  text-white hover:text-zinc-400 hover:font-semibold font-mono"
            >
              {element.name}
            </Link>
          );
        })}
      </div>

      <Column span={6}>
        <Box padding={3}>
          <div className="flex flex-row place-content-around">
            <div className="flex flex-row mx-4 px-4">
              {" "}
              <Box padding={1}>
                <Avatar name={displayName} src={photoURL} />
              </Box>
              <Box>
                <div className=" font-bold text-white" weight="bold">
                  {displayName}
                </div>
                <div className="text-white">{email}</div>
              </Box>
            </div>
            <Box padding={1}>
              <Button
                onClick={() => {
                  auth.signOut();
                  dispatch(setUser(null));
                  dispatch(resetSignee());

                  router.push("/");
                }}
                variant="contained"
                accessibilityLabel="Sign out of your account"
                text="Sign out"
              >
                Sign Out
              </Button>
            </Box>
          </div>
        </Box>
      </Column>
    </div>
  );
};
export default ProfilePage;
