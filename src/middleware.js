import { cookies } from "next/headers";

export function middleware(request) {
  const session = request.cookies.get("session");
  console.log("session", session);

  if (!session && request.nextUrl.pathname.startsWith("/manager")) {
    return Response.redirect(new URL("/", request.url));
  }
  // if (
  //   !session &&
  //   request.nextUrl.pathname.startsWith("/main/tasksclassifier")
  // ) {
  //   return Response.redirect(new URL("/", request.url));
  // }

  // if (!session && request.nextUrl.pathname.startsWith("/testrun")) {
  //   return Response.redirect(new URL("/", request.url));
  // }
}

//   export const config = {
//     matcher: ['/((?!api|_next/static|_next/image|.*\\.png$).*)'],
//   }
