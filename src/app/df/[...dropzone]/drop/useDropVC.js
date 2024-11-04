import { useEffect } from "react";
import { useState } from "react";
import progress from "@/store/progress";
import snack from "@/store/snack";
import stn from "@/globals/constants";
import useDropVM from "./useDropVM";

const useDropVC = ({ surveyid, type, manager, surveytype }) => {
  const [files, setFiles] = useState([]);
  const [username, setUserName] = useState("");
  const [taskNumber, setTaskNumber] = useState("");
  const { sendFilesDB } = useDropVM();

  useEffect(() => {
    setInterval(() => setUserName(""), stn.files.NAME_CLEANUP_INTERVAL);
  }, []);

  const validateFields = () => {
    console.log(surveytype);
    switch (true) {
      case surveytype == "task":
        if (!files.length) {
          snack.showSnack(stn.msg.snack.PICK_FILES);
          return false;
        }
        if (!username) {
          snack.showSnack(stn.msg.snack.PICK_NAME);
          return false;
        }
        if (!taskNumber) {
          snack.showSnack("Введи номер варианта или теста");
          return false;
        }
        return true;
      case surveytype == "collection":
        if (!files.length) {
          snack.showSnack(stn.msg.snack.PICK_FILES);
          return false;
        }
        if (!username) {
          snack.showSnack(stn.msg.snack.PICK_NAME);
          return false;
        }
        return true;
      default:
        return false;
    }
  };

  const sendFiles = async () => {
    if (validateFields()) {
      progress.setShowProgress(true);
      await sendFilesDB({
        files,
        username,
        surveyid,
        type,
        manager,
        taskNumber,
      });
      progress.setShowProgress(false);
      snack.showSnack(stn.msg.snack.JOB_DONE);
    }
  };

  const changeName = (e) => {
    setUserName(e.target.value);
  };

  const changeTaskNumber = (e) => {
    setTaskNumber(e.target.value);
  };

  return {
    actions: { changeName, changeTaskNumber, sendFiles, setFiles },
    state: { name: username, tasknum: taskNumber, files },
  };
};

export default useDropVC;
