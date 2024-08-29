import React, { useEffect, useRef } from "react";
import { UploadFileToTask } from "../../../storagedb";
import Box from "@mui/material/Box";
import { useState } from "react";
import IconButton from "@mui/material/IconButton";
import IosShareIcon from "@mui/icons-material/IosShare";
import SettingsIcon from "@mui/icons-material/Settings";
import { Snack } from "../../components/snackbar";
import { getImgCnt, getUserName } from "../../localstorage";
import { useOrientation } from "../../useOrientaton";

import Progress from "@/app/components/backdrop";
import Drop from "./drop";
import { extractFileExtension } from "../utils";

const sendFile = async (file, session) => {
  const username = getUserName();
  const fileid = getImgCnt();
  const ext = extractFileExtension(file.name);
  const filename = `${username}${fileid}.${ext}`;
  console.log("filename", session);
  const myFile = new File([file], filename);
  // const file = await b64URItoFile(b64URI, filename);
  await UploadFileToTask({ file: myFile, folder: session });
};

const DropZone = ({ session, setEditProfile }) => {
  const [files, setFiles] = useState([]);
  const [snackopen, setSnackopen] = useState({ open: false, text: "" });
  const [showProgress, setShowProgress] = useState(false);
  console.log("session", session);
  useEffect(() => {}, []);

  const { orientation } = useOrientation();

  const handleSendFilesClick = async () => {
    if (files.length != 0) {
      setShowProgress(true);
      console.log(files);
      files.forEach((file) => sendFile(file, session));
      setShowProgress(false);
      showSnack("Все OK! Молодец");
    } else {
      showSnack("Ты хоть выбери что-нибудь :(");
    }
  };

  const handleSettingsClick = () => {
    setEditProfile(true);
  };

  const showSnack = (text) => {
    setSnackopen({ open: true, text });
  };

  return (
    <Box
      sx={{
        display: "flex",
        flexDirection: "column",
        height: "100%",
        alignItems: "center",
        padding: "10px",
      }}
    >
      <Snack snackopen={snackopen} setSnackopen={setSnackopen} />
      <Progress open={showProgress} />
      <Box
        sx={{
          display: "flex",
          flexDirection: orientation == "portrait" ? "column" : "row",
          alignItems: "center",
          padding: "10px",
          width: "100%",
          height: "100%",
          minHeight: "100%",
        }}
      >
        <Box
          sx={{
            display: "flex",
            width: orientation != "portrait" ? "auto" : "100%",
            flex: 1,
            height: orientation == "portrait" ? "auto" : "100%",
          }}
        >
          <Drop setFiles={setFiles} />
        </Box>
        <Box
          sx={{
            display: "flex",
            width: "10%",
            flexDirection: orientation != "portrait" ? "column" : "row",
            width: orientation == "portrait" ? "100%" : "10%",
            height: orientation == "portrait" ? "10%" : "100%",
            justifyContent: "space-evenly",
            // width: "100%",
            alignItems: orientation == "portrait" ? "center" : "center",
          }}
        >
          <IconButton aria-label="delete" onClick={handleSendFilesClick}>
            <IosShareIcon sx={{ fontSize: 80 }} />
          </IconButton>
          <IconButton aria-label="delete" onClick={handleSettingsClick}>
            <SettingsIcon sx={{ fontSize: 80 }} />
          </IconButton>
        </Box>
      </Box>
    </Box>
  );
};

export default DropZone;
