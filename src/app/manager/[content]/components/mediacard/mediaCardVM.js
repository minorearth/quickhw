import React, { useState, useRef } from "react";
import { useEffect } from "react";
import { getImageDimensions, rotateImage } from "../../../../utils/imageUtils";
import useMeasure from "react-use-measure";
import { getDownloadURL } from "firebase/storage";
import { UploadFile } from "../../../../db/storagedb";
import { Base64DataUrlToFile2 } from "../../../../utils/imageUtils";
import progress from "@/app/store/progress";
export const useMediaCard = ({ row, session, setRowsx, setCurrRow }) => {
  const [imgDim, setImgDim] = useState({ w: 0, h: 0 });

  useEffect(() => {
    getImageDimensions(row.path).then((sDim) => {
      setImgDim(sDim);
    });
  }, [row]);

  const stageRef = useRef();
  const [boundsRef, bounds] = useMeasure();
  const [lines, setLines] = useState([]);

  const rotate = async () => {
    progress.setShowProgress(true);
    const file = await rotateImage(row.path, row.name);
    const doc = await UploadFile({ file, folder: session });
    const path = await getDownloadURL(doc.ref);
    setCurrRow({ ...row, path });
    progress.setShowProgress(false);
  };

  const saveImage = async () => {
    const imageBase64DataUrl = stageRef.current.toDataURL();
    const file = await Base64DataUrlToFile2(imageBase64DataUrl, row.name);
    const doc = await UploadFile({ file, folder: session });
    const path = await getDownloadURL(doc.ref);
    setRowsx((rows) => {
      rows.filter((srcrow) => srcrow.name == row.name)[0].path = path;
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
