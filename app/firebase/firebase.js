
import { FirebaseError, initializeApp } from 'firebase/app';
import { getAuth, GoogleAuthProvider, signInWithPopup } from "firebase/auth";
import { getFirestore, collection, where, getDocs, doc, getDoc, setDoc, query, updateDoc } from "firebase/firestore";

import 'firebase/firestore';
import 'firebase/storage';

import { mergeAnnotations } from '../../components/MergeAnnotations/MergeAnnotations';
import { getStorage } from 'firebase/storage';

const firebaseConfig = {
  apiKey: "AIzaSyAyDmBFLsYmknmeNghLz-Xw2wLIQSMNr48",
  authDomain: "docusignclone.firebaseapp.com",
  projectId: "docusignclone",
  storageBucket: "docusignclone.appspot.com",
  messagingSenderId: "491807205117",
  appId: "1:491807205117:web:76f35b9931e73f4e134094"
};
// Initialize Firebase
// firebase.initializeApp();


const firebase = initializeApp(firebaseConfig);
export const auth = getAuth(firebase);
export const firestore = getFirestore(firebase);
export const storage = getStorage(firebase);


const provider = new GoogleAuthProvider();

export const signInWithGoogle = async () => {
  await signInWithPopup(auth, provider);
  
};

export const generateUserDocument = async (user, additionalData) => {
  if (!user) return;
  const userRef = doc(firestore, `users/${user.uid}`)

  const snapshot = await getDoc(userRef)

  if (!snapshot.exists) {
    const { email, displayName, photoURL } = user;
    try {
      await userRef.set({
        displayName,
        email,
        photoURL,
        ...additionalData,
      });
    } catch (error) {
      console.error('Error creating user document', error);
    }
  }
  return getUserDocument(user.uid);
};

const getUserDocument = async uid => {
  if (!uid) return null;
  try {
    const userRef = doc(firestore, "users", auth.currentUser.uid)

    const userDocument = await getDoc(userRef)
    return {
      uid,
      ...userDocument.data(),
    };
  } catch (error) {
    console.error('Error fetching user', error);
  }
};

export const addDocumentToSign = async (uid, email, docRef, emails) => {
  if (!uid) return;
  const signed = false;
  const xfdf = [];
  const signedBy = [];
  const requestedTime = new Date();
  const signedTime = '';

  const documentsRef = doc(firestore, `documentsToSign`, docRef.split('/')[1])
  setDoc(documentsRef, {
    uid,
    email,
    docRef,
    emails,
    xfdf,
    signedBy,
    signed,
    requestedTime,
    signedTime,
  }).then(function (docRef) {
    console.log('Document written with ID: ', docRef);
  })
    .catch(function (error) {
      console.error('Error adding document: ', error);
    });
};

export const updateDocumentToSign = async (docId, email, xfdfSigned) => {
  const documentRef = doc(firestore, 'documentsToSign', docId)

  getDoc(documentRef)
    .then(async doc => {
      if (doc.exists) {
        const { signedBy, emails, xfdf, docRef } = doc.data();
        if (!signedBy.includes(email)) {
          const signedByArray = [...signedBy, email];
          const xfdfArray = [...xfdf, xfdfSigned];
          await updateDoc(documentRef, {
            xfdf: xfdfArray,
            signedBy: signedByArray,
          });

          if (signedByArray.length === emails.length) {
            const time = new Date();
            await updateDoc(documentRef, {
              signed: true,
              signedTime: time,
            });



            mergeAnnotations(docRef, xfdfArray);
          }
        }
      } else {
        console.log('No such document!');
      }
    })
    .catch(function (error) {
      console.log('Error getting document:', error);
    });
};

export const searchForDocumentToSign = async email => {

  const documentsRef = collection(firestore, 'documentsToSign')
  const q = query(
    documentsRef,
    where('emails', 'array-contains', email),
    where('signed', '==', false),
  );


  const querySigned = query(
    documentsRef,
    where('signedBy', 'array-contains', email))




  const docIds = [];
  const docIdSigned = [];
  await getDocs(querySigned)
    .then(function (querySnapshot) {
      querySnapshot.forEach(function (doc) {
        const docId = doc.id;
        docIdSigned.push(docId);
      });
    })
    .catch(function (error) {
      console.log('Error getting documents: ', error);
    });

  await getDocs(q)
    .then(function (querySnapshot) {
      querySnapshot.forEach(function (doc) {
        const { docRef, email, requestedTime } = doc.data();
        const docId = doc.id;
        if (!docIdSigned.includes(docId)) {
          docIds.push({ docRef, email, requestedTime, docId });
        }
      });
    })
    .catch(function (error) {
      console.log('Error getting documents: ', error);
    });
  return docIds;
};

export const searchForDocumentsSigned = async email => {
  const documentsRef = collection(firestore, 'documentsToSign');

  const docIds = [];

  let q = query(documentsRef,
    where('email', '==', email),
    where('signed', '==', true));


  await getDocs(q)
    .then(function (querySnapshot) {
      querySnapshot.forEach(function (doc) {
        const { docRef, emails, signedTime } = doc.data();
        const docId = doc.id;
        docIds.push({ docRef, emails, signedTime, docId });
      });
    })
    .catch(function (error) {
      console.log('Error getting documents: ', error);
    });

  return docIds;
};
