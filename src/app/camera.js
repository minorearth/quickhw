import React, { useEffect, useRef } from "react";
import Webcam from "react-webcam";
import { UploadFileToTask } from "../storagedb";
import Box from "@mui/material/Box";
import Button from "@mui/material/Button";
import Image from "next/image";
import mergeImages from "merge-images";
import { useState } from "react";

const videoConstraints = {
  //   facingMode: { exact: "environment" },
  facingMode: "user",
};

function getImageDimensions(file) {
  return new Promise(function (resolved, rejected) {
    var i = document.createElement("img");
    i.onload = function () {
      resolved({ w: i.width, h: i.height });
    };
    i.src = file;
  });
}

const sendRoller = async (imageSrc) => {
  const preBlob = await fetch(imageSrc);
  const blob = await preBlob.blob();
  const file = new File([blob], "image.jpg", { type: blob.type });
  await UploadFileToTask({ file });
};

const Camera = ({ orientation, session }) => {
  console.log(session);
  const webcamRef = useRef(null);
  const [url, setUrl] = useState("");
  const [roller, setRoller] = useState("");

  const sendRollerClick = React.useCallback(() => {
    sendRoller(roller);
  }, [roller]);

  const capturePhoto = React.useCallback(async () => {
    const imageSrc = webcamRef.current.getScreenshot();
    if (roller != "") {
      var rDim = await getImageDimensions(roller);
      console.log(rDim);
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
      <Box
        sx={{
          display: "flex",
          flexDirection: "column",
          alignItems: "center",
          padding: "10px",
        }}
      >
        <Button onClick={capturePhoto}>Сфоткать</Button>
        <Button onClick={sendRollerClick}>Отправить</Button>
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
