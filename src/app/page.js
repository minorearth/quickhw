"use client";

import Manager from "./manager/manager";
import Profile from "../components/profile";
import { useCredentials } from "./hooks/useCredentials";

export default function Home() {
  const {
    auth,
    setAuth,
    setProfileVisible,
    profileVisible,
    username,
    setUsername,
  } = useCredentials();

  return auth == 1 || profileVisible ? (
    <Profile
      setAuth={setAuth}
      setProfileVisible={setProfileVisible}
      setUsername={setUsername}
    />
  ) : auth == 2 ? (
    <Manager user={username} setProfileVisible={setProfileVisible} />
  ) : (
    <p></p>
  );
}
