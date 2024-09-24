import { rotateImage, Base64DataUrlToFile2 } from "@/app/utils/imageUtils";
import { getDownloadURL } from "firebase/storage";
import { UploadFile } from "@/app/data model/server actions/storagedb";
import { arrayBufferToBuffer, fileToBuffer } from "@/app/utils/fileUtils";

const useMediaCardVM = () => {
  const rotateAndRefresh = async ({ imagePath, name, session }) => {
    const file = await rotateImage(imagePath, name);
    const buffer = await fileToBuffer(file);
    const path = await UploadFile({
      buffer,
      name,
      type: file.type,
      folder: session,
    });
    return path;
  };

  const saveImageDB = async ({ imageBase64DataUrl, name, session }) => {
    const file = await Base64DataUrlToFile2(imageBase64DataUrl, name);
    const buffer = await fileToBuffer(file);
    const path = await UploadFile({
      buffer,
      name,
      type: file.type,
      folder: session,
    });
    return path;
  };

  return { rotateAndRefresh, saveImageDB };
};

export default useMediaCardVM;
