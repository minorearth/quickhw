import React, { useEffect, useRef } from "react";
import Webcam from "react-webcam";
import { UploadFileToTask } from "../../../../storagedb";
import Box from "@mui/material/Box";
import Image from "next/image";
import { useState } from "react";
import IconButton from "@mui/material/IconButton";
import AddAPhotoIcon from "@mui/icons-material/AddAPhoto";
import IosShareIcon from "@mui/icons-material/IosShare";
import SettingsIcon from "@mui/icons-material/Settings";
import ImageList from "@mui/material/ImageList";
import ImageListItem from "@mui/material/ImageListItem";
import FlipCameraIosIcon from "@mui/icons-material/FlipCameraIos";
import { Snack } from "../../../components/snackbar";
import { useOrientation } from "../../../useOrientaton";
import {
  prepareAndMergeImagesTob46URI,
  b64URItoFile,
} from "../../../capture/utils/imageUtils";

import { getUserName, getImgCnt } from "../../../localstorage";
import { capturePhoto } from "./camUtils";
import Progress from "@/app/components/backdrop";

const sendRoller = async (b64URI, session) => {
  const username = getUserName();
  const fileid = getImgCnt();
  const filename = `${username}${fileid}.jpg`;
  const file = await b64URItoFile(b64URI, filename);
  await UploadFileToTask({ file, folder: session });
};

const Camera = ({ session, setEditProfile }) => {
  const [front, setFront] = useState(false);
  const [videoConstraints, setVideoConstraints] = useState();
  const [photos, setPhotos] = useState([]);
  const [snackopen, setSnackopen] = useState({ open: false, text: "" });
  const [showProgress, setShowProgress] = useState(false);
  const webcamRef = useRef(null);

  useEffect(() => {
    setVideoConstraints(
      front ? { facingMode: "user" } : { facingMode: { exact: "environment" } }
    );
  }, [front]);

  const { orientation } = useOrientation();

  const handleSendRollerClick = async () => {
    if (photos.length != 0) {
      const b64URI = await prepareAndMergeImagesTob46URI(photos);
      setShowProgress(true);
      await sendRoller(b64URI, session);
      setShowProgress(false);
      showSnack("Все OK! Молодец");
    } else {
      showSnack("Ты хоть сфоткай что-нибудь :(");
    }
  };

  const handleSettingsClick = () => {
    setEditProfile(true);
  };

  const handleCapturePhoto = async () => {
    const file = await capturePhoto(webcamRef, orientation);
    setPhotos((state) => [...state, file]);
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
            width: orientation != "portrait" ? "auto" : "100%",
            flex: 4,
            height: orientation == "portrait" ? "auto" : "100%",
          }}
        >
          <Webcam
            ref={webcamRef}
            width="100%"
            audio={false}
            height="100%"
            screenshotFormat="image/jpeg"
            forceScreenshotSourceSize
            videoConstraints={videoConstraints}
            onUserMedia={(e) => {}}
          />
        </Box>
        <Box
          sx={{
            display: "flex",
            flex: 1,
            flexDirection: orientation != "portrait" ? "column" : "row",
            justifyContent: "space-evenly",
            width: "100%",
            alignItems: orientation == "portrait" ? "center" : "start",
          }}
        >
          <IconButton
            aria-label="delete"
            onClick={() => setFront((state) => !state)}
          >
            <FlipCameraIosIcon sx={{ fontSize: 80 }} />
          </IconButton>
          <IconButton
            aria-label="delete"
            size="small"
            onClick={handleCapturePhoto}
          >
            <AddAPhotoIcon sx={{ fontSize: 80 }} />
          </IconButton>
          <IconButton aria-label="delete" onClick={handleSendRollerClick}>
            <IosShareIcon sx={{ fontSize: 80 }} />
          </IconButton>
          <IconButton aria-label="delete" onClick={handleSettingsClick}>
            <SettingsIcon sx={{ fontSize: 80 }} />
          </IconButton>
        </Box>
      </Box>
      <Box
        sx={{ display: "flex", flexDirection: "column", alignItems: "center" }}
      >
        <ImageList cols={1}>
          {photos.map((item, id) => (
            <ImageListItem key={id}>
              <Image
                src={item.src}
                width={5}
                height={5}
                // fill
                // width='auto'
                style={{
                  // objectFit: "contain",
                  width: "80%",
                  height: "auto",
                }}
                sizes="(max-width: 768px) 100vw, 33vw"
                //   src={`${img}?w=248&fit=crop&auto=format`}
                alt="rfhnbyrj"
                //   loading="lazy"
              />
            </ImageListItem>
          ))}
        </ImageList>
      </Box>
    </Box>
  );
};

export default Camera;
