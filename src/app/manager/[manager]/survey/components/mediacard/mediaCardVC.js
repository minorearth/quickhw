import { useState, useRef } from "react";
import { useEffect } from "react";
import { getImageDimensions } from "@/globals/utils/imageUtils";
import useMeasure from "react-use-measure";
import progress from "@/store/progress";
import useMediaCardVM from "./mediaCardVM";
import { getAuth } from "firebase/auth";
import { app } from "../../../../../data model/client actions/firebaseapp";
import user from "@/store/user";

const useMediaCardVC = ({ currRow, surveyid, setRowsx, setCurrRow }) => {
  const [imgDim, setImgDim] = useState({ w: 0, h: 0 });
  const auth = getAuth(app);

  const { rotateAndRefresh, saveImageDB } = useMediaCardVM();

  useEffect(() => {
    getImageDimensions(currRow.path).then((sDim) => {
      setImgDim(sDim);
    });
  }, [currRow]);

  const stageRef = useRef();
  const [boundsRef, bounds] = useMeasure();
  const [lines, setLines] = useState([]);

  const rotate = async () => {
    progress.setShowProgress(true);
    const path = await rotateAndRefresh({
      imagePath: currRow.path,
      filename: currRow.name,
      surveyid,
      userid: user.userid,
    });
    setCurrRow({ ...currRow, path });
    progress.setShowProgress(false);
  };

  const saveImage = async () => {
    const imageBase64DataUrl = stageRef.current.toDataURL();
    const path = await saveImageDB({
      imageBase64DataUrl,
      filename: currRow.name,
      surveyid,
      userid: user.userid,
    });
    setRowsx((rows) => {
      rows.filter((srcrow) => srcrow.id == currRow.id)[0].path = path;
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
