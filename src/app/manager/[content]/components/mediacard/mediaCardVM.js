import { rotateImage, Base64DataUrlToFile2 } from "@/app/utils/imageUtils";
import { UploadFile } from "@/app/data model/server actions/storagedb";
import { fileToBuffer } from "@/app/utils/fileUtils";

const useMediaCardVM = () => {
  const rotateAndRefresh = async ({ imagePath, filename, session }) => {
    const file = await rotateImage(imagePath, filename);
    const buffer = await fileToBuffer(file);
    const path = await UploadFile({
      buffer,
      filename,
      filetype: file.type,
      folder: session,
    });
    return path;
  };

  const saveImageDB = async ({ imageBase64DataUrl, filename, session }) => {
    const file = await Base64DataUrlToFile2(imageBase64DataUrl, filename);
    const buffer = await fileToBuffer(file);
    const path = await UploadFile({
      buffer,
      filename,
      filetype: file.type,
      folder: session,
    });
    return path;
  };

  return { rotateAndRefresh, saveImageDB };
};

export default useMediaCardVM;
