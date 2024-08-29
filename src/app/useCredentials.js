import { getUserName } from "./localstorage.js";
import { useState, useEffect } from "react";

export const useCredentials = () => {
  const [editProfile, setEditProfile] = useState(false);
  const [auth, setAuth] = useState(0);
  const [user, setUser] = useState("");
  //0-loading
  //1-setUserName
  //2-accessed

  useEffect(() => {
    const userName = getUserName();
    setUser(userName);
    switch (true) {
      case userName == null:
        setAuth(1);
        return;
      case userName != null:
        setAuth(2);
        return;
      default:
    }
  }, []);

  return { auth, editProfile, setEditProfile, setAuth, user };
};
