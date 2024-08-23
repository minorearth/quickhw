import * as React from "react";
import Image from "next/image";
import { Box } from "@mui/material";
// import { BlankElement } from "./blankCard";

export const MediaCard = ({ path }) => {
  //   const img = "https://images.unsplash.com/photo-1525097487452-6278ff080c31";
  // return path != "" ? (

  return (
    <Box
      sx={{
        backgroundColor: "white",
        flexGrow: 1,
        display: "flex",
        justifyContent: "center",
        alignItems: "center",
      }}
    >
      <Image
        src={path}
        width={5}
        height={5}
        // fill
        // width='auto'

        style={{
          // objectFit: "contain",
          width: "90%",
          height: "auto",
        }}
        sizes="(max-width: 768px) 100vw, 33vw"
        //   src={`${img}?w=248&fit=crop&auto=format`}
        alt="imagehw"
        //   loading="lazy"
      />
    </Box>
  );
  // )

  // : (
  //   <BlankElement />
  // );
};

// MediaCard.Menu = Menu;
