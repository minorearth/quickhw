import { mergeAllImages } from "../../../../globals/utils/imageUtils";
import { compressFiles } from "../../../../globals/utils/fileUtils";
import stn from "@/globals/constants";
import { UploadFileClient } from "@/app/data model/domain";
import { updateDocFieldsInCollectionByIdClient } from "@/app/data model/domain";
import { mimeExtension } from "@/globals/utils/fileUtils";

const useDropVM = () => {
  const UploadFileAndRefreshcollection = async ({
    file,
    surveyid,
    type,
    username,
    manager,
    taskNumber,
    // surveyname,
  }) => {
    const path = await UploadFileClient({
      file,
      folder: `${manager}/${surveyid}`,
    });
    // const fileMeta = await getMetadata(fileDB);
    // const dateFormatted = formatDate(fileMeta.updated);
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
    console.log("type", type);

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
        return renameFile(files[0], `${username}.${mimeExtension(files[0])}`);
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
