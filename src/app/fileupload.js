import React from "react";
import { Button } from "@mui/material";
import { useRef } from "react";
import AddIcon from "@mui/icons-material/Add";
import FileDownloadOutlinedIcon from "@mui/icons-material/FileDownloadOutlined";

export const UploadFilesDialog = ({
  handleFileChange,
  vis = true,
  title,
  accept,
}) => {
  const fileUpload = useRef(null);

  return (
    <>
      <Button
        color="primary"
        sx={{ display: !vis && "none" }}
        startIcon={<FileDownloadOutlinedIcon />}
        onClick={() => fileUpload.current.click()}
      >
        {title}
      </Button>

      <input
        id="filePicker"
        style={{ display: "none" }}
        type="file"
        accept={accept}
        ref={fileUpload}
        onClick={(event) => {
          event.target.value = null;
        }}
        onChange={(e) => {
          handleFileChange(e.target.files[0]);
        }}
      />
    </>
  );
};
