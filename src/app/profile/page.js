"use client";
import * as React from "react";
import Button from "@mui/material/Button";
import Box from "@mui/material/Box";
import Stack from "@mui/material/Stack";
import TextField from "@mui/material/TextField";
import { useState, useEffect } from "react";

export default function Profile({ rows, columns, addrow }) {
  const [name, setName] = useState("");

  useEffect(() => {
    const userName = localStorage.getItem("name");
    setName(userName);
  }, []);

  const saveToLocalStorage = () => {
    localStorage.setItem("name", name);
  };

  const changeName = (e) => {
    setName(e.target.value);
  };

  return (
    <Box sx={{ width: "100%", display: "flex", flexDirection: "column" }}>
      <TextField
        id="outlined-basic"
        label="Укажите Фамилию и имя"
        variant="outlined"
        sx={{ margin: "10px" }}
        onChange={(e) => changeName(e)}
        value={name}
      />
      <Button size="large" onClick={() => saveToLocalStorage()}>
        Сохранить
      </Button>
    </Box>
  );
}
