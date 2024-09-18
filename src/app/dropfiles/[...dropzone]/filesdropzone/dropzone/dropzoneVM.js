import { useEffect } from "react";
import { useState } from "react";
import { UploadFileAndRefreshcollection } from "../../../../domain/utils";
import { mergeAllImages } from "../../../../utils/imageUtils";
import { compressFiles } from "../../../../utils/fileUtils";

const useDropZone = ({ session, type }) => {
  const [files, setFiles] = useState([]);
  const [snackopen, setSnackopen] = useState({ open: false, text: "" });
  const [showProgress, setShowProgress] = useState(false);
  const [progress, setProgress] = useState(0);
  const [name, setName] = useState("");

  useEffect(() => {
    setInterval(() => setName(""), 5 * 60 * 1000);
  }, []);

  const sendFiles = async () => {
    if (files.length != 0 && name != "") {
      setShowProgress(true);
      if (type == "img") {
        const file = await mergeAllImages(files, name, setProgress);
        UploadFileAndRefreshcollection(file, session, name, "img");
      } else {
        const fileZIP = await compressFiles(files, `${name}.zip`);
        UploadFileAndRefreshcollection(fileZIP, session, name, "zip");
      }
      setShowProgress(false);
      showSnack("Все OK! Молодец");
    } else {
      !files.length && showSnack("Ты хоть выбери что-нибудь :(");
      !name && showSnack("Ввведи свою фамилию, будь другом...");
    }
  };

  const showSnack = (text) => {
    setSnackopen({ open: true, text });
  };

  const changeName = (e) => {
    setName(e.target.value);
  };

  return {
    actions: { changeName, sendFiles, setFiles, setSnackopen },
    state: { snack: snackopen, name, progress, showProgress, files },
  };
};

export default useDropZone;
