import React, { useState } from 'react';
import { auth, signInWithGoogle } from '../../app/firebase/firebase';
import {
  Box,
  Button,
  Toast,
  Container,
  Text,
  TextField,
  Heading,
} from 'gestalt';
import 'gestalt/dist/gestalt.css';

import { useRouter } from 'next/navigation';
import { signInWithEmailAndPassword } from 'firebase/auth';
const SignIn = () => {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [error, setError] = useState(null);
  const router = useRouter()
  const signInWithEmailAndPasswordHandler = async (event, email, password) => {

    console.info(`email: ${email} pass : ${password}`)
    await signInWithEmailAndPassword(auth, email, password).catch(error => {
      setError("Error signing in with password and email!");
      console.error("Error signing in with password and email", error);
    });
  };

  return (
    <div className="m-8 w-full flex flex-row gap-8" >


      <Container color='blue'>
        <Text >
          This is a <a href='https://nextjs.org/'> [Next.js]</a> project bootstrapped with <a href='https://github.com/vercel/next.js/tree/canary/packages/create-next-app'> [`create-next-app`]</a> .
          <br />   Vercel link is not working due to an issue with CORS policy on google storage.
          <br />
          Please use Sign In With Google to start
          <br /><br />
          This project uses firebase services for authentication, docuement storage, as well as storage bucket to store PDF files.
          <br /><br />

          <br />

          features
          <br />
          <ul>
            <li>- Authentication with google </li>    <li>- prepare document</li>    <li>- add users to sign</li> <li>- view pending document signing requests</li>

          </ul>   <br />
          Email alerts
          <br />

          <ul>
            <li>- user is requested to sign</li>    <li>- update for every user who signs</li>    <li>- when a document is signed by all users/invitees</li>

          </ul>
          <br />
          <Text>     Libraries used
            <ul>
              <li>- PDFTron for PDF viewving & editing</li>    <li>- gestalt for UI components</li>    <li>- firebase sdk</li>

            </ul></Text>
        </Text>
      </Container>
      <Container><Text>

        <br />
        <Heading weight='bold' > Getting Started</Heading>

        First, run the development server:
        <br />
        <code>
          npm install<br />
          npm run dev
        </code><br />
        Open<a href='http://localhost:3000'> [http://localhost:3000]  </a> with your browser to see the project.</Text>


        <Box padding={1}>
          <div>
            <Box padding={1}>
              {error !== null && <Toast text={error} />}

            </Box>
            <Box padding={1}>
              <Button onClick={signInWithGoogle} text="Sign In" color="blue" inline />
            </Box>

          </div >
        </Box >
      </Container>

    </div >

  );
};
export default SignIn;
