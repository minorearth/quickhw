"use client";
import Image from "next/image";
import styles from "./page.module.css";
import { UploadFilesDialog } from "./fileupload.js";
import Camera from "./capture/[camera]/сamera/camera";
import { useEffect, useState } from "react";
import Manager from "./manager/page";
import { getUserName } from "./localstorage";
import Profile from "./components/profile";
import { useCredentials } from "./useCredentials";

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
