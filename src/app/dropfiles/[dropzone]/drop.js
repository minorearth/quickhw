import React from "react";
import { useDropzone } from "react-dropzone";
import { useMemo } from "react";

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

const Drop = ({ setFiles }) => {
  const {
    acceptedFiles,
    getRootProps,
    getInputProps,
    isFocused,
    isDragAccept,
    isDragReject,
  } = useDropzone({
    onDrop: (acceptedFiles) => {
      setFiles(acceptedFiles);
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

  const files = [
    <h4>Загружаемые файлы:</h4>,
    ...acceptedFiles.map((file) => (
      <li key={file.path}>
        {file.path} - {file.size} bytes
      </li>
    )),
  ];

  return (
    <div {...getRootProps({ style })}>
      <input {...getInputProps()} />
      <p style={{ textAlign: "center" }}>
        Перетащите сюда файлы или нажмите на область для загрузки вручную
      </p>
      <aside>{files.length != 0 && <ul>{files}</ul>}</aside>
    </div>
  );
};
export default Drop;
