"use client";
import DropZone from "./filesdropzone/dropzone/dropzone";
import Profile from "../../components/profile.js";
import { useCredentials } from "../../hooks/useCredentials";

export default function Home({ params }) {
  const { auth, setAuth, setEditProfile, editProfile } = useCredentials();
  return (
    <DropZone
      type={params.dropzone[0]}
      session={params.dropzone[1]}
      setEditProfile={setEditProfile}
    />
  );
}
