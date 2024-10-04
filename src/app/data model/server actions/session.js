"use server";
// import { SignJWT, jwtVerify } from "jose";
import { cookies } from "next/headers";
import { NextRequest, NextResponse } from "next/server";

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
  const expires = new Date(Date.now() + 60 * 60 * 20 * 1000);
  // const expires = new Date(Date.now() + 10000);
  // const session = await encrypt({ user, expires });
  cookies().set("__session", user, { expires, httpOnly: true });
}

export async function logout() {
  cookies().set("__session", "", { expires: new Date(0) });
}

// export async function updateSession(request) {
//   const session = request.cookies.get("__session")?.value;
//   if (!session) return;
//   const parsed = await decrypt(session);
//   parsed.expires = new Date(Date.now() + 1000);
//   const res = NextResponse.next();
//   res.cookies.set({
//     name: "__session",
//     value: await encrypt(parsed),
//     httpOnly: true,
//     expires: parsed.expires,
//   });
//   return res;
// }
