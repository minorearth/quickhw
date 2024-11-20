import { mergeAllImages } from "../../../../globals/utils/imageUtils";
import { compressFiles } from "../../../../globals/utils/fileUtils";
import stn from "@/globals/settings";
import local from "@/globals/local";
import { UploadFileClient } from "@/app/domain/domain";
import { updateDocFieldsInCollectionByIdClient } from "@/app/domain/domain";
import { fileExtension } from "@/globals/utils/fileUtils";

const useDropVM = () => {
  const UploadFileAndRefreshcollection = async ({
    file,
    surveyid,
    type,
    username,
    manager,
    taskNumber,
  }) => {
    const path = await UploadFileClient({
      file,
      folder: `${manager}/${surveyid}`,
    });
    var today = new Date();
    await updateDocFieldsInCollectionByIdClient("surveysresults", surveyid, {
      [`files.${username}`]: {
        path,
        id: file.name,
        name: file.name,
        type,
        datetime: today,
        tasknumber: taskNumber,
      },
      indexed: false,
    });

    // await addDataToIndex(manager, username.toUpperCase(), {
    //   path,
    //   id: file.name,
    //   name: file.name,
    //   type,
    //   datetime: today,
    //   surveyid,
    //   surveyname,
    //   username,
    // });
  };

  const getFile = async (type, files, username) => {
    const extension = stn.surveys.filetypes[type].save_ext;

    switch (true) {
      case type == "img":
        return await mergeAllImages(files, `${username}${extension}`);
      case type == "zip":
        return await compressFiles(files, `${username}${extension}`);
      case type == "text":
        return new File([files[0]], `${username}${extension}`, {
          type: files[0].type,
          // lastModified: originalFile.lastModified,
        });
      case type == "anyfile":
        function renameFile(originalFile, newName) {
          return new File([originalFile], newName, {
            type: originalFile.type,
            // lastModified: originalFile.lastModified,
          });
        }
        const ext = fileExtension(files[0]);
        return renameFile(files[0], `${username}.${ext}`);
      default:
        return undefined;
    }
  };

  const sendFilesDB = async ({
    files,
    username,
    surveyid,
    type,
    manager,
    taskNumber,
  }) => {
    const file = await getFile(type, files, username);
    await UploadFileAndRefreshcollection({
      file,
      surveyid,
      type,
      username,
      manager,
      taskNumber,
    });
  };

  return {
    sendFilesDB,
  };
};

export default useDropVM;
