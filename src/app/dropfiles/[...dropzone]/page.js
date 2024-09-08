"use client";
import DropZone from "./dropzone";
import Profile from "../../components/profile.js";
import { useCredentials } from "../../hooks/useCredentials";

export default function Home({ params }) {
  const { auth, setAuth, setEditProfile, editProfile } = useCredentials();
  return auth == 1 || editProfile ? (
    <Profile
      setAuth={setAuth}
      usertype="user"
      setEditProfile={setEditProfile}
    />
  ) : auth == 2 ? (
    <DropZone
      type={params.dropzone[0]}
      session={params.dropzone[1]}
      setEditProfile={setEditProfile}
    />
  ) : (
    <p></p>
  );
}
