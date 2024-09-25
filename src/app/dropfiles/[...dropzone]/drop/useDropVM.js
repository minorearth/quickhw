import { mergeAllImages } from "../../../utils/imageUtils";
import { compressFiles } from "../../../utils/fileUtils";
import stn from "@/app/constants";
import { UploadFile } from "@/app/data model/server actions/storagedb";
import { updateDocFieldsInCollectionById } from "@/app/data model/server actions/datamodel";
import { fileToBuffer } from "@/app/utils/fileUtils";

const useDropVM = () => {
  const UploadFileAndRefreshcollection = async (
    file,
    session,
    filename,
    type,
    username
  ) => {
    const buffer = await fileToBuffer(file);
    const path = await UploadFile({
      buffer,
      filename,
      filetype: file.type,
      folder: session,
    });
    // const fileMeta = await getMetadata(fileDB);
    // const dateFormatted = formatDate(fileMeta.updated);
    var today = new Date();
    await updateDocFieldsInCollectionById("surveys", session, {
      [`files.${username}`]: {
        path,
        id: file.name,
        name: file.name,
        type,
        datetime: today,
      },
    });
  };

  const sendFilesDB = async ({ files, username, session, type }) => {
    const extension = type == stn.files.droptypes.IMAGES ? ".jpg" : ".zip";
    const filename = `${username}${extension}`;
    const file =
      type == stn.files.droptypes.IMAGES
        ? await mergeAllImages(files, filename)
        : await compressFiles(files, filename);
    console.log(file);
    UploadFileAndRefreshcollection(file, session, filename, type, username);
  };

  return {
    sendFilesDB,
  };
};

export default useDropVM;
