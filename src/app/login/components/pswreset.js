"use client";
import * as React from "react";
import Box from "@mui/material/Box";
import Button from "@mui/material/Button";

import Link from "@mui/material/Link";
import Typography from "@mui/material/Typography";
import AlertDialog from "@/components/dialog";
import { useRouter } from "next/navigation";
import { resetPswClient } from "@/app/domain/domain";
import { observer } from "mobx-react-lite";
import alertdialog from "@/store/dialog";
import stn from "@/globals/constants";
import authenticationForm from "@/store/authentication";

const PswReset = observer(() => {
  const router = useRouter();
  const handleForgetPswSubmit = () => {
    resetPswClient(authenticationForm.email);
    alertdialog.showDialog(
      stn.msg.alert.PSW_RECOVERY_TITLE,
      stn.msg.alert.PSW_RECOVERY_TEXT,
      () => {
        authenticationForm.showSignIn();
      }
    );
  };

  return (
    <Box
      sx={{
        display: "flex",
        flexDirection: "column",
        gap: 2,
        mt: 1,
        width: "100%",
      }}
    >
      <AlertDialog />

      <Button
        fullWidth
        variant="contained"
        onClick={() => {
          handleForgetPswSubmit();
        }}
        // onClick={validateInputs}
      >
        ВОССТАНОВИТЬ ПАРОЛЬ
      </Button>
      <Typography sx={{ textAlign: "center" }}>
        Вспомнил!{" "}
        <span>
          <Link
            style={{ cursor: "pointer" }}
            onClick={() => {
              authenticationForm.showSignIn();
            }}
            sx={{ alignSelf: "center" }}
          >
            Войти
          </Link>
        </span>
      </Typography>
    </Box>
  );
});

export default PswReset;
