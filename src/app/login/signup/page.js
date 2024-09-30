"use client";
import * as React from "react";
import Box from "@mui/material/Box";
import Button from "@mui/material/Button";

import FormControl from "@mui/material/FormControl";
import Link from "@mui/material/Link";
import TextField from "@mui/material/TextField";
import Typography from "@mui/material/Typography";
import { sendmail } from "../../data model/client actions/datamodel";
import { SignUpUser } from "../../data model/server actions/session";

export default function SignUp() {
  const [mode, setMode] = React.useState("light");
  const [emailError, setEmailError] = React.useState(false);
  const [emailErrorMessage, setEmailErrorMessage] = React.useState("");
  const [passwordError, setPasswordError] = React.useState(false);
  const [passwordErrorMessage, setPasswordErrorMessage] = React.useState("");
  const [nameError, setNameError] = React.useState(false);
  const [nameErrorMessage, setNameErrorMessage] = React.useState("");

  const handleRegister = async () => {
    const isValid = validateInputs();
    const email = document.getElementById("email").value;
    const password = document.getElementById("password").value;
    console.log("here", email, password, isValid);
    if (isValid) {
      const userC = await SignUpUser(email, password);
      console.log("userC", userC);
    }

    // const email = document.getElementById("email").value;
    // sendmail(email);
  };
  // This code only runs on the client side, to determine the system color preference
  React.useEffect(() => {
    // Check if there is a preferred mode in localStorage
    const savedMode = localStorage.getItem("themeMode");
    if (savedMode) {
      setMode(savedMode);
    } else {
      // If no preference is found, it uses system preference
      const systemPrefersDark = window.matchMedia(
        "(prefers-color-scheme: dark)"
      ).matches;
      setMode(systemPrefersDark ? "dark" : "light");
    }
  }, []);

  const validateInputs = () => {
    const email = document.getElementById("email");
    const password = document.getElementById("password");
    const name = document.getElementById("name");

    let isValid = true;

    if (!email.value || !/\S+@\S+\.\S+/.test(email.value)) {
      setEmailError(true);
      setEmailErrorMessage("Please enter a valid email address.");
      isValid = false;
    } else {
      setEmailError(false);
      setEmailErrorMessage("");
    }

    if (!password.value || password.value.length < 6) {
      setPasswordError(true);
      setPasswordErrorMessage("Password must be at least 6 characters long.");
      isValid = false;
    } else {
      setPasswordError(false);
      setPasswordErrorMessage("");
    }

    if (!name.value || name.value.length < 1) {
      setNameError(true);
      setNameErrorMessage("Name is required.");
      isValid = false;
    } else {
      setNameError(false);
      setNameErrorMessage("");
    }

    return isValid;
  };

  const handleSubmit = (event) => {
    event.preventDefault();
    const data = new FormData(event.currentTarget);
  };

  return (
    <Box
      component="form"
      onSubmit={handleSubmit}
      sx={{
        display: "flex",
        flexDirection: "column",
        gap: 2,
        mt: 1,
        width: "100%",
      }}
    >
      {/* <Typography
        component="h1"
        variant="h4"
        sx={{ width: "100%", fontSize: "clamp(2rem, 10vw, 2.15rem)" }}
      >
        Зарегистрироваться
      </Typography> */}
      <FormControl>
        <TextField
          autoComplete="name"
          name="name"
          label="Введите имя"
          required
          fullWidth
          id="name"
          // placeholder="Jon Snow"
          error={nameError}
          helperText={nameErrorMessage}
          color={nameError ? "error" : "primary"}
        />
      </FormControl>
      <FormControl>
        <TextField
          required
          fullWidth
          label="Введите email"
          defaultValue="dayfireacad@gmail.com"
          id="email"
          // placeholder="your@email.com"
          name="email"
          autoComplete="email"
          variant="outlined"
          error={emailError}
          helperText={emailErrorMessage}
          color={passwordError ? "error" : "primary"}
        />
      </FormControl>
      <FormControl>
        <TextField
          required
          fullWidth
          name="password"
          // placeholder="••••••"
          label="Пароль"
          type="password"
          id="password"
          autoComplete="new-password"
          variant="outlined"
          error={passwordError}
          helperText={passwordErrorMessage}
          color={passwordError ? "error" : "primary"}
        />
      </FormControl>

      <Button
        type="submit"
        fullWidth
        variant="contained"
        onClick={() => handleRegister()}
        // onClick={validateInputs}
      >
        СОЗДАТЬ АККАУНТ
      </Button>
      <Typography sx={{ textAlign: "center" }}>
        Уже есть аккаунт?{" "}
        <span>
          <Link href="/login" sx={{ alignSelf: "center" }}>
            Войти
          </Link>
        </span>
      </Typography>
    </Box>
  );
}