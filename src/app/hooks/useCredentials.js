import { getUserName } from "../data model/localstorage";
import { useState, useEffect } from "react";

export const useCredentials = () => {
  const [profileVisible, setProfileVisible] = useState(false);
  const [auth, setAuth] = useState(0);
  const [username, setUsername] = useState("");
  //0-loading
  //1-setUserName
  //2-accessed

  useEffect(() => {
    const userNameLS = getUserName();
    setUsername(userNameLS);
    switch (true) {
      case userNameLS == null:
        setAuth(1);
        return;
      case userNameLS != null:
        setAuth(2);
        return;
      default:
    }
  }, []);

  return {
    auth,
    profileVisible,
    setProfileVisible,
    setAuth,
    username,
    setUsername,
  };
};
