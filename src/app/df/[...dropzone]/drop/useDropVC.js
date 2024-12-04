import { useEffect } from "react";
import { useState } from "react";
import progress from "@/store/progress";
import snack from "@/store/snack";
import stn from "@/globals/settings";
import local from "@/globals/local";
import useDropVM from "./useDropVM";
import { getKeyBySubKeyValue } from "@/globals/utils/objectUtils";

const useDropVC = ({ surveyid, manager, typeEncoded, setCongratVisible }) => {
  const [files, setFiles] = useState([]);
  const [username, setUserName] = useState("");
  const [taskNumber, setTaskNumber] = useState("");
  const [surveytype, setSurveytype] = useState(
    stn.surveys.surveytypes.task.name
  );
  const [fileType, setFileType] = useState(stn.surveys.filetypes.img.name);
  const [note, setNote] = useState("");

  const { sendFilesDB } = useDropVM();

  useEffect(() => {
    setInterval(() => setUserName(""), stn.files.NAME_CLEANUP_INTERVAL);
    setSurveytype(
      getKeyBySubKeyValue(stn.surveys.surveytypes, "SHORTNAME", typeEncoded[1])
    );
    setFileType(
      getKeyBySubKeyValue(stn.surveys.filetypes, "SHORTNAME", typeEncoded[0])
    );
  }, []);

  const validateFields = () => {
    switch (true) {
      case surveytype == stn.surveys.surveytypes.task.name:
        if (!note && fileType == stn.surveys.filetypes.text.name) {
          snack.showSnack(local.ru.msg.snack.INPUT_TEXT);
          return false;
        }
        if (!files.length && fileType != stn.surveys.filetypes.text.name) {
          snack.showSnack(local.ru.msg.snack.PICK_FILES);
          return false;
        }
        if (!username) {
          snack.showSnack(local.ru.msg.snack.PICK_NAME);
          return false;
        }
        if (!taskNumber) {
          snack.showSnack(local.ru.msg.snack.PICK_TASKID);
          return false;
        }
        return true;

      case surveytype == stn.surveys.surveytypes.collection.name:
        if (!note && fileType == stn.surveys.filetypes.text.name) {
          snack.showSnack(local.ru.msg.snack.INPUT_TEXT);
          return false;
        }
        if (!files.length && fileType != stn.surveys.filetypes.text.name) {
          snack.showSnack(local.ru.msg.snack.PICK_FILES);
          return false;
        }
        if (!username) {
          snack.showSnack(local.ru.msg.snack.PICK_NAME);
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
      const filesToSend =
        fileType != stn.surveys.filetypes.text.name ? files : makeTextFile();
      await sendFilesDB({
        files: filesToSend,
        username,
        surveyid,
        type: fileType,
        manager,
        taskNumber,
      });
      progress.setShowProgress(false);
      setCongratVisible(true);
      // snack.showSnack(local.ru.msg.snack.JOB_DONE);
    }
  };

  const changeName = (e) => {
    setUserName(e.target.value);
  };

  const changeTaskNumber = (e) => {
    setTaskNumber(e.target.value);
  };

  return {
    actions: {
      changeName,
      changeTaskNumber,
      sendFiles,
      setFiles,
      saveNote: setNote,
    },
    state: { name: username, tasknum: taskNumber, files, surveytype, fileType },
  };
};

export default useDropVC;
