"use client";
// import { SignJWT, jwtVerify } from "jose";
import {
  getAuth,
  signInWithEmailAndPassword,
  onAuthStateChanged,
} from "firebase/auth";
import { login } from "../server actions/session";
// import { setDocInCollection } from "./datamodel";
import { app } from "./firebaseapp";

const secretKey = "secret";
const key = new TextEncoder().encode(secretKey);

export async function signInTeacher(email, password) {
  const auth = getAuth(app);
  await signInWithEmailAndPassword(auth, email, password);
  const getid = new Promise((resolved, rejected) => {
    onAuthStateChanged(auth, async (user) => {
      console.log("signinuser", user);
      if (user) {
        auth.languageCode = "ru";
        // user.emailVerified;

        if (user.emailVerified) {
          await login("teacher");
          resolved(user.uid);
        } else {
          resolved("notVerified");
        }
      } else {
      }
    });
  });
  const uid = await getid;
  return uid;
}
