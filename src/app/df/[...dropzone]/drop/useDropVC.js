import { useEffect } from "react";
import { useState } from "react";
import progress from "@/store/progress";
import snack from "@/store/snack";
import stn from "@/globals/constants";
import useDropVM from "./useDropVM";

const useDropVC = ({ surveyid, type, manager, surveytype, note }) => {
  const [files, setFiles] = useState([]);
  const [username, setUserName] = useState("");
  const [taskNumber, setTaskNumber] = useState("");
  const { sendFilesDB } = useDropVM();

  useEffect(() => {
    setInterval(() => setUserName(""), stn.files.NAME_CLEANUP_INTERVAL);
  }, []);

  const validateFields = () => {
    switch (true) {
      case surveytype == "task":
        if (!note && type == "text") {
          snack.showSnack("вбей любой текст");
          return false;
        }
        if (!files.length && type != "text") {
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
        if (!note && type == "text") {
          snack.showSnack("вбей любой текст");
          return false;
        }
        if (!files.length && type != "text") {
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

  const makeTextFile = () => {
    const file = new Blob([note], { type: "text/plain;charset=UTF-8" });
    return [file];
  };

  const sendFiles = async () => {
    if (validateFields()) {
      progress.setShowProgress(true);
      const filesToSend = type != "text" ? files : makeTextFile();
      await sendFilesDB({
        files: filesToSend,
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
