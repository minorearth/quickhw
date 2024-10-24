import { rotateImage, Base64DataUrlToFile2 } from "@/globals/utils/imageUtils";
import { UploadFile } from "@/app/data model/client actions/storagedb";

const useMediaCardVM = () => {
  const rotateAndRefresh = async ({
    imagePath,
    filename,
    surveyid,
    userid,
  }) => {
    const file = await rotateImage(imagePath, filename);
    // const buffer = await fileToBuffer(file);
    const path = await UploadFile({
      file,
      folder: `${userid}/${surveyid}`,
    });
    return path;
  };

  const saveImageDB = async ({
    imageBase64DataUrl,
    filename,
    surveyid,
    userid,
  }) => {
    const file = await Base64DataUrlToFile2(imageBase64DataUrl, filename);
    // const buffer = await fileToBuffer(file);
    const path = await UploadFile({
      file,
      folder: `${userid}/${surveyid}`,
    });
    return path;
  };

  return { rotateAndRefresh, saveImageDB };
};

export default useMediaCardVM;
