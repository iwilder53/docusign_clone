import { initializeApp } from "firebase/app";
import { getAuth, GoogleAuthProvider, signInWithPopup } from "firebase/auth";
import {
  getFirestore,
  collection,
  where,
  getDocs,
  doc,
  getDoc,
  setDoc,
  query,
  updateDoc,
} from "firebase/firestore";
import "firebase/firestore";
import "firebase/storage";
import { getStorage } from "firebase/storage";

import { mergeAnnotations } from "../../../components/MergeAnnotations/MergeAnnotations";
import { sendMail } from "../mailer/mailer";

//set these in accordance with .env
const firebaseConfig = {
  apiKey: process.env.NEXT_PUBLIC_APP_API_KEY,
  projectId: process.env.NEXT_PUBLIC_APP_PROJECT_ID,
  appId: process.env.NEXT_PUBLIC_APP_APP_ID,
  authDomain: process.env.NEXT_PUBLIC_APP_AUTH_DOMAIN,
  messagingSenderId: process.env.NEXT_PUBLIC_APP_MESSAGING_SENDER_ID,
  storageBucket: process.env.NEXT_PUBLIC_APP_STORAGE_BUCKET,
};
// Initialize Firebase
//global firebase objects
export const firebase = initializeApp(firebaseConfig);
export const auth = getAuth(firebase);
export const firestore = getFirestore(firebase);
export const storage = getStorage(firebase);

const provider = new GoogleAuthProvider();

export const signInWithGoogle = async () => {
  await signInWithPopup(auth, provider);
};

export const generateUserDocument = async (user, additionalData) => {
  if (!user) return;
  const userRef = doc(firestore, `users/${user.uid}`);

  const snapshot = await getDoc(userRef);

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
      console.error("Error creating user document", error);
    }
  }
  return getUserDocument(user.uid);
};

const getUserDocument = async (uid) => {
  if (!uid) return null;
  try {
    const userRef = doc(firestore, "users", auth.currentUser.uid);

    const userDocument = await getDoc(userRef);
    return {
      uid,
      ...userDocument.data(),
    };
  } catch (error) {
    console.error("Error fetching user", error);
  }
};
//when new doc is uploaded by user
export const addDocumentToSign = async (uid, email, docRef, emails) => {
  if (!uid) return;
  const signed = false;
  const xfdf = [];
  const signedBy = [];
  const requestedTime = new Date();
  const signedTime = "";

  const documentsRef = doc(firestore, `documentsToSign`, docRef.split("/")[1]);
  await setDoc(documentsRef, {
    uid,
    email,
    docRef,
    emails,
    xfdf,
    signedBy,
    signed,
    requestedTime,
    signedTime,
  })
    .then(async function (docRef) {
      console.log("Document written with ID: ", docRef);
    })
    .catch(function (error) {
      console.error("Error adding document: ", error);
    });

  const mailText = `Hi, \n\nYou have been requested to sign a document by ${auth.currentUser.displayName}, \nClick on the link to continue https://docusign-clone.vercel.app`;

  const response = await sendMail({
    email: email,
    subject: "New Signature Request",
    sendTo: emails,
    text: mailText,
  });
};
//upload, and create new entry in firestore,also send mail notifications
//runs when user signs existing doc
export const updateDocumentToSign = async (docId, email, xfdfSigned) => {
  const documentRef = doc(firestore, "documentsToSign", docId);

  await getDoc(documentRef)
    .then(async (doc) => {
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
            const mailText = `Hi, \n\n A document you requested has finished signing by ${emails}, \n`;
            //send notification
            const response = await sendMail({
              email: email,
              subject: "Document Signed",
              sendTo: emails,
              text: mailText,
            });

            await updateDoc(documentRef, {
              signed: true,
              signedTime: time,
            });
            //wait for annotations to merge with pdf
            await mergeAnnotations(docRef, xfdfArray);
          } else {
            const mailText = `Hi, \n\n A document you requested has been signed by ${auth.currentUser.displayName}, \n`;
            //send notification
            const response = await sendMail({
              email: email,
              subject: "New Signature Update",
              sendTo: emails,
              text: mailText,
            });
          }
        }
      } else {
        console.log("No such document!");
      }
    })
    .catch(function (error) {
      console.log("Error getting document:", error);
    });
};
//get list of docs to sign
export const searchForDocumentToSign = async (email) => {
  const documentsRef = collection(firestore, "documentsToSign");
  const q = query(
    documentsRef,
    where("emails", "array-contains", email),
    where("signed", "==", false)
  );

  const querySigned = query(
    documentsRef,
    where("signedBy", "array-contains", email)
  );

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
      console.log("Error getting documents: ", error);
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
      console.log("Error getting documents: ", error);
    });
  return docIds;
};
//gets list of previously signed docs
export const searchForDocumentsSigned = async (email) => {
  const documentsRef = collection(firestore, "documentsToSign");

  const docIds = [];

  let q = query(
    documentsRef,
    where("email", "==", email),
    where("signed", "==", true)
  );

  await getDocs(q)
    .then(function (querySnapshot) {
      querySnapshot.forEach(function (doc) {
        const { docRef, emails, signedTime } = doc.data();
        const docId = doc.id;
        docIds.push({ docRef, emails, signedTime, docId });
      });
    })
    .catch(function (error) {
      console.log("Error getting documents: ", error);
    });

  return docIds;
};
