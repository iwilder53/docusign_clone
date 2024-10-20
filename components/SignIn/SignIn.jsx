import React, { useState } from "react";
import { auth, signInWithGoogle } from "../../app/firebase/firebase";
import {
  Box,
  Toast,
  Container,
  Button,
  Text,
  TextField,
  Heading,
} from "gestalt";
import "gestalt/dist/gestalt.css";

import { useRouter } from "next/navigation";
import { signInWithEmailAndPassword } from "firebase/auth";
const SignIn = () => {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [error, setError] = useState(null);
  const router = useRouter();
  const signInWithEmailAndPasswordHandler = async (event, email, password) => {
    console.info(`email: ${email} pass : ${password}`);
    await signInWithEmailAndPassword(auth, email, password).catch((error) => {
      setError("Error signing in with password and email!");
      console.error("Error signing in with password and email", error);
    });
  };

  return (
    <div className="m-8 w-full flex flex-row gap-8">
      <Container color="blue">
        <Text>
          This is a <a href="https://nextjs.org/"> [Next.js]</a> project
          bootstrapped with{" "}
          <a href="https://github.com/vercel/next.js/tree/canary/packages/create-next-app">
            {" "}
            [`create-next-app`]
          </a>{" "}
          .
          <br /> If possible run locally, because there are some issues with
          vercel deployment
          <br />
          Please use Sign In With Google to start
          <br />
          <br />
          <div className="font-semibold">
            This project uses firebase services for authentication, docuement
            storage, as well as storage bucket to store PDF files.
            <br />
          </div>
          <br />
          <div className="font-bold">Features</div>
          <ul>
            <li>- Authentication with google </li>{" "}
            <li>- Prepare document to sign</li>{" "}
            <li>- Add users to signing list</li>{" "}
            <li>- View pending document signing requests</li>
          </ul>
          <br />
          <div className=" flex flex-row">
            {" "}
            <div className="font-bold"> Email alerts</div>{" "}
            <div className="font-light text-base"> &nbsp;whenever</div>
          </div>
          <ul>
            <li>- user is requested to sign</li>{" "}
            <li>- update for every user who signs</li>{" "}
            <li>- when a document is signed by all users/invitees</li>
          </ul>
          <br />
          <Text>
            <div className="font-bold"> Libraries used</div>
            <ul>
              <li>- PDFTron for PDF viewving & editing</li>{" "}
              <li>- gestalt for UI components</li> <li>- firebase sdk</li>
              <li>- NodeMailer & Firebase functions </li>
            </ul>
          </Text>
        </Text>
      </Container>

      <Container>
        <Text>
          <br />
          <div className="flex flex-row">
            {" "}
            <Heading weight="bold"> Folder Structure </Heading>
            <div className=" ml-16 place-content-end">
              <div>
                <Box padding={1}>
                  {error !== null && <Toast text={error} />}
                </Box>
                <Box padding={1}>
                  <Button
                    onClick={signInWithGoogle}
                    text="Sign In"
                    color="blue"
                    inline
                  />
                </Box>
              </div>
            </div>
          </div>
          <br />
          <div className="flex flex-row">
            <code>
              └──  App/ <br />
              ├────  app.css <br />
              │ └────  page.jsx <br />
              └──  AssignUsers/ <br />
              │ └────  page.jsx <br />
              └──  PrepareDocument/ <br />
              │ └────  page.jsx <br />
              └──  Profile/ <br />
              │ └────  page.jsx <br />
              └──  SignDocument/ <br />
              │ └────  page.jsx <br />
              └──  ViewDocument/ <br />
              │ └────  PendingList/ <br />
              │ │ └────  page.jsx <br />
              │ └────  SignedList/ <br />
              │ │ └────  page.jsx <br />
              │ └────  page.jsx <br />
              ├──  favicon.ico <br />
              └──  firebase/ <br />
              │ ├────  firebase.js <br />
              │ ├────  firebaseSlice.js <br />
              │ └────  firebaseStore.js <br />
              └──  fonts/ <br />
              │ ├────  GeistMonoVF.woff <br />
              │ └────  GeistVF.woff <br />
              ├──  globals.css <br />
              ├──  isClientCtx.jsx <br />
              ├──  layout.jsx <br />
              ├──  page.jsx <br />
              ├──  setupCors.js <br />
              └──  store/ <br />
              │ └────  store.js <br />
              <br />
            </code>
            <br />
            <code>
              {" "}
              components/ <br />
              │ ├────  Assign.jsx <br />
              │ └────  AssignSlice.js <br />
              └──  AssignUsers/ <br />
              │ └────  AssignUsers.jsx <br />
              ├──  AssignUsers.jsx <br />
              ├──  Header.jsx <br />
              └──  Lists/ <br />
              │ ├────  SignList.jsx <br />
              │ └────  SignedList.jsx <br />
              └──  MergeAnnotations/ <br />
              │ ├────  MergeAnnotations.js <br />
              │ └────  MergeAnnotationsSlice.js <br />
              ├──  Preparation.jsx <br />
              └──  PrepareDocument/ <br />
              │ ├────  PrepareDocument.css <br />
              │ └────  PrepareDocument.jsx <br />
              └──  Profile/ <br />
              │ ├────  Profile.css <br />
              │ └────  Profile.jsx <br />
              ├──  Sign.jsx <br />
              └──  SignDocument/ <br />
              │ ├────  SignDocument.css <br />
              │ ├────  SignDocument.jsx <br />
              │ └────  SignDocumentSlice.js <br />
              └──  SignIn/ <br />
              │ └────  SignIn.jsx <br />
              ├──  View.jsx <br />
              └──  ViewDocument/ <br />
              │ ├────  ViewDocument.css <br />
              │ ├────  ViewDocument.jsx <br />
              │ └────  ViewDocumentSlice.js <br />
              ├──  Welcome.jsx <br />
              └──  ui/ <br />
              │ ├────  CircularProgressIndicator.jsx <br />│ └──── 
              DataGrid.jsx
            </code>
          </div>
        </Text>
      </Container>
    </div>
  );
};
export default SignIn;
