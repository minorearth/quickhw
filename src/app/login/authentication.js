"use client";
import {
  getAuth,
  signInWithEmailAndPassword,
  onAuthStateChanged,
  setPersistence,
  browserSessionPersistence,
  browserLocalPersistence,
  createUserWithEmailAndPassword,
  sendEmailVerification,
  sendPasswordResetEmail,
} from "firebase/auth";
import { login } from "../data model/server actions/session";
import { app } from "../data model/client actions/firebaseapp";
import {} from "firebase/auth";
import { setDocInCollection } from "../data model/client actions/datamodel";

// const secretKey = "secret";
// const key = new TextEncoder().encode(secretKey);

export async function signInTeacher(email, password) {
  const auth = getAuth(app);
  // await setPersistence(auth, browserLocalPersistence);
  await signInWithEmailAndPassword(auth, email, password);
  const getid = new Promise((resolved, rejected) => {
    onAuthStateChanged(auth, async (user) => {
      console.log("signinuser", user);
      if (user) {
        auth.languageCode = "ru";
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

export async function resetPsw(email) {
  const auth = getAuth(app);
  sendPasswordResetEmail(auth, email);
}

export const SignUpUser = async (email, password) => {
  const auth = getAuth(app);
  try {
    const userCredential = await createUserWithEmailAndPassword(
      auth,
      email,
      password
    );
    sendEmailVerification(userCredential.user).then(() => {});
    setDocInCollection("surveys2", { surveys: {} }, userCredential.user.uid);
    return userCredential.user.uid;
  } catch (error) {
    const errorCode = error.code;
    const errorMessage = error.message;
  }
};

// export async function signInStudent(pincode) {
//   const zz = await checkIfUniqueExistAndReturnDocDM("myusers", {
//     login: pincode,
//   });

//   const allow = zz != "multiple" && zz != "none";
//   allow && login("student");
// }
