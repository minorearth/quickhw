import { useState, useRef } from "react";
import { useEffect } from "react";
import { getImageDimensions } from "@/app/utils/imageUtils";
import useMeasure from "react-use-measure";
import progress from "@/app/store/progress";
import useMediaCardVM from "./mediaCardVM";

const useMediaCardVC = ({ currRow, surveyid, setRowsx, setCurrRow }) => {
  const [imgDim, setImgDim] = useState({ w: 0, h: 0 });

  const { rotateAndRefresh, saveImageDB } = useMediaCardVM();

  useEffect(() => {
    getImageDimensions(currRow.path).then((sDim) => {
      setImgDim(sDim);
    });
  }, [currRow]);

  const stageRef = useRef();
  const [boundsRef, bounds] = useMeasure();
  const [lines, setLines] = useState([]);

  const extractusername = (filename) => {
    return filename.slice(0, filename.lastIndexOf("."));
  };
  const rotate = async () => {
    progress.setShowProgress(true);
    const path = await rotateAndRefresh({
      imagePath: currRow.path,
      filename: currRow.name,
      surveyid,
    });
    console.log(path);
    setCurrRow({ ...currRow, path });
    progress.setShowProgress(false);
  };

  const saveImage = async () => {
    const imageBase64DataUrl = stageRef.current.toDataURL();
    const path = await saveImageDB({
      imageBase64DataUrl,
      filename: currRow.name,
      surveyid,
    });
    setRowsx((rows) => {
      rows.filter((srcrow) => srcrow.name == currRow.name)[0].path = path;
      return rows;
    });
  };

  const redo = () => {
    lines.splice(-1);
    setLines([...lines]);
  };

  return {
    actions: { rotate, saveImage, setLines, redo },
    state: { imgDim, lines, bounds },
    stageRef,
    boundsRef,
  };
};

export default useMediaCardVC;
