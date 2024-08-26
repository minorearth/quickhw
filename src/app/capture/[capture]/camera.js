import React, { useEffect, useRef } from "react";
import Webcam from "react-webcam";
import { UploadFileToTask } from "../../../storagedb";
import Box from "@mui/material/Box";
import Button from "@mui/material/Button";
import Image from "next/image";
import mergeImages from "merge-images";
import { useState } from "react";
import IconButton from "@mui/material/IconButton";
import AddAPhotoIcon from "@mui/icons-material/AddAPhoto";
import IosShareIcon from "@mui/icons-material/IosShare";
import SettingsIcon from "@mui/icons-material/Settings";
import { useRouter } from "next/navigation";
import ImageList from "@mui/material/ImageList";
import ImageListItem from "@mui/material/ImageListItem";
import FlipCameraIosIcon from "@mui/icons-material/FlipCameraIos";
import { getImageDimensions, resize } from "../utils/imageUtils";
import { Snack } from "../../components/snackbar";

import "jimp";

import { getUserName } from "../../localstorage";

const sendRoller = async (imageSrc, session) => {
  const preBlob = await fetch(imageSrc);
  const blob = await preBlob.blob();
  const filename = getUserName();
  const file = new File([blob], `${filename}.jpg`, { type: blob.type });
  await UploadFileToTask({ file, folder: session });
};

const Camera = ({ session, setEditProfile }) => {
  const router = useRouter();
  const [orientation, setOrientation] = useState("");
  const [wid, setWid] = useState(0);
  const [front, setFront] = useState(false);
  const [videoConstraints, setVideoConstraints] = useState();
  const [photos, setPhotos] = useState([]);
  const [snackopen, setSnackopen] = useState({ open: false, text: "" });

  const webcamRef = useRef(null);

  useEffect(() => {
    setVideoConstraints(
      front ? { facingMode: "user" } : { facingMode: { exact: "environment" } }
    );
  }, [front]);

  useEffect(() => {
    function updateOrientation() {
      const regex = /(\S+)-/;
      const orient = window.screen.orientation.type.match(regex);
      setOrientation(orient[1]);
    }
    updateOrientation();
    window.addEventListener("orientationchange", updateOrientation);
    return () => {
      window.removeEventListener("orientationchange", updateOrientation);
    };
  }, [orientation]);

  const prepareImages = (photos) => {
    let pos = 0;
    let maxW = 0;
    const allimg = photos.map((img) => {
      const res = { src: img.src, x: 0, y: pos };
      pos += img.h;
      maxW = Math.max(img.w, maxW);
      return res;
    });

    return { images: allimg, totalH: pos, maxW };
  };

  const sendRollerClick = async () => {
    const images = prepareImages(photos);
    if (images.images.length != 0) {
      const b64 = await mergeImages(images.images, {
        height: images.totalH,
        width: images.maxW,
      });
      await sendRoller(b64, session);
      showSnack("Все OK! Молодец");
    } else {
      showSnack("Ты хоть сфоткай что-нибудь :(");
    }
  };

  const handleSettingsClick = () => {
    setEditProfile(true);
  };

  const capturePhoto2 = async () => {
    const screen = await webcamRef.current.getScreenshot();
    var sDim = await getImageDimensions(screen, orientation);
    const file = await resize(screen, orientation, sDim.w, sDim.h);
    setPhotos((state) => [...state, file]);
  };

  const onUserMedia = (e) => {};

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
      {/* <Button onClick={() => {}}>{isMobile}</Button> */}
      <Snack snackopen={snackopen} setSnackopen={setSnackopen} />

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
            // maxheight: "100%",
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
            onUserMedia={onUserMedia}
          />
        </Box>
        <Box
          sx={{
            display: "flex",
            flex: 1,
            flexDirection: orientation != "portrait" ? "column" : "row",
            justifyContent: "space-evenly",
            width: "100%",
            // backgroundColor: "yellow",
            alignItems: orientation == "portrait" ? "center" : "start",
          }}
        >
          <IconButton
            aria-label="delete"
            onClick={() => setFront((state) => !state)}
          >
            <FlipCameraIosIcon sx={{ fontSize: 80 }} />
          </IconButton>

          <IconButton aria-label="delete" size="small" onClick={capturePhoto2}>
            <AddAPhotoIcon sx={{ fontSize: 80 }} />
          </IconButton>
          <IconButton aria-label="delete" onClick={sendRollerClick}>
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
