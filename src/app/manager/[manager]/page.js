"use client";

import Manager from "./manager";
// import Profile from "../components/profile";
// import { useCredentials } from "./hooks/useCredentials";

export default function Home({ params }) {
  // const {
  //   auth,
  //   setAuth,
  //   setProfileVisible,
  //   profileVisible,
  //   username,
  //   setUsername,
  // } = useCredentials();

  return <Manager user={params.manager} setProfileVisible={() => {}} />;
}
