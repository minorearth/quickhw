import * as React from "react";
import Image from "next/image";
import { Box } from "@mui/material";
// import { BlankElement } from "./blankCard";

export const MediaCard = ({
  path = "https://png.pngtree.com/thumb_back/fw800/background/20230612/pngtree-images-of-winter-and-white-background-wallpapers-free-download-image_2935697.jpg",
}) => {
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
          width: "40%",
          height: "auto",
        }}
        sizes="(max-width: 768px) 100vw, 33vw"
        //   src={`${img}?w=248&fit=crop&auto=format`}
        alt="rfhnbyrj"
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
