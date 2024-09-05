import React, { useEffect, useRef } from "react";
import Box from "@mui/material/Box";
import { useState } from "react";
import IconButton from "@mui/material/IconButton";
import IosShareIcon from "@mui/icons-material/IosShare";
import SettingsIcon from "@mui/icons-material/Settings";
import { Snack } from "../../components/snackbar";
import { getImgCnt, getUserName } from "../../localstorage";
import { useOrientation } from "../../useOrientaton";
import JSZip from "jszip";
import Progress from "@/app/components/backdrop";
import Drop from "./drop";
import { UploadFileAndRefreshcollection } from "../../domain/utils";
import { mergeAllImages } from "../../capture/utils/imageUtils";

const DropZone = ({ session, setEditProfile, type }) => {
  const [files, setFiles] = useState([]);
  const [snackopen, setSnackopen] = useState({ open: false, text: "" });
  const [showProgress, setShowProgress] = useState(false);
  const [acceptFiles, setAcceptFiles] = useState();
  const [perc, setMessage] = useState("hello");

  useEffect(() => {
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

  const getFileName = (username) => {
    const fileid = getImgCnt();
    // const filename = `${username}${fileid}.${ext}`;
    const filename = username;
    return filename;
  };

  const handleSendFilesClick = async () => {
    if (files.length != 0) {
      setShowProgress(1);
      const username = getUserName();
      setMessage(2);
      const fileName = getFileName(username);
      setMessage(5);

      if (type == "img") {
        setMessage(10);
        const file = await mergeAllImages(files, username, setMessage);
        setMessage(85);
        UploadFileAndRefreshcollection(file, session, username, "img");
        setMessage(99);
      } else {
        const fileZIP = await compressFiles(files, `${fileName}.zip`);
        UploadFileAndRefreshcollection(fileZIP, session, username, "zip");
      }
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
      <Progress open={showProgress} perc={perc} />
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
          <Drop
            files={files}
            setFiles={setFiles}
            type={type}
            accept={acceptFiles}
          />
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
