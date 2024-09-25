"use client";
import * as React from "react";
import Button from "@mui/material/Button";
import Box from "@mui/material/Box";
import TextField from "@mui/material/TextField";
import { useState, useEffect } from "react";

export default function Profile({ setAuth, setProfileVisible, setUsername }) {
  const [value, setValue] = useState("");
  const [buttonDisabled, setDisabledButton] = useState(false);

  useEffect(() => {
    const userName = localStorage.getItem("name");
    userName != null ? setDisabledButton(true) : setDisabledButton(false);
    userName != null ? setValue(userName) : setValue("");
  }, []);

  const saveToLocalStorage = () => {
    setUsername(value);
    localStorage.setItem("name", value);
    setAuth(2);
    setProfileVisible(false);
  };

  const changeName = (e) => {
    setValue(e.target.value);
    e.target.value != "" ? setDisabledButton(true) : setDisabledButton(false);
  };

  return (
    <Box
      sx={{
        padding: "20px",
        width: "100%",
        height: "100%",
        display: "flex",
        flex: 1,
        flexDirection: "column",
        justifyContent: "center",
      }}
    >
      <TextField
        id="outlined-basic"
        label="Введите e-mail"
        variant="outlined"
        sx={{ margin: "10px" }}
        onChange={(e) => changeName(e)}
        value={value}
      />
      <Button
        disabled={!buttonDisabled}
        size="large"
        onClick={() => saveToLocalStorage()}
      >
        Сохранить
      </Button>
    </Box>
  );
}
