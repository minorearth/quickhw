"use client";
import * as React from "react";
import Box from "@mui/material/Box";
import Button from "@mui/material/Button";

import FormControl from "@mui/material/FormControl";
import Link from "@mui/material/Link";
import TextField from "@mui/material/TextField";
import Typography from "@mui/material/Typography";
import { SignUpUserClient } from "@/app/domain/domain";
import AlertDialog from "@/components/dialog";
import { useRouter } from "next/navigation";
import dialog from "@/store/dialog";
import stn from "@/globals/constants";
import authenticationForm from "@/store/authentication";

const SignUp = () => {
  const [emailError, setEmailError] = React.useState(false);
  const [emailErrorMessage, setEmailErrorMessage] = React.useState("");
  const [passwordError, setPasswordError] = React.useState(false);
  const [passwordErrorMessage, setPasswordErrorMessage] = React.useState("");
  const [nameError, setNameError] = React.useState(false);
  const [nameErrorMessage, setNameErrorMessage] = React.useState("");
  const [companyError, setCompanyError] = React.useState(false);
  const [companyErrorMessage, setCompanyErrorMessage] = React.useState("");
  const router = useRouter();

  const handleRegister = async () => {
    const email = document.getElementById("email").value;
    const password = document.getElementById("password").value;
    const name = document.getElementById("name").value;
    const company = document.getElementById("company").value;
    const isValid = validateInputs(email, password, name, company);

    if (isValid) {
      const userC = await SignUpUserClient(email, password, name, company);
      dialog.showDialog(
        stn.msg.alert.PSW_ACOUNT_CREATED_TITLE,
        stn.msg.alert.PSW_ACOUNT_CREATED_TEXT,
        () => {
          authenticationForm.showSignIn();
        }
      );
    }
  };

  const validateInputs = (email, password, name, company) => {
    let isValid = true;

    if (!email || !/\S+@\S+\.\S+/.test(email)) {
      setEmailError(true);
      setEmailErrorMessage("Please enter a valid email address.");
      isValid = false;
    } else {
      setEmailError(false);
      setEmailErrorMessage("");
    }

    if (!password || password.length < 6) {
      setPasswordError(true);
      setPasswordErrorMessage("Password must be at least 6 characters long.");
      isValid = false;
    } else {
      setPasswordError(false);
      setPasswordErrorMessage("");
    }

    if (!name || name.length < 1) {
      setNameError(true);
      setNameErrorMessage("Name is required.");
      isValid = false;
    } else {
      setNameError(false);
      setNameErrorMessage("");
    }

    if (!company || company.length < 1) {
      setCompanyError(true);
      setCompanyErrorMessage("Company is required.");
      isValid = false;
    } else {
      setCompanyError(false);
      setCompanyErrorMessage("");
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
      <AlertDialog />
      <FormControl>
        <TextField
          autoComplete="name"
          name="name"
          label="Введите имя"
          defaultValue="Roman"
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
          autoComplete="Организация"
          name="company"
          label="Введите организацию"
          defaultValue="Roman"
          required
          fullWidth
          id="company"
          // placeholder=""
          error={companyError}
          helperText={companyErrorMessage}
          color={companyError ? "error" : "primary"}
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
          defaultValue="1234567"
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
        <Link
          style={{ cursor: "pointer" }}
          onClick={() => {
            authenticationForm.showSignIn();
          }}
          sx={{ alignSelf: "center" }}
        >
          Войти
        </Link>
      </Typography>
    </Box>
  );
};

export default SignUp;
