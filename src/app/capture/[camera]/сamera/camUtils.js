import { getImageDimensions, resizeWebCamImg } from "../../utils/imageUtils";

export const capturePhoto = async (webcamRef, orientation) => {
  const screen = await webcamRef.current.getScreenshot();
  var sDim = await getImageDimensions(screen);
  return await resizeWebCamImg(screen, orientation, sDim.w, sDim.h);
};
