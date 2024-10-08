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
  signOut,
} from "firebase/auth";
import { login, logout } from "../../server actions/session";
import { app } from "../data model/client actions/firebaseapp";
import { setDocInCollection } from "../data model/client actions/datamodel";
import { createNewUser } from "../data model/client actions/indexUtils";

// const secretKey = "secret";
// const key = new TextEncoder().encode(secretKey);

export async function signInTeacher(email, password) {
  const auth = getAuth(app);
  await setPersistence(auth, browserSessionPersistence);
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
          // sendEmailVerification(user).then(() => {});
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
    const userid = userCredential.user.uid;
    sendEmailVerification(userCredential.user).then(() => {});
    createNewUser(userid);
    return userCredential.user.uid;
  } catch (error) {
    const errorCode = error.code;
    const errorMessage = error.message;
  }
};

export const signOutUser = () => {
  const auth = getAuth(app);
  signOut(auth)
    .then(() => {
      logout();
      // Sign-out successful.
    })
    .catch((error) => {
      // An error happened.
    });
};

// export async function signInStudent(pincode) {
//   const zz = await checkIfUniqueExistAndReturnDocDM("myusers", {
//     login: pincode,
//   });

//   const allow = zz != "multiple" && zz != "none";
//   allow && login("student");
// }
