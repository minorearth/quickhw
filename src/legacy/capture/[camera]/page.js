"use client";

import Camera from "./сamera/camera.js";
import { useEffect, useState } from "react";
import Profile from "../../../app/components/profile.js";
import { getUserName, getImgCnt, IncCnt } from "../../../app/localstorage.js";
import { useCredentials } from "../../hooks/useCredentials.js/index.js";

export default function Home({ params }) {
  const { auth, setAuth, setEditProfile, editProfile } = useCredentials();

  return auth == 1 || editProfile ? (
    <Profile
      setAuth={setAuth}
      usertype="user"
      setEditProfile={setEditProfile}
    />
  ) : auth == 2 ? (
    <Camera session={params.camera} setEditProfile={setEditProfile} />
  ) : (
    <p></p>
  );
}
