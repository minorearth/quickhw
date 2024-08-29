"use client";

import Camera from "./сamera/camera.js";
import { useEffect, useState } from "react";
import Profile from "../../components/profile.js";
import { getUserName, getImgCnt, IncCnt } from "../../localstorage.js";
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
    <Camera session={params.capture} setEditProfile={setEditProfile} />
  ) : (
    <p></p>
  );
}
