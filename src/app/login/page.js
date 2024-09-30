"use client";
import * as React from "react";
import Button from "@mui/material/Button";
import TextField from "@mui/material/TextField";
import FormControlLabel from "@mui/material/FormControlLabel";
import Checkbox from "@mui/material/Checkbox";
import Link from "@mui/material/Link";
import Box from "@mui/material/Box";
import Grid from "@mui/material/Grid";
import { useRouter } from "next/navigation";
import { signInTeacher, logout } from "../data model/server actions/session";
import Typography from "@mui/material/Typography";

export default function Page() {
  const router = useRouter();
  React.useEffect(() => {
    logout();
  }, []);

  const handleSubmit = async (event) => {
    event.preventDefault();
    const data = new FormData(event.currentTarget);
    const email = data.get("email");
    const password = data.get("password");

    const authNow = async (email, password) => {
      logout();
      const uid = await signInTeacher(email, password);
      router.push(`/manager/${uid}`);

      // try {
      //   const uid = await signInTeacher(email, password);
      //   console.log("here we go", uid);
      //   router.push(`/manager/${uid}`);
      // } catch (error) {
      //   console.log("auth error3");
      // }
    };
    await authNow(email, password);
  };

  return (
    // <React.Fragment>
    <>
      <Box component="form" noValidate onSubmit={handleSubmit} sx={{ mt: 1 }}>
        {/* <Typography component="h1" variant="h5">
          Sign in
        </Typography> */}
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
          defaultValue="123456"
        />
        <FormControlLabel
          control={<Checkbox value="remember" color="primary" />}
          label="Запомнить меня"
        />
        <Button
          type="submit"
          fullWidth
          variant="contained"
          sx={{ mt: 3, mb: 2 }}
        >
          Войти
        </Button>
        {/* <Button
          onClick={() => {}}
          fullWidth
          variant="contained"
          sx={{ mt: 3, mb: 2 }}
        >
          Отмена
        </Button> */}
        <Grid container>
          <Grid item xs>
            <Link href="#">Забыли пароль?</Link>
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
