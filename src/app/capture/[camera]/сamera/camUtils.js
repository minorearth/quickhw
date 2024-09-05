import { getImageDimensions, resizeWebCamImg } from "../../utils/imageUtils";

export const capturePhoto = async (webcamRef, orientation) => {
  const base64Str = await webcamRef.current.getScreenshot();
  var sDim = await getImageDimensions(base64Str);
  return await resizeWebCamImg(base64Str, orientation, sDim.w, sDim.h);
};
