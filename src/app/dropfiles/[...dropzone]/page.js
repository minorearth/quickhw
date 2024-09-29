"use client";
import Drop from "./drop/drop";

export default function Home({ params }) {
  // const { auth, setAuth, setEditProfile, editProfile } = useCredentials();
  return <Drop type={params.dropzone[0]} surveyid={params.dropzone[1]} />;
}
