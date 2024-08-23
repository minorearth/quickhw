"use client";
import Image from "next/image";
import styles from "./page.module.css";
import { UploadFilesDialog } from "./fileupload.js";
import Camera from "./capture/[capture]/camera";
import { useEffect, useState } from "react";
import Manager from "./manager/page";
import { getUserName } from "./localstorage";
import Profile from "./components/profile";

export default function Home() {
  const [orientation, setOrientation] = useState("");
  const [manager, setManager] = useState("loading");
  const [editProfile, setEditProfile] = useState(false);

  useEffect(() => {
    const userName = getUserName();
    userName != null ? setManager(userName) : setManager("none");

    function updateOrientation() {
      setOrientation(window.screen.orientation.type);
    }
    updateOrientation();
    window.addEventListener("orientationchange", updateOrientation);
    return () => {
      window.removeEventListener("orientationchange", updateOrientation);
    };
  }, [orientation]);

  switch (true) {
    case manager == "none" || editProfile == true:
      return (
        <Profile
          setuser={setManager}
          setEditProfile={setEditProfile}
          usertype="manager"
        />
      );
    case manager != "none" && manager != "loading" && editProfile != true:
      return <Manager user={manager} setEditProfile={setEditProfile} />;
    default:
  }
}
