import { mergeAllImages } from "../../../utils/imageUtils";
import { compressFiles } from "../../../utils/fileUtils";
import stn from "@/app/constants";
import { UploadFile } from "@/app/data model/client actions/storagedb";
import { updateDocFieldsInCollectionById } from "@/app/data model/client actions/datamodel";
import { fileToBuffer } from "@/app/utils/fileUtils";
import { addDataToIndex } from "@/app/admin/adminVC";

const useDropVM = () => {
  const UploadFileAndRefreshcollection = async (
    file,
    surveyid,
    filename,
    type,
    username,
    manager,
    surveyname
  ) => {
    // const buffer = await fileToBuffer(file);
    const path = await UploadFile({
      file,
      folder: `${manager}/${surveyid}`,
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

    await addDataToIndex(manager, username.toUpperCase(), {
      path,
      id: file.name,
      name: file.name,
      type,
      datetime: today,
      surveyid,
      surveyname: decodeURI(surveyname),
      username,
    });
  };

  const sendFilesDB = async ({
    files,
    username,
    surveyid,
    type,
    manager,
    surveyname,
  }) => {
    const extension = type == stn.files.droptypes.IMAGES ? ".jpg" : ".zip";
    const filename = `${username}${extension}`;
    const file =
      type == stn.files.droptypes.IMAGES
        ? await mergeAllImages(files, filename)
        : await compressFiles(files, filename);
    console.log(file);
    UploadFileAndRefreshcollection(
      file,
      surveyid,
      filename,
      type,
      username,
      manager,
      surveyname
    );
  };

  return {
    sendFilesDB,
  };
};

export default useDropVM;
