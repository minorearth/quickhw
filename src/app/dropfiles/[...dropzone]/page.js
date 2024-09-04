"use client";
import DropZone from "./dropzone";
import Profile from "../../components/profile.js";
import { useCredentials } from "../../useCredentials.js";

export default function Home({ params }) {
  const { auth, setAuth, setEditProfile, editProfile } = useCredentials();
  console.log(params.dropzone[1], params.dropzone[0]);

  return auth == 1 || editProfile ? (
    <Profile
      setAuth={setAuth}
      usertype="user"
      setEditProfile={setEditProfile}
    />
  ) : auth == 2 ? (
    <DropZone session={params.dropzone[1]} setEditProfile={setEditProfile} />
  ) : (
    <p></p>
  );
}
