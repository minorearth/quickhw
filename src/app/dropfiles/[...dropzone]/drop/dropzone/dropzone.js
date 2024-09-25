import React from "react";
import { useDropzone } from "react-dropzone";
import { useMemo, useState, useEffect } from "react";
import { Box } from "@mui/material";
import Typography from "@mui/material/Typography";
import List from "@mui/material/List";
import ListItem from "@mui/material/ListItem";
import ListItemIcon from "@mui/material/ListItemIcon";
import ListItemText from "@mui/material/ListItemText";
import UploadFileIcon from "@mui/icons-material/UploadFile";
import CloudUploadIcon from "@mui/icons-material/CloudUpload";
import Progress from "@/components/progress";
import progress from "@/app/store/progress";
import stn from "@/app/constants";
import stnd from "@/app/constantsDyn";

const baseStyle = {
  display: "flex",
  flex: 5,
  flexDirection: "column",
  alignItems: "center",
  justifyContent: "center",
  padding: "20px",
  borderWidth: 10,
  borderRadius: 50,
  borderColor: "#eeeeee",
  borderStyle: "dashed",
  backgroundColor: "#fafafa",
  color: "#bdbdbd",
  outline: "none",
  transition: "border .24s ease-in-out",
};

const focusedStyle = {
  borderColor: "#2196f3",
};

const acceptStyle = {
  borderColor: "#00e676",
};

const rejectStyle = {
  borderColor: "#ff1744",
};

const DropZone = ({ setFiles, files, type }) => {
  const [accept, setAcceptFiles] = useState();

  useEffect(() => {
    type == stn.files.droptypes.IMAGES
      ? setAcceptFiles({
          "image/png": stn.files.ALLOWED_IMG,
        })
      : {};
  }, []);

  const { getRootProps, getInputProps, isFocused, isDragAccept, isDragReject } =
    useDropzone({
      accept,
      maxSize: stn.files.MAX_SIZE,
      onDrop: (acceptedFiles) => {
        setFiles((files) => [...files, ...acceptedFiles]);
      },
    });

  const style = useMemo(
    () => ({
      ...baseStyle,
      ...(isFocused ? focusedStyle : {}),
      ...(isDragAccept ? acceptStyle : {}),
      ...(isDragReject ? rejectStyle : {}),
    }),
    [isFocused, isDragAccept, isDragReject]
  );

  return (
    <Box {...getRootProps({ style })}>
      <Progress open={progress.showProgress} />
      <input {...getInputProps()} />
      <CloudUploadIcon sx={{ fontSize: 60 }} />
      <Typography
        variant="body1"
        gutterBottom
        style={{ textAlign: "center", fontSize: "large" }}
      >
        {stnd.FILES_UPLOAD_GUIDE(type)}
      </Typography>
      <Typography
        variant="body1"
        gutterBottom
        style={{ textAlign: "center", fontSize: "medium" }}
      >
        {stn.files.UPLOAD_TEXT}
      </Typography>
      <List dense={true}>
        {files.map((file, id) => (
          <ListItem key={id}>
            <ListItemIcon>
              <UploadFileIcon />
            </ListItemIcon>
            <ListItemText primary={`${file.path} - ${file.size} байт>`} />
          </ListItem>
        ))}
      </List>
    </Box>
  );
};

export default DropZone;
