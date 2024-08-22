"use client";
import Image from "next/image";
import styles from "./page.module.css";
import { UploadFilesDialog } from "./fileupload.js";
import Camera from "./camera";
import { useEffect, useState } from "react";

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
  return <Camera orientation={orientation} />;
}
