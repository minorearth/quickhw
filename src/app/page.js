"use client";

import Manager from "./manager/manager";
import Profile from "./components/profile";
import { useCredentials } from "./hooks/useCredentials";

export default function Home() {
  const { auth, setAuth, setEditProfile, editProfile, user } = useCredentials();

  return auth == 1 || editProfile ? (
    <Profile
      setAuth={setAuth}
      usertype="manager"
      setEditProfile={setEditProfile}
    />
  ) : auth == 2 ? (
    <Manager user={user} setEditProfile={setEditProfile} />
  ) : (
    <p></p>
  );
}
