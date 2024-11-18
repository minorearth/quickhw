"use client";
import * as React from "react";
import Button from "@mui/material/Button";
import TextField from "@mui/material/TextField";
import Link from "@mui/material/Link";
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
          label="Введите email"
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
          label="Введите пароль"
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
          Войти
        </Button>
        <Grid container>
          <Grid item xs>
            <Link
              style={{ cursor: "pointer" }}
              onClick={() => {
                authenticationForm.showResetPsw(
                  document.getElementById("email").value
                );
              }}
              sx={{ alignSelf: "center" }}
            >
              Забыли пароль?
            </Link>

            {/* <Link
              style={{ cursor: "pointer" }}
              onClick={() =>
                router.push(`/login/${document.getElementById("email").value}`)
              }
            >
              Забыли пароль?
            </Link> */}
          </Grid>
          <Grid item>
            <Typography sx={{ textAlign: "center" }}>
              Нет аккаунта?{" "}
              <span>
                {/* <Link href="/login/signup" sx={{ alignSelf: "center" }}>
                  Зарегистрироваться
                </Link> */}

                <Link
                  style={{ cursor: "pointer" }}
                  onClick={() => {
                    authenticationForm.showSignUp();
                  }}
                  sx={{ alignSelf: "center" }}
                >
                  Зарегистрироваться2
                </Link>
              </span>
            </Typography>
          </Grid>
        </Grid>
      </Box>
    </>
  );
});

export default SignIn;
