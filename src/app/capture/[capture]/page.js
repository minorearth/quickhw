"use client";

import Camera from "./camera.js";
import { useEffect, useState } from "react";
import Profile from "../../components/profile.js";
import { getUserName } from "../../localstorage.js";

export default function Home({ params }) {
  const [manager, setManager] = useState("loading");
  const [editProfile, setEditProfile] = useState(false);

  useEffect(() => {
    const userName = getUserName();
    userName != null ? setManager(userName) : setManager("none");
  }, []);

  switch (true) {
    case manager == "none" || editProfile == true:
      return (
        <Profile
          setuser={setManager}
          setEditProfile={setEditProfile}
          usertype="user"
        />
      );
    case manager != "none" && manager != "loading" && editProfile != true:
      return (
        <Camera session={params.capture} setEditProfile={setEditProfile} />
      );
    default:
  }
}
