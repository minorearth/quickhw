"use client";
import "@/globals/globals.css";
import * as React from "react";
import Box from "@mui/material/Box";
import Typography from "@mui/material/Typography";
import AppBar from "@mui/material/AppBar";
import Toolbar from "@mui/material/Toolbar";
import IconButtonMUI from "@mui/material/IconButton";
import AccountCircle from "@mui/icons-material/AccountCircle";
import { useRouter } from "next/navigation";
import { observer } from "mobx-react-lite";
import HighlightOffIcon from "@mui/icons-material/HighlightOff";
import CancelSharpIcon from "@mui/icons-material/CancelSharp";
import CloseIcon from "@mui/icons-material/Close";
import { styled } from "@mui/material/styles";

const ModalBar = observer(({ closeAction }) => {
  const router = useRouter();

  const handleClose = () => {
    closeAction();
  };

  const IconButton = styled(IconButtonMUI)({
    "&.MuiIconButton-root:hover": {
      color: "white",
      backgroundColor: "#757575",
    },
  });

  return (
    // <AppBar position="static">
    <AppBar
      position="static"
      sx={{ boxShadow: "none", backgroundColor: "#FFAEBE" }}
    >
      <Toolbar>
        <IconButton
          aria-label="delete"
          size="small"
          onClick={handleClose}
          sx={{ backgroundColor: "white" }}
        >
          <CloseIcon sx={{ fontSize: 30 }} />
        </IconButton>
      </Toolbar>
    </AppBar>
  );
});

export default ModalBar;
