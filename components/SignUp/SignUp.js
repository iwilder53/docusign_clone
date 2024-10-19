'use client'
import React, { useState } from 'react';
import { auth, signInWithGoogle, generateUserDocument } from '../../app/firebase/firebase';
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
import { createUserWithEmailAndPassword } from 'firebase/auth';
const SignUp = () => {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [displayName, setDisplayName] = useState('');
  const [error, setError] = useState(null);
  const router = useRouter()
  const createUserWithEmailAndPasswordHandler = async (event, email, password) => {
    try {
      const { user } = await createUserWithEmailAndPassword(email, password);
      await generateUserDocument(user, { displayName });

    }
    catch (error) {
      setError('Error Signing up with email and password');
    }

    setEmail("");
    setPassword("");
    setDisplayName("");
  };

  return (
    <div>
      <Box padding={3}>
        <Container>
          <Box padding={3}>
            {error !== null && <Toast text={error} />}
            <Heading size="md">Sign up</Heading>

          </Box>
          <form>

            <Box padding={2}>
              <TextField
                id="displayName"
                onChange={event => setDisplayName(event.value)}
                placeholder="Enter your name"
                label="Name"
                value={displayName}
                type="text"
              />
            </Box>

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
                autoComplete='current-password'
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
              type='submit'
              onClick={
                (e) => {
                  e.dangerouslyDisableOnNavigation();
                  createUserWithEmailAndPasswordHandler(e, email, password);
                  router.push('/');
                }}
              text="Sign up"
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
            <Text>Already have an account?</Text>
          </Box>
          <Box padding={2}>
            <Link href="/" className="text-blue-500 hover:text-blue-600">
              Sign in here
            </Link>
          </Box>
        </Container>
      </Box>
    </div>
  );
};
export default SignUp;
