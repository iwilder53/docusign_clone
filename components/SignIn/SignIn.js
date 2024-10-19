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
import Link from 'next/link';
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
    <div className="m-16 w-1/3" >
      <Box padding={3}>
        <Container>
          <Box padding={1}>
            {error !== null && <Toast text={error} />}
            <Heading size="md">Sign in</Heading>
          </Box>
          <form>
            <Box padding={2}>
              <TextField
                id="email"
                onChange={event => setEmail(event.value)}
                placeholder="Enter your email"
                label="Email"
                value={email}
                type="email"
              />
            </Box>
            <Box padding={2}>
              <TextField
                id="password"
                onChange={event => setPassword(event.value)}
                placeholder="Enter your password"
                label="Password"
                value={password}
                type="password"
              />
            </Box></form>
          <Box padding={2}>
            <Button
              onClick={event => {
                signInWithEmailAndPasswordHandler(event, email, password);
                router.push("/");
              }}
              text="Sign in"
              color="blue"
              inline
            />
          </Box>

          <Box padding={2}>
            <Text>or</Text>
          </Box>
          <Box padding={2}>
            <Button onClick={signInWithGoogle} text="Sign in with Google" color="red" inline />
          </Box>
          <Box padding={2}>
            <Text>Don&apos;t have an account?</Text>
          </Box>
          <Box padding={2}>
            <Link href="Auth/SignUp" className="text-blue-500 hover:text-blue-600">
              Sign up here
            </Link>
          </Box>
          <Box padding={2}>
            <Link
              href="Auth/ResetPassword"
              className="text-blue-500 hover:text-blue-600"
            >
              Forgot Password?
            </Link>
          </Box>
        </Container>
      </Box >
    </div >
  );
};
export default SignIn;
