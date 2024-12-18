import React from "react";
import { useDropzone } from "react-dropzone";
import { useMemo, useState, useEffect } from "react";
import { Box } from "@mui/material";
import Typography from "@mui/material/Typography";
import List from "@mui/material/List";
import ListItem from "@mui/material/ListItem";
import ListItemText from "@mui/material/ListItemText";
import CloudUploadIcon from "@mui/icons-material/CloudUpload";
import Progress from "@/components/progress";
import progress from "@/store/progress";
import stn from "@/globals/settings";
import local from "@/globals/local";
import { observer } from "mobx-react-lite";
import snack from "@/store/snack";
import { fileExtension } from "@/globals/utils/fileUtils";

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

const DropZone = observer(({ setFiles, files, type }) => {
  const [accept, setAcceptFiles] = useState();

  useEffect(() => {
    !!type && setAcceptFiles(stn.surveys.filetypes[type].allowed_ext);
  }, [type]);

  const { getRootProps, getInputProps, isFocused, isDragAccept, isDragReject } =
    useDropzone({
      accept,
      multiple: stn.surveys.filetypes[type].multiple,
      maxSize: stn.files.MAX_SIZE,
      onDrop: (acceptedFiles) => {
        if (type == stn.surveys.filetypes.anyfile.name) {
          const ext = fileExtension(acceptedFiles[0]);
          if (!ext) {
            snack.showSnack(local.ru.msg.snack.WRONG_EXT);
            setFiles([]);
            return;
          }
          setFiles([...acceptedFiles]);
        } else {
          setFiles((files) => [...files, ...acceptedFiles]);
        }
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
        {stn.surveys.filetypes[type].drop_message}
        {/* {stnd.FILES_UPLOAD_GUIDE(type)} */}
      </Typography>
      <Typography
        variant="body1"
        gutterBottom
        style={{ textAlign: "center", fontSize: "medium" }}
      >
        {local.ru.text.UPLOAD_TEXT}
      </Typography>
      <List dense={true}>
        {files.map((file, id) => (
          <ListItem key={id}>
            {/* <ListItemIcon>
              <UploadFileIcon />
            </ListItemIcon> */}
            <ListItemText
              primary={`${file.path} - ${file.size} ${local.ru.text.DROP_UNITS}`}
            />
          </ListItem>
        ))}
      </List>
    </Box>
  );
});

export default DropZone;
