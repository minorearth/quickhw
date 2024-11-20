import React from "react";
import Box from "@mui/material/Box";
import Drawer from "./drawer/drawer";
import useMediaCardVC from "./mediaCardVC";
import Floatmenu from "./floatmenu";
const MediaCard = ({
  currRow,
  surveyid,
  setRowsx,
  setCurrRow,
  setMediacardVisible,
}) => {
  const { actions, state, stageRef, boundsRef } = useMediaCardVC({
    currRow,
    surveyid,
    setRowsx,
    setCurrRow,
  });

  return (
    <Box
      ref={boundsRef}
      sx={{
        minWidth: "30%",
        flex: 1,
        width: "100%",
        height: "100%",
        position: "relative",
      }}
      id="signInButton"
    >
      <Floatmenu actions={{ ...actions, setMediacardVisible }} />
      <Box
        sx={{
          flex: 1,
          width: "100%",
          height: "100%",
          overflow: "auto",
        }}
        id="signInButton"
      >
        <Drawer
          lines={state.lines}
          setLines={actions.setLines}
          bounds={state.bounds}
          imgDim={state.imgDim}
          stageRef={stageRef}
          path={currRow.path}
        />
      </Box>
    </Box>
  );
};
export default MediaCard;
