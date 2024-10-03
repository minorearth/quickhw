"use server";
// import { SignJWT, jwtVerify } from "jose";
import { cookies } from "next/headers";
import { NextRequest, NextResponse } from "next/server";
import {
  getAuth,
  signInWithEmailAndPassword,
  onAuthStateChanged,
  createUserWithEmailAndPassword,
  sendEmailVerification,
  sendPasswordResetEmail,
} from "firebase/auth";
import { setDocInCollection } from "./datamodel";
import { app } from "./firebaseapp";

const secretKey = "secret";
const key = new TextEncoder().encode(secretKey);

export async function encrypt(payload) {
  return payload;
  return await new SignJWT(payload)
    .setProtectedHeader({ alg: "HS256" })
    .setIssuedAt()
    .setExpirationTime("10 sec from now")
    .sign(key);
}

export async function decrypt(input) {
  return payload;
  const { payload } = await jwtVerify(input, key, {
    algorithms: ["HS256"],
  });
  return payload;
}

export async function login(user) {
  // const expires = new Date(Date.now() + 60 * 60 * 20 * 1000);
  const expires = new Date(Date.now() + 10000);
  // const session = await encrypt({ user, expires });
  cookies().set("session", user, { expires, httpOnly: true });
}

export async function resetPsw(email) {
  const auth = getAuth(app);
  sendPasswordResetEmail(auth, email);
}

export async function signInTeacher(email, password) {
  const auth = getAuth(app);
  // try {
  //   await signInWithEmailAndPassword(auth, email, password);
  // } catch (error) {
  //   throw new Error("auth error2", error.message);
  // }

  await signInWithEmailAndPassword(auth, email, password);
  const getid = new Promise((resolved, rejected) => {
    onAuthStateChanged(auth, (user) => {
      console.log("signinuser", user);
      if (user) {
        auth.languageCode = "ru";
        // user.emailVerified;

        if (user.emailVerified) {
          login("teacher");
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

export const SignUpUser = async (email, password) => {
  const auth = getAuth();
  try {
    const userCredential = await createUserWithEmailAndPassword(
      auth,
      email,
      password
    );
    // onAuthStateChanged(auth, (user) => {
    //   if (user) {
    //     sendEmailVerification(user).then(() => {});
    //   }
    // });
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

export async function logout() {
  cookies().set("session", "", { expires: new Date(0) });
}

// export async function updateSession(request) {
//   const session = request.cookies.get("session")?.value;
//   if (!session) return;
//   const parsed = await decrypt(session);
//   parsed.expires = new Date(Date.now() + 1000);
//   const res = NextResponse.next();
//   res.cookies.set({
//     name: "session",
//     value: await encrypt(parsed),
//     httpOnly: true,
//     expires: parsed.expires,
//   });
//   return res;
// }
