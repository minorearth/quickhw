"use server";
// import { SignJWT, jwtVerify } from "jose";
import { cookies } from "next/headers";
import { NextRequest, NextResponse } from "next/server";
import { getAuth, signInWithEmailAndPassword } from "firebase/auth";
import { app } from "./src/app/data model/server actions/firebaseapp";

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
  const expires = new Date(Date.now() + 1000 * 1000);
  // const session = await encrypt({ user, expires });
  cookies().set("session", user, { expires, httpOnly: true });
}

export async function signInTeacher(email, password) {
  const auth = getAuth(app);
  try {
    await signInWithEmailAndPassword(auth, email, password);
    await login("teacher");
  } catch (error) {
    throw new Error("auth error");
  }
}

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

export async function updateSession(request) {
  const session = request.cookies.get("session")?.value;
  if (!session) return;
  const parsed = await decrypt(session);
  parsed.expires = new Date(Date.now() + 100 * 1000);
  const res = NextResponse.next();
  res.cookies.set({
    name: "session",
    value: await encrypt(parsed),
    httpOnly: true,
    expires: parsed.expires,
  });
  return res;
}
