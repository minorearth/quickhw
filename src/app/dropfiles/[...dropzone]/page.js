"use client";
import Drop from "./drop/drop";

export default function Home({ params }) {
  // const { auth, setAuth, setEditProfile, editProfile } = useCredentials();
  return <Drop type={params.dropzone[0]} session={params.dropzone[1]} />;
}
