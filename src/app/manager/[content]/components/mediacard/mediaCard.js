import React from "react";
import Box from "@mui/material/Box";
import FabAnimated from "@/app/components/fabAnimated/fabAnimated";
import Drawer from "./drawer/drawer";
import { useMediaCard } from "./mediaCardVM";
const MediaCard = ({
  row,
  session,
  setRowsx,
  setCurrRow,
  setMediacardVisible,
}) => {
  const { actions, state, stageRef, boundsRef } = useMediaCard({
    row,
    session,
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
      <FabAnimated
        icon="saveImage"
        visible={true}
        action={() => actions.saveImage()}
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
        action={() => actions.redo()}
        position={{ top: 16, left: 160 }}
      />
      <FabAnimated
        icon="rotate"
        visible={true}
        action={() => actions.rotate()}
        position={{ top: 16, left: 232 }}
      />
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
          path={row.path}
        />
      </Box>
    </Box>
  );
};
export default MediaCard;
