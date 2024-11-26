"use client";

import * as React from "react";
import Box from "@mui/material/Box";
import { Button } from "@mui/material";
import { useEffect } from "react";

import {
  removeSurveyClient,
  removeFileFromSurveyClient,
  setAllIndexedClient,
  createIndexspealout,
  сopyDocClient,
  backupClient,
} from "@/app/domain/domain";

import { setPersistence, browserLocalPersistence } from "firebase/auth";
import { auth } from "@/app/domain/firebaseapp.js";

import stn from "@/globals/settings";

import TextField from "@mui/material/TextField";

export default function Admin() {
  const migrate = () => {
    setAllIndexedClient(false);
  };

  const backup = () => {
    backupClient();
  };

  const removeSurveyASAP = () => {
    const usertodelete = document.getElementById("usertodelete").value;
    const surveytodelete = document.getElementById("surveytodelete").value;
    removeSurveyClient(surveytodelete, usertodelete);
  };

  const incIndex = () => {
    const usertodelete = document.getElementById("usertodelete").value;
    const slice = document.getElementById("IncIndex").value;
    createIndexspealout(usertodelete, slice);
  };

  const removeFileFromSurveyASAP = () => {
    const usertodelete = document.getElementById("usertodelete").value;
    const surveytodelete = document.getElementById("surveytodelete").value;
    const filename = document.getElementById("file").value;
    removeFileFromSurveyClient(usertodelete, surveytodelete, filename);
  };

  const сopyIndexASAP = () => {
    const oldindex = document.getElementById("index").value;
    const newindex = document.getElementById("newIndex").value;
    сopyDocClient(stn.collections.INDEX, oldindex, newindex);
  };

  return (
    <Box sx={{ width: "100%" }}>
      <Button sx={{ fontSize: 20 }} onClick={() => migrate()}>
        Проиндексировать заново
      </Button>

      <Box sx={{ display: "flex", flexDirection: "row" }}>
        <TextField
          id="usertodelete"
          label="Пользователь"
          defaultValue="3a5nHnKXJFTMM0eCooHqKefECTj1"
          sx={{ margin: "4px" }}
          fullWidth
          InputProps={{ sx: { borderRadius: 5 } }}
        />
      </Box>
      <TextField
        id="surveytodelete"
        label="Опрос"
        defaultValue=""
        sx={{ margin: "4px" }}
        fullWidth
        InputProps={{ sx: { borderRadius: 5 } }}
      />
      <TextField
        id="file"
        label="Файл"
        defaultValue=""
        sx={{ margin: "4px" }}
        fullWidth
        InputProps={{ sx: { borderRadius: 5 } }}
      />
      <TextField
        id="IncIndex"
        label="Увеличить индекс"
        defaultValue="100"
        sx={{ margin: "4px" }}
        fullWidth
        InputProps={{ sx: { borderRadius: 5 } }}
      />

      <Button sx={{ fontSize: 20 }} onClick={() => removeSurveyASAP()}>
        Удалить опрос
      </Button>
      <Button sx={{ fontSize: 20 }} onClick={() => removeFileFromSurveyASAP()}>
        Удалить файл
      </Button>
      <Button sx={{ fontSize: 20 }} onClick={() => incIndex()}>
        Увеличить индекс(тестирвоание)
      </Button>

      <Box sx={{ display: "flex", flexDirection: "row" }}>
        <TextField
          id="index"
          label="Старый индекс"
          defaultValue=""
          sx={{ margin: "4px" }}
          fullWidth
          InputProps={{ sx: { borderRadius: 5 } }}
        />
        <TextField
          id="newIndex"
          label="Новый индекс"
          defaultValue="100"
          sx={{ margin: "4px" }}
          fullWidth
          InputProps={{ sx: { borderRadius: 5 } }}
        />
        <Button sx={{ fontSize: 20 }} onClick={() => сopyIndexASAP()}>
          Копировать
        </Button>
      </Box>
      <Button sx={{ fontSize: 20 }} onClick={() => backup()}>
        Бэкап
      </Button>
    </Box>
  );
}
