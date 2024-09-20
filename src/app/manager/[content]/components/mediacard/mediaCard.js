import React, { forwardRef, useCallback, useState } from "react";

import Box from "@mui/material/Box";
import { useEffect } from "react";
import { getImageDimensions, rotateImage } from "../../../../utils/imageUtils";
import useMeasure from "react-use-measure";
import FabAnimated from "../../../../components/fabAnimated/fabAnimated";
import { getDownloadURL } from "firebase/storage";
import { UploadFile } from "../../../../db/storagedb";
import Progress from "@/app/components/progress";
import Drawer from "./drawer/drawer";
import { useRef } from "react";
import useImage from "use-image";
import { UploadFileAndRefreshcollection } from "../../../../domain/utils";
const MediaCard = ({
  row,
  session,
  setRowsx,
  setCurrRow,
  setMediacardVisible,
}) => {
  const [imgDim, setImgDim] = useState({ w: 0, h: 0 });
  const [ref, bounds] = useMeasure();
  const [showProgress, setShowProgress] = useState(false);
  const [lines, setLines] = useState([]);

  const stageRef = useRef();

  const getusernameFromFileName = (filename) => {
    return filename.split(".").slice(-2)[0];
  };

  const handleSaveImage = async () => {
    const imageSrc = stageRef.current.toDataURL();
    const preBlob = await fetch(imageSrc);
    const blob = await preBlob.blob();
    const file = new File([blob], `${row.name}`, {
      type: blob.type,
    });
    const doc = await UploadFile({ file, folder: session });
    const path = await getDownloadURL(doc.ref);
    setRowsx((rows) => {
      rows.filter((srcrow) => srcrow.name == row.name)[0].path = path;
      return rows;
    });
  };

  useEffect(() => {
    getImageDimensions(row.path).then((sDim) => {
      setImgDim(sDim);
    });
    // setLines([]);
  }, [row]);

  return (
    <Box
      ref={ref}
      sx={{
        // backgroundColor: "red",
        minWidth: "30%",
        flex: 1,
        width: "100%",
        height: "100%",
        position: "relative",
      }}
      id="signInButton"
    >
      <FabAnimated
        icon="saveImage"
        visible={true}
        action={() => handleSaveImage()}
        position={{ top: 16, left: 16 }}
      />
      <FabAnimated
        icon="hideImage"
        visible={true}
        action={() => setMediacardVisible(false)}
        position={{ top: 16, left: 88 }}
      />
      <FabAnimated
        icon="undo"
        visible={true}
        action={() => {
          lines.splice(-1);
          setLines([...lines]);
        }}
        position={{ top: 16, left: 160 }}
      />
      <FabAnimated
        icon="rotate"
        visible={true}
        action={async () => {
          const file = await rotateImage(row.path, row.name);
          const doc = await UploadFile({ file, folder: session });
          const path = await getDownloadURL(doc.ref);
          setCurrRow({ ...row, path });
        }}
        position={{ top: 16, left: 232 }}
      />

      <Box
        ref={ref}
        sx={{
          flex: 1,
          width: "100%",
          height: "100%",
          overflow: "auto",
        }}
        id="signInButton"
      >
        <Progress open={showProgress} perc={0} />
        <Drawer
          lines={lines}
          setLines={setLines}
          bounds={bounds}
          imgDim={imgDim}
          stageRef={stageRef}
          path={row.path}
          setShowProgress={setShowProgress}
        />
      </Box>
    </Box>
  );
};

export default MediaCard;
