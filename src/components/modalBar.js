"use client";
import * as React from "react";
import Typography from "@mui/material/Typography";
import AppBar from "@mui/material/AppBar";
import Toolbar from "@mui/material/Toolbar";
import IconButton from "@mui/material/IconButton";
import { observer } from "mobx-react-lite";
import WestRoundedIcon from "@mui/icons-material/WestRounded";

const ModalBar = observer(({ closeAction, caption = "" }) => {
  const handleClose = () => {
    closeAction();
  };

  return (
    <AppBar
      position="static"
      sx={{
        boxShadow: "none",
        backgroundColor: "white",
        overflow: "hidden",
        borderRadius: "10px 10px 0px 0px",
        margin: "5px",
        width: "90%",
      }}
    >
      <Toolbar>
        <IconButton
          aria-label="delete"
          size="small"
          onClick={handleClose}
          sx={{ backgroundColor: "white" }}
        >
          <WestRoundedIcon sx={{ fontSize: 30 }} />
        </IconButton>
        <Typography sx={{ ml: 2, color: "#757575" }} variant="h6">
          {caption}
        </Typography>
      </Toolbar>
    </AppBar>
  );
});

export default ModalBar;
