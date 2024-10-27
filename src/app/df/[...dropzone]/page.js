"use client";
import Drop from "./drop/drop";
import { useEffect } from "react";

export default function Home({ params }) {
  useEffect(() => {
    console.log(params);
  }, []);
  // const { auth, setAuth, setEditProfile, editProfile } = useCredentials();
  return (
    <Drop
      type={params.dropzone[0]}
      surveyid={params.dropzone[1]}
      manager={params.dropzone[2]}
      // surveyname={decodeURI(params.dropzone[3])}
    />
  );
}
