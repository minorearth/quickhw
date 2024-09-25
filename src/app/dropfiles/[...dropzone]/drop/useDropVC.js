import { useEffect } from "react";
import { useState } from "react";
import progress from "@/app/store/progress";
import snack from "@/app/store/snack";
import stn from "@/app/constants";
import useDropVM from "./useDropVM";

const useDropVC = ({ session, type }) => {
  const [files, setFiles] = useState([]);
  const [username, setUserName] = useState("");
  const { sendFilesDB } = useDropVM();

  useEffect(() => {
    setInterval(() => setUserName(""), stn.files.NAME_CLEANUP_INTERVAL);
  }, []);

  const sendFiles = async () => {
    if (files.length != 0 && username != "") {
      progress.setShowProgress(true);
      sendFilesDB({ files, username, session, type });
      progress.setShowProgress(false);
      snack.showSnack(stn.msg.JOB_DONE);
    } else {
      !files.length && snack.showSnack(stn.msg.PICK_FILES);
      !username && snack.showSnack(stn.msg.PICK_NAME);
    }
  };

  const changeName = (e) => {
    setUserName(e.target.value);
  };

  return {
    actions: { changeName, sendFiles, setFiles },
    state: { name: username, files },
  };
};

export default useDropVC;
