"use client";
import * as React from "react";
import Box from "@mui/material/Box";
import Button from "@mui/material/Button";

import Link from "@mui/material/Link";
import Typography from "@mui/material/Typography";
import { sendmail } from "../../data model/client actions/datamodel";
import AlertDialog from "@/components/dialog";
import { useRouter } from "next/navigation";
import { resetPsw } from "../authentication";
import { observer } from "mobx-react-lite";
import alertdialog from "@/store/dialog";
import stn from "@/globals/constants";

const SignUp = observer(({ params }) => {
  const router = useRouter();
  const handleForgetPswSubmit = () => {
    resetPsw(params.reset);
    alertdialog.showDialog(
      stn.msg.alert.PSW_RECOVERY_TITLE,
      stn.msg.alert.PSW_RECOVERY_TEXT,
      () => {
        router.push(`/login`);
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
          <Link href="/login" sx={{ alignSelf: "center" }}>
            Войти
          </Link>
        </span>
      </Typography>
    </Box>
  );
});

export default SignUp;
