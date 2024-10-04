import { mergeAllImages } from "../../../utils/imageUtils";
import { compressFiles } from "../../../utils/fileUtils";
import stn from "@/app/constants";
import { UploadFile } from "@/app/data model/client actions/storagedb";
import { updateDocFieldsInCollectionById } from "@/app/data model/client actions/datamodel";
import { fileToBuffer } from "@/app/utils/fileUtils";

const useDropVM = () => {
  const UploadFileAndRefreshcollection = async (
    file,
    surveyid,
    filename,
    type,
    username
  ) => {
    // const buffer = await fileToBuffer(file);
    const path = await UploadFile({
      file,
      folder: surveyid,
    });
    // const fileMeta = await getMetadata(fileDB);
    // const dateFormatted = formatDate(fileMeta.updated);
    var today = new Date();
    await updateDocFieldsInCollectionById("surveysresults", surveyid, {
      [`files.${username}`]: {
        path,
        id: file.name,
        name: file.name,
        type,
        datetime: today,
      },
    });
  };

  const sendFilesDB = async ({ files, username, surveyid, type }) => {
    const extension = type == stn.files.droptypes.IMAGES ? ".jpg" : ".zip";
    const filename = `${username}${extension}`;
    const file =
      type == stn.files.droptypes.IMAGES
        ? await mergeAllImages(files, filename)
        : await compressFiles(files, filename);
    console.log(file);
    UploadFileAndRefreshcollection(file, surveyid, filename, type, username);
  };

  return {
    sendFilesDB,
  };
};

export default useDropVM;
