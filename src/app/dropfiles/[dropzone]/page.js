"use client";
import DropZone from "./dropzone";
import Profile from "../../components/profile.js";
import { useCredentials } from "../../useCredentials.js";

export default function Home({ params }) {
  const { auth, setAuth, setEditProfile, editProfile } = useCredentials();

  return auth == 1 || editProfile ? (
    <Profile
      setAuth={setAuth}
      usertype="user"
      setEditProfile={setEditProfile}
    />
  ) : auth == 2 ? (
    <DropZone session={params.dropzone} setEditProfile={setEditProfile} />
  ) : (
    <p></p>
  );
}
