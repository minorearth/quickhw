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

import Snackbar from "@mui/material/Snackbar";
import Slide from "@mui/material/Slide";

const videoConstraints = {
  facingMode: { exact: "environment" },
  // facingMode: "user",
};
import { getUserName } from "../../localstorage";

function getImageDimensions(file) {
  return new Promise(function (resolved, rejected) {
    var i = document.createElement("img");
    i.onload = function () {
      resolved({ w: i.width, h: i.height });
    };
    i.src = file;
  });
}

const sendRoller = async (imageSrc, session) => {
  const preBlob = await fetch(imageSrc);
  const blob = await preBlob.blob();
  const filename = getUserName();
  const file = new File([blob], `${filename}.jpg`, { type: blob.type });
  await UploadFileToTask({ file, folder: session });
};

const Camera = ({ orientation, session, setEditProfile }) => {
  const router = useRouter();

  const webcamRef = useRef(null);
  const [url, setUrl] = useState("");
  const [roller, setRoller] = useState("");

  const handleSettingsClick = () => {
    // router.push(`/profile`);
    setEditProfile(true);
  };

  const sendRollerClick = React.useCallback(async () => {
    await sendRoller(roller, session);
    handleClick();
  }, [roller]);

  const capturePhoto = React.useCallback(async () => {
    const imageSrc = webcamRef.current.getScreenshot();
    if (roller != "") {
      var rDim = await getImageDimensions(roller);
      var sDim = await getImageDimensions(imageSrc);
      mergeImages(
        [
          { src: roller, x: 0, y: 0 },
          { src: imageSrc, x: 0, y: rDim.h },
        ],
        {
          height: rDim.h + sDim.h,
        }
      ).then((b64) => {
        setRoller(b64);
        setUrl(b64);
      });
    } else {
      setRoller(imageSrc);
      setUrl(imageSrc);
    }
  }, [roller]);

  const onUserMedia = (e) => {
    console.log(e);
  };

  const [state, setState] = React.useState({
    open: false,
    Transition: SlideTransition,
  });

  function SlideTransition(props) {
    return <Slide {...props} direction="up" />;
  }

  const handleClick = () => {
    setState({
      open: true,
      Transition: SlideTransition,
    });
  };

  const handleClose = () => {
    setState({
      ...state,
      open: false,
    });
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
      {/* <Button onClick={handleClick()}>Slide Transition</Button> */}
      <Snackbar
        open={state.open}
        onClose={handleClose}
        TransitionComponent={state.Transition}
        message="Отправлено, все OK! Молодец!"
        key={state.Transition.name}
        autoHideDuration={1200}
      />
      <Box
        sx={{
          display: "flex",
          flexDirection: "column",
          alignItems: "center",
          padding: "10px",
        }}
      >
        <Box
          sx={{
            display: "flex",
            flexDirection: "row",
            justifyContent: "space-evenly",
            width: "100%",
          }}
        >
          <IconButton aria-label="delete" size="small" onClick={capturePhoto}>
            <AddAPhotoIcon sx={{ fontSize: 100 }} />
          </IconButton>
          <IconButton aria-label="delete" onClick={sendRollerClick}>
            <IosShareIcon sx={{ fontSize: 100 }} />
          </IconButton>
          <IconButton aria-label="delete" onClick={handleSettingsClick}>
            <SettingsIcon sx={{ fontSize: 100 }} />
          </IconButton>
        </Box>
        <Box sx={{ width: "90%" }}>
          <Webcam
            ref={webcamRef}
            // height={72}
            width="100%"
            audio={false}
            screenshotFormat="image/jpeg"
            forceScreenshotSourceSize
            videoConstraints={videoConstraints}
            onUserMedia={onUserMedia}
          />
        </Box>
      </Box>
      {/* <button onClick={capturePhoto}>Capture</button> */}
      {/* <button onClick={() => setUrl(null)}>Refresh</button> */}
      <Box
        sx={{ display: "flex", flexDirection: "column", alignItems: "center" }}
      >
        {/* <img src={url} alt="Screenshot" /> */}
        {roller != "" && (
          <Image
            src={url}
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
        )}
      </Box>
    </Box>
  );
};

export default Camera;