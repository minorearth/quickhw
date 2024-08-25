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
import { getImageDimensions, resize } from "../utils/imageUtils";
import { useClientMediaQuery } from "../utils/ClientMediaQuery";

import Snackbar from "@mui/material/Snackbar";
import Slide from "@mui/material/Slide";
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

  const isMobile = useClientMediaQuery("(max-width: 600px)");
  const videoConstraints = {
    facingMode: isMobile ? { exact: "environment" } : "user",
  };

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

  const webcamRef = useRef(null);
  const [url, setUrl] = useState("");
  const [roller, setRoller] = useState("");

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
    const b64 = await mergeImages(images.images, {
      height: images.totalH,
      width: images.maxW,
    });
    await sendRoller(b64, session);
    handleClick();
  };

  const handleSettingsClick = () => {
    setEditProfile(true);
  };

  // const capturePhoto = async () => {
  //   const screen = await webcamRef.current.getScreenshot();
  //   if (roller != "") {
  //     var rDim = await getImageDimensions(roller);
  //     var sDim = await getImageDimensions(screen);
  //     new Jimp(
  //       // Math.max(rDim.w, sDim.w),
  //       1000,
  //       sDim.h + rDim.h,
  //       "green",
  //       (err, image) => {
  //         Jimp.read(screen, (err, screenJimp) => {
  //           Jimp.read(roller, async (err, rollerJimp) => {
  //             screenJimp.resize(sDim.w, sDim.h);
  //             setWid(`${sDim.w} ${sDim.h}`);
  //             image.composite(screenJimp, 0, rDim.h);
  //             image.composite(rollerJimp, 0, 0);
  //             image.getBase64(Jimp.AUTO, (err, res) => {
  //               setRoller(res);
  //               setUrl(res);
  //             });
  //           });
  //         });
  //       }
  //     );
  //   } else {
  //     setRoller(screen);
  //     setUrl(screen);
  //   }
  // };

  const [photos, setPhotos] = useState([]);

  const capturePhoto2 = async () => {
    const screen = await webcamRef.current.getScreenshot();
    var sDim = await getImageDimensions(screen, orientation);
    const file = await resize(screen, orientation, sDim.w, sDim.h);
    setPhotos((state) => [...state, file]);
  };

  // if (roller != "") {
  //   var rDim = await getImageDimensions(roller);
  //   var sDim = await getImageDimensions(imageSrc);
  //   mergeImages(
  //     [
  //       { src: roller, x: 0, y: 0 },
  //       { src: imageSrc, x: 0, y: rDim.h },
  //     ],
  //     {
  //       height: rDim.h + sDim.h,
  //       width: Math.max(rDim.w, sDim.w),
  //     }
  //   ).then((b64) => {
  //     setRoller(b64);
  //     setUrl(b64);
  //   });
  // } else {
  //   setRoller(imageSrc);
  //   setUrl(imageSrc);
  // }
  // };

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
      <Button onClick={() => {}}>{wid}</Button>
      <Snackbar
        open={state.open}
        onClose={handleClose}
        TransitionComponent={state.Transition}
        message="Отправлено, все OK! Молодец2!"
        key={state.Transition.name}
        autoHideDuration={1200}
      />

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
            // backgroundColor: "red",
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
          <IconButton aria-label="delete" size="small" onClick={capturePhoto2}>
            <AddAPhotoIcon sx={{ fontSize: 100 }} />
          </IconButton>
          <IconButton aria-label="delete" onClick={sendRollerClick}>
            <IosShareIcon sx={{ fontSize: 100 }} />
          </IconButton>
          <IconButton aria-label="delete" onClick={handleSettingsClick}>
            <SettingsIcon sx={{ fontSize: 100 }} />
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
              {/* <img
                srcSet={`${item.img}?w=164&h=164&fit=crop&auto=format&dpr=2 2x`}
                src={`${item.img}?w=164&h=164&fit=crop&auto=format`}
                alt={item.title}
                loading="lazy"
              /> */}
            </ImageListItem>
          ))}
        </ImageList>
      </Box>
    </Box>
  );
};

export default Camera;
