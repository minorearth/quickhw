import React, { useEffect, useRef } from "react";
import Box from "@mui/material/Box";
import { useState } from "react";
import IconButton from "@mui/material/IconButton";
import { Snack } from "../../components/snackbar";
import { useOrientation } from "../../hooks/useOrientaton";
import JSZip from "jszip";
import Progress from "@/app/components/progress";
import Drop from "./drop";
import { UploadFileAndRefreshcollection } from "../../domain/utils";
import { mergeAllImages } from "../../utils/imageUtils";
import TextField from "@mui/material/TextField";
import EmailIcon from "@mui/icons-material/Email";

const DropZone = ({ session, setEditProfile, type }) => {
  const [files, setFiles] = useState([]);
  const [snackopen, setSnackopen] = useState({ open: false, text: "" });
  const [showProgress, setShowProgress] = useState(false);
  const [acceptFiles, setAcceptFiles] = useState();
  const [progress, setProgress] = useState(0);
  const [name, setName] = useState("");

  useEffect(() => {
    setInterval(() => setName(""), 5 * 60 * 1000);
    type == "img"
      ? setAcceptFiles({
          "image/png": [".png", ".jpg", ".jpeg", ".bmp", ".gif"],
        })
      : {};
  }, []);

  const { orientation } = useOrientation();

  const compressFiles = async (files, filename) => {
    var zip = new JSZip();
    files.forEach((file) => zip.file(file.name, file));
    const fileZIPpedBlob = await zip.generateAsync({ type: "blob" });
    const fileZIPped = new File([fileZIPpedBlob], filename, {
      type: fileZIPpedBlob.type,
    });
    return fileZIPped;
  };

  // const getFileName = (username) => {
  //   const fileid = getImgCnt();
  //   // const filename = `${username}${fileid}.${ext}`;
  //   const filename = username;
  //   return filename;
  // };

  const handleSendFilesClick = async () => {
    if (files.length != 0 && name != "") {
      setShowProgress(true);
      // const username = getUserName();
      // const fileName = getFileName(name);
      if (type == "img") {
        const file = await mergeAllImages(files, name, setProgress);
        UploadFileAndRefreshcollection(file, session, name, "img");
      } else {
        const fileZIP = await compressFiles(files, `${name}.zip`);
        UploadFileAndRefreshcollection(fileZIP, session, name, "zip");
      }
      setShowProgress(false);
      showSnack("Все OK! Молодец");
    } else {
      !files.length && showSnack("Ты хоть выбери что-нибудь :(");
      !name && showSnack("Ввведи свою фамилию, будь другом...");
    }
  };

  // const handleSettingsClick = () => {
  //   setEditProfile(true);
  // };

  const showSnack = (text) => {
    setSnackopen({ open: true, text });
  };

  const changeName = (e) => {
    setName(e.target.value);
  };

  return (
    <Box
      sx={{
        display: "flex",
        flexDirection: "column",
        height: "100%",
        alignItems: "center",
        padding: "10px",
        transition: "padding 5s",
      }}
    >
      <Snack snackopen={snackopen} setSnackopen={setSnackopen} />
      <Progress open={showProgress} perc={progress} />

      {/* <Fab
        sx={{
          position: "absolute",
          top: 36,
          right: 36,
          width: 100,
          height: 100,
        }}
        // color="secondary"
        onClick={handleSettingsClick}
      >
        <AccountCircleOutlinedIcon sx={{ fontSize: 60 }} />
      </Fab>
      <Fab
        sx={{
          position: "absolute",
          top: 36,
          left: 36,
          width: 100,
          height: 100,
        }}
        color="primary"
        onClick={handleSendFilesClick}
      >
        <IosShareIcon sx={{ fontSize: 60 }} />
      </Fab> */}
      <Box
        sx={{
          display: "flex",
          // flexDirection: orientation != "portrait" ? "column" : "row",
          flexDirection: "row",
          // width: orientation == "portrait" ? "100%" : "10%",
          width: "100%",
          // height: orientation == "portrait" ? "10%" : "100%",
          height: "100px",
          // justifyContent: "space-evenly",
          // alignItems: orientation == "portrait" ? "center" : "center",
          alignItems: "center",
        }}
      >
        <TextField
          id="outlined-basic"
          label="Укажи фамилию"
          variant="outlined"
          sx={{ margin: "10px" }}
          onChange={(e) => changeName(e)}
          value={name}
          fullWidth
          InputProps={{ sx: { borderRadius: 5 } }}
        />
        <IconButton aria-label="delete" onClick={handleSendFilesClick}>
          <EmailIcon sx={{ fontSize: 50 }} color="primary" />
        </IconButton>
        {/* <IconButton aria-label="delete" onClick={handleSettingsClick}>
            <SettingsIcon sx={{ fontSize: 80 }} />
          </IconButton> */}
      </Box>
      {/* <Box
        sx={{
          display: "flex",
          flexDirection: "column",
          // flexDirection: orientation == "portrait" ? "column" : "row",
          alignItems: "center",
          padding: "10px",
          width: "100%",
          height: "100%",
          minHeight: "100%",
        }}
      > */}
      <Box
        sx={{
          display: "flex",
          flexDirection: "column",
          padding: "10px",

          // width: orientation != "portrait" ? "auto" : "100%",
          width: "100%",
          flex: 1,
          height: "auto",
          // height: orientation == "portrait" ? "auto" : "100%",
        }}
      >
        <Drop
          files={files}
          setFiles={setFiles}
          type={type}
          accept={acceptFiles}
        />
      </Box>
    </Box>
    // </Box>
  );
};

export default DropZone;
