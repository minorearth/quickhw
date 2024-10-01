import * as React from "react";
import Button from "@mui/material/Button";
import Dialog from "@mui/material/Dialog";
import DialogActions from "@mui/material/DialogActions";
import DialogContent from "@mui/material/DialogContent";
import DialogContentText from "@mui/material/DialogContentText";
import DialogTitle from "@mui/material/DialogTitle";

export default function AlertDialog({
  dialogVisible,
  setDialogVisible,
  action,
}) {
  const handleClose = () => {
    setDialogVisible(false);
    action();
  };

  return (
    <Dialog
      open={dialogVisible}
      onClose={handleClose}
      aria-labelledby="alert-dialog-title"
      aria-describedby="alert-dialog-description"
    >
      <DialogTitle id="alert-dialog-title">
        {"Ваш аккаунт успешно создан"}
      </DialogTitle>
      <DialogContent>
        <DialogContentText id="alert-dialog-description">
          Ваш аккаунт успешно создан. Чтобы активировать его необходимо...
        </DialogContentText>
      </DialogContent>
      <DialogActions>
        <Button onClick={handleClose} autoFocus>
          Понятно
        </Button>
      </DialogActions>
    </Dialog>
  );
}
