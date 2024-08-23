"use client";
import Image from "next/image";
import styles from "./page.module.css";
import { UploadFilesDialog } from "./fileupload.js";
import Camera from "./capture/camera";
import { useEffect, useState } from "react";
import Manager from "./manager/page";

export default function Home() {
  const [orientation, setOrientation] = useState("");
  useEffect(() => {
    function updateOrientation() {
      setOrientation(window.screen.orientation.type);
    }
    updateOrientation();
    window.addEventListener("orientationchange", updateOrientation);
    return () => {
      window.removeEventListener("orientationchange", updateOrientation);
    };
  }, [orientation]);
  return <Manager />;
}
