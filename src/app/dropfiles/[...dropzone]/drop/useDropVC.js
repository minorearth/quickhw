import { useEffect } from "react";
import { useState } from "react";
import progress from "@/app/store/progress";
import snack from "@/app/store/snack";
import stn from "@/app/constants";
import useDropVM from "./useDropVM";

const useDropVC = ({ session, type }) => {
  const [files, setFiles] = useState([]);
  const [name, setName] = useState("");
  const { sendFilesDB } = useDropVM();

  useEffect(() => {
    setInterval(() => setName(""), stn.files.NAME_CLEANUP_INTERVAL);
  }, []);

  const sendFiles = async () => {
    if (files.length != 0 && name != "") {
      progress.setShowProgress(true);
      sendFilesDB({ files, name, session, type });
      progress.setShowProgress(false);
      snack.showSnack(stn.msg.JOB_DONE);
    } else {
      !files.length && snack.showSnack(stn.msg.PICK_FILES);
      !name && snack.showSnack(stn.msg.PICK_NAME);
    }
  };

  const changeName = (e) => {
    setName(e.target.value);
  };

  return {
    actions: { changeName, sendFiles, setFiles },
    state: { name, files },
  };
};

export default useDropVC;
