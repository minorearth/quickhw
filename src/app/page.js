"use client";

import Manager from "./manager/manager";
import Profile from "../components/profile";
import { useCredentials } from "./hooks/useCredentials";
import { useEffect } from "react";
import { useRouter } from "next/navigation";

export default function Home() {
  // const {
  //   auth,
  //   setAuth,
  //   setProfileVisible,
  //   profileVisible,
  //   username,
  //   setUsername,
  // } = useCredentials();

  const router = useRouter();

  useEffect(() => {
    router.push("/login");
  }, []);

  // return auth == 1 || profileVisible ? (
  //   <Profile
  //     setAuth={setAuth}
  //     setProfileVisible={setProfileVisible}
  //     setUsername={setUsername}
  //   />
  // ) : auth == 2 ? (
  //   <Manager user={username} setProfileVisible={setProfileVisible} />
  // ) : (
  //   <p></p>
  // );
}
