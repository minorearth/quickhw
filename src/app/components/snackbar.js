import Snackbar from "@mui/material/Snackbar";
import { useState } from "react";

import Slide from "@mui/material/Slide";

function SlideTransition(props) {
  return <Slide {...props} direction="up" />;
}

export const Snack = ({ snackopen, setSnackopen }) => {
  const handleClose = () => {
    setSnackopen({ open: false, text: "" });
  };

  return (
    <Snackbar
      open={snackopen.open}
      onClose={handleClose}
      TransitionComponent={SlideTransition}
      message={snackopen.text}
      key="snack"
      autoHideDuration={1000}
    />
  );
};
