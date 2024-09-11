import * as React from "react";
import Image from "next/image";
import { Box } from "@mui/material";
// import { BlankElement } from "./blankCard";
import Drawer from "./drawer";
import Fab from "@mui/material/Fab";
import NavigationIcon from "@mui/icons-material/Navigation";
import { getDownloadURL } from "firebase/storage";
import { UploadFile } from "../../../../db/storagedb";
import SaveIcon from "@mui/icons-material/Save";
import HideImageIcon from "@mui/icons-material/HideImage";
import Progress from "@/app/components/progress";
import { useState } from "react";

export const MediaCard = ({ row, session, setRowsx, setMediacardVisible }) => {
  //   const img = "https://images.unsplash.com/photo-1525097487452-6278ff080c31";
  const [showProgress, setShowProgress] = useState(false);

  const stageRef = React.useRef(null);
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

  return (
    <Box
      sx={{
        backgroundColor: "white",
        minWidth: "30%",
        height: "100%",
        width: "100%",
        flex: 1,
        display: "flex",
        justifyContent: "center",
        alignItems: "center",
        position: "relative",
      }}
    >
      <Progress open={showProgress} perc={0} />
      <Fab
        sx={{ position: "absolute", top: 16, left: 16 }}
        // variant="extended"
        color="primary"
        onClick={() => handleSaveImage()}
      >
        <SaveIcon />
        {/* Сохранить */}
      </Fab>
      <Fab
        sx={{ position: "absolute", top: 16, left: 88 }}
        // variant="extended"
        color="primary"
        onClick={() => setMediacardVisible(false)}
      >
        <HideImageIcon />
        {/* Сохранить */}
      </Fab>
      {!!row && (
        <Drawer
          row={row}
          session={session}
          setRowsx={setRowsx}
          stageRef={stageRef}
          setShowProgress={setShowProgress}
        />
      )}
    </Box>
  );
  // )

  // : (
  //   <BlankElement />
  // );
};

// MediaCard.Menu = Menu;
