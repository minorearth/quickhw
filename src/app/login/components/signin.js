"use client";
import * as React from "react";
import Button from "@mui/material/Button";
import TextField from "@mui/material/TextField";
import Link from "./link";
import Box from "@mui/material/Box";
import Grid from "@mui/material/Grid";
import { useRouter } from "next/navigation";
import { logout } from "../../../server actions/session";
import { signInTeacherClient } from "@/app/domain/domain";
import Typography from "@mui/material/Typography";
import AlertDialog from "@/components/dialog";
import user from "@/store/user";
import Snack from "@/components/snackbar";
import { observer } from "mobx-react-lite";
import authenticationForm from "@/store/authentication";
import stn from "@/globals/settings";
import local from "@/globals/local";

const SignIn = observer(() => {
  const router = useRouter();
  const [dialogVisible, setDialogVisible] = React.useState(false);
  React.useEffect(() => {
    logout();
  }, []);

  const handleSubmit = async (event) => {
    event.preventDefault();
    const data = new FormData(event.currentTarget);
    const email = data.get("email");
    const password = data.get("password");

    const authNow = async (email, password) => {
      const uid = await signInTeacherClient(email, password);
      console.log(uid, email, password);
      user.setUserid(uid);
      if (uid == "notVerified") {
        setDialogVisible(true);
      } else {
        router.push(`/manager/${uid}`);
      }
    };
    authNow(email, password);
  };

  return (
    <>
      <Box component="form" noValidate onSubmit={handleSubmit} sx={{ mt: 1 }}>
        <AlertDialog />
        <Snack />
        <TextField
          margin="normal"
          required
          fullWidth
          id="email"
          label={local.ru.caption.AUTH_ENTER_EMAIL}
          name="email"
          autoComplete="email"
          autoFocus
          defaultValue="dayfireacad@gmail.com"
        />
        <TextField
          margin="normal"
          required
          fullWidth
          name="password"
          label={local.ru.caption.AUTH_ENTER_PSW}
          type="password"
          id="password"
          autoComplete="current-password"
          defaultValue="1234567"
        />
        <Button
          type="submit"
          fullWidth
          variant="contained"
          sx={{ mt: 3, mb: 2 }}
        >
          {local.ru.caption.AUTH_SIGNIN}
        </Button>
        <Grid container>
          <Grid item xs>
            <Link
              action={() => {
                authenticationForm.showResetPsw(
                  document.getElementById("email").value
                );
              }}
              title={local.ru.text.AUTH_FORGOT}
            />
          </Grid>
          <Grid item>
            <Typography sx={{ textAlign: "center" }}>
              {local.ru.text.AUTH_HAVE_NOACCOUNT + " "}
              <Link
                action={() => {
                  authenticationForm.showSignUp();
                }}
                title={local.ru.caption.AUTH_SIGNUP}
              />
            </Typography>
          </Grid>
        </Grid>
      </Box>
    </>
  );
});

export default SignIn;
