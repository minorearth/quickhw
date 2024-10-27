"use client";

import * as React from "react";
import Box from "@mui/material/Box";
import { Button } from "@mui/material";
import {
  removeSurvey,
  removeFileFromSurvey,
  createIndex2,
  createIndex,
  createIndexspealout,
  searchInIndex,
  setAllIndexed,
} from "./adminVC";
import TextField from "@mui/material/TextField";

export default function SurveyGrid() {
  const migrate = () => {
    // searchInIndex("3a5nHnKXJFTMM0eCooHqKefECTj1", "Девяткин");
    // copyAllDocs();
    // setAllIndexed(true);
    createIndex("3a5nHnKXJFTMM0eCooHqKefECTj1");
    // createIndexspealout("3a5nHnKXJFTMM0eCooHqKefECTj1");
    // migrateAllfiles('253TkIzjr2IKgj8U81Bz');
  };

  const removeSurveyASAP = () => {
    const usertodelete = document.getElementById("usertodelete").value;
    const surveytodelete = document.getElementById("surveytodelete").value;
    removeSurvey(surveytodelete, usertodelete);
  };

  const removeFileFromSurveyASAP = () => {
    const usertodelete = document.getElementById("usertodelete").value;
    const surveytodelete = document.getElementById("surveytodelete").value;
    const filename = document.getElementById("file").value;
    removeFileFromSurvey(usertodelete, surveytodelete, filename);
  };

  return (
    <Box sx={{ width: "100%" }}>
      <Button sx={{ fontSize: 20 }} onClick={() => migrate()}>
        Мигрировать
      </Button>
      <TextField
        id="usertodelete"
        label="Пользователь"
        defaultValue="3a5nHnKXJFTMM0eCooHqKefECTj1"
        sx={{ margin: "4px" }}
        fullWidth
        InputProps={{ sx: { borderRadius: 5 } }}
      />
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

      <Button sx={{ fontSize: 20 }} onClick={() => removeSurveyASAP()}>
        Удалить опрос
      </Button>
      <Button sx={{ fontSize: 20 }} onClick={() => removeFileFromSurveyASAP()}>
        Удалить файл
      </Button>
    </Box>
  );
}
