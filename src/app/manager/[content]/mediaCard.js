import * as React from "react";
import Image from "next/image";
import { Box } from "@mui/material";
// import { BlankElement } from "./blankCard";
import Drawer from "./drawer";

export const MediaCard = ({ row, session, setRowsx }) => {
  //   const img = "https://images.unsplash.com/photo-1525097487452-6278ff080c31";
  // return path != "" ? (

  return (
    <Box
      sx={{
        backgroundColor: "white",
        minWidth: "30%",
        height: "100%",
        flex: 1,
        display: "flex",
        justifyContent: "center",
        alignItems: "center",
      }}
    >
      {!!row && <Drawer row={row} session={session} setRowsx={setRowsx} />}
    </Box>
  );
  // )

  // : (
  //   <BlankElement />
  // );
};

// MediaCard.Menu = Menu;
