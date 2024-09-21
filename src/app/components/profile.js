"use client";
import * as React from "react";
import Button from "@mui/material/Button";
import Box from "@mui/material/Box";
import Stack from "@mui/material/Stack";
import TextField from "@mui/material/TextField";
import { useState, useEffect } from "react";

export default function Profile({ setAuth, setEditProfile, usertype }) {
  const [name, setName] = useState("");
  const [properVal, setProperVal] = useState(false);
  const [label, setLabel] = useState(false);

  useEffect(() => {
    setLabel(
      usertype == "manager" ? "Введите e-mail" : "Укажите Фамилию и имя"
    );
    const userName = localStorage.getItem("name");

    userName != null ? setProperVal(true) : setProperVal(false);
    userName != null ? setName(userName) : setName("");
  }, []);

  const saveToLocalStorage = () => {
    localStorage.setItem("name", name);
    setAuth(2);
    setEditProfile(false);
  };

  const changeName = (e) => {
    setName(e.target.value);
    e.target.value != "" ? setProperVal(true) : setProperVal(false);
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
        label={label}
        variant="outlined"
        sx={{ margin: "10px" }}
        onChange={(e) => changeName(e)}
        value={name}
      />
      <Button
        disabled={!properVal}
        size="large"
        onClick={() => saveToLocalStorage()}
      >
        Сохранить
      </Button>
    </Box>
  );
}
