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
import Progress from "@/app/components/progress";
import progress from "@/app/store/progress";

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

const Drop = ({ setFiles, files, type }) => {
  const [accept, setAcceptFiles] = useState();

  useEffect(() => {
    type == "img"
      ? setAcceptFiles({
          "image/png": [".png", ".jpg", ".jpeg", ".bmp", ".gif"],
        })
      : {};
  }, []);

  const { getRootProps, getInputProps, isFocused, isDragAccept, isDragReject } =
    useDropzone({
      accept,
      maxSize: 10 * 1024 * 1024,
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
        {`Перетащите сюда ${
          type == "img" ? "изображения(bmp,jpeg,gif,png)" : "файлы"
        } или нажмите на область для загрузки вручную`}
      </Typography>
      <Typography
        variant="body1"
        gutterBottom
        style={{ textAlign: "center", fontSize: "medium" }}
      >
        Максимальный размер файла 10 мегабайт, файл не появится в списке на
        загрузку, если он больше 10 мегабайт
      </Typography>
      <List dense={true}>
        {files.map((file, id) => (
          <ListItem key={id}>
            <ListItemIcon>
              <UploadFileIcon />
            </ListItemIcon>
            <ListItemText primary={`${file.path} - ${file.size} bytes`} />
          </ListItem>
        ))}
      </List>
    </Box>
  );
};

export default Drop;
