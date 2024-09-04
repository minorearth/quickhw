import React from "react";
import { useDropzone } from "react-dropzone";
import { useMemo } from "react";
import { Box } from "@mui/material";
import Typography from "@mui/material/Typography";
import List from "@mui/material/List";
import ListItem from "@mui/material/ListItem";
import ListItemIcon from "@mui/material/ListItemIcon";
import ListItemText from "@mui/material/ListItemText";
import UploadFileIcon from "@mui/icons-material/UploadFile";

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

const Drop = ({ setFiles, files }) => {
  const {
    acceptedFiles,
    getRootProps,
    getInputProps,
    isFocused,
    isDragAccept,
    isDragReject,
  } = useDropzone({
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
      <input {...getInputProps()} />

      <Typography
        variant="body1"
        gutterBottom
        style={{ textAlign: "center", fontSize: "large" }}
      >
        Перетащите сюда файлы или нажмите на область для загрузки вручную
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
      {/* <aside>{files.length != 0 && <ul>{files}</ul>}</aside> */}
    </Box>
  );
};
export default Drop;
