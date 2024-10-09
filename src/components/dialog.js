import * as React from "react";
import Button from "@mui/material/Button";
import Dialog from "@mui/material/Dialog";
import DialogActions from "@mui/material/DialogActions";
import DialogContent from "@mui/material/DialogContent";
import DialogContentText from "@mui/material/DialogContentText";
import DialogTitle from "@mui/material/DialogTitle";
import { observer } from "mobx-react-lite";
import alertdialog from "@/store/dialog";

const AlertDialog = observer(() => {
  return (
    <Dialog
      open={alertdialog.dialogState.visible}
      // open={true}
      onClose={() => alertdialog.closeDialog()}
      aria-labelledby="alert-dialog-title"
      aria-describedby="alert-dialog-description"
    >
      <DialogTitle id="alert-dialog-title">
        {alertdialog.dialogState.title}
      </DialogTitle>
      <DialogContent>
        <DialogContentText id="alert-dialog-description">
          {alertdialog.dialogState.text}
        </DialogContentText>
      </DialogContent>
      <DialogActions>
        <Button onClick={() => alertdialog.closeDialog()} autoFocus>
          Понятно
        </Button>
      </DialogActions>
    </Dialog>
  );
});

export default AlertDialog;
