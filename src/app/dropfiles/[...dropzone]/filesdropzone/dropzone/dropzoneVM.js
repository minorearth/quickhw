import { useEffect } from "react";
import { useState } from "react";
import { UploadFileAndRefreshcollection } from "../../../../domain/utils";
import { mergeAllImages } from "../../../../utils/imageUtils";
import { compressFiles } from "../../../../utils/fileUtils";
import progress from "@/app/store/progress";
import snack from "@/app/store/snack";

const useDropZone = ({ session, type }) => {
  const [files, setFiles] = useState([]);
  const [name, setName] = useState("");

  useEffect(() => {
    setInterval(() => setName(""), 5 * 60 * 1000);
  }, []);

  const sendFiles = async () => {
    if (files.length != 0 && name != "") {
      progress.setShowProgress(true);
      if (type == "img") {
        const file = await mergeAllImages(files, name);
        UploadFileAndRefreshcollection(file, session, name, "img");
      } else {
        const file = await compressFiles(files, `${name}.zip`);
        UploadFileAndRefreshcollection(file, session, name, "zip");
      }
      progress.setShowProgress(false);
      snack.showSnack("Все OK! Молодец");
    } else {
      !files.length && snack.showSnack("Ты хоть выбери что-нибудь :(");
      !name && snack.showSnack("Ввведи свою фамилию, будь другом...");
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

export default useDropZone;
