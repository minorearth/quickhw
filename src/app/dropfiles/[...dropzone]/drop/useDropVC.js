import { useEffect } from "react";
import { useState } from "react";
import progress from "@/store/progress";
import snack from "@/store/snack";
import stn from "@/globals/constants";
import useDropVM from "./useDropVM";

const useDropVC = ({ surveyid, type, manager, surveyname }) => {
  const [files, setFiles] = useState([]);
  const [username, setUserName] = useState("");
  const { sendFilesDB } = useDropVM();

  useEffect(() => {
    setInterval(() => setUserName(""), stn.files.NAME_CLEANUP_INTERVAL);
  }, []);

  const sendFiles = async () => {
    if (files.length != 0 && username != "") {
      progress.setShowProgress(true);
      await sendFilesDB({
        files,
        username,
        surveyid,
        type,
        manager,
        surveyname,
      });
      progress.setShowProgress(false);
      snack.showSnack(stn.msg.snack.JOB_DONE);
    } else {
      !files.length && snack.showSnack(stn.msg.snack.PICK_FILES);
      !username && snack.showSnack(stn.msg.snack.PICK_NAME);
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
