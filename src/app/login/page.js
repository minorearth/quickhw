"use client";
import * as React from "react";
import Button from "@mui/material/Button";
import TextField from "@mui/material/TextField";
import Link from "@mui/material/Link";
import Box from "@mui/material/Box";
import Grid from "@mui/material/Grid";
import { useRouter } from "next/navigation";
import { logout } from "../../server actions/session";
import { resetPsw } from "./authentication";
import { signInTeacher } from "./authentication";
import Typography from "@mui/material/Typography";
import AlertDialog from "@/components/dialog";
import user from "@/store/user";

export default function Page() {
  const router = useRouter();

  const [dialogVisible, setDialogVisible] = React.useState(false);

  React.useEffect(() => {
    logout();
  }, []);

  const handleForgetPswSubmit = () => {
    resetPsw(document.getElementById("email").value);
  };

  const handleSubmit = async (event) => {
    event.preventDefault();
    const data = new FormData(event.currentTarget);
    const email = data.get("email");
    const password = data.get("password");

    const authNow = async (email, password) => {
      await logout();
      const uid = await signInTeacher(email, password);
      user.setUserid(uid);
      if (uid == "notVerified") {
        setDialogVisible(true);
      } else router.push(`/manager/${uid}`);
    };
    authNow(email, password);
  };

  return (
    <>
      <Box component="form" noValidate onSubmit={handleSubmit} sx={{ mt: 1 }}>
        <AlertDialog
          dialogVisible={dialogVisible}
          setDialogVisible={setDialogVisible}
          action={() => {
            router.push(`/login`);
          }}
          message="Неверный логин или пароль"
        />
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
              onClick={() => {
                handleForgetPswSubmit();
              }}
              href="#"
            >
              Забыли пароль?
            </Link>
          </Grid>
          <Grid item>
            <Typography sx={{ textAlign: "center" }}>
              Нет аккаунта?{" "}
              <span>
                <Link href="/login/signup" sx={{ alignSelf: "center" }}>
                  Зарегистроваться
                </Link>
              </span>
            </Typography>
          </Grid>
        </Grid>
      </Box>
    </>
  );
}
