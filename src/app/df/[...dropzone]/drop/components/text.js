import TextField from "@mui/material/TextField";
import { useState } from "react";

const Text = ({ saveNote }) => {
  const [note, setNote] = useState("");
  const changeNote = (e) => {
    setNote(e.target.value);
    saveNote(e.target.value);
  };
  return (
    <TextField
      id="plainText"
      onCut={(e) => {
        e.preventDefault();
      }}
      onCopy={(e) => {
        e.preventDefault();
      }}
      onPaste={(e) => {
        e.preventDefault();
      }}
      onKeyDown={(e) => {
        const { value } = e.target;

        if (e.key === "Tab") {
          e.preventDefault();

          const cursorPosition = e.target.selectionStart;
          const cursorEndPosition = e.target.selectionEnd;
          const tab = "\t";

          e.target.value =
            value.substring(0, cursorPosition) +
            tab +
            value.substring(cursorEndPosition);
          e.target.selectionStart = cursorPosition + 1;
          e.target.selectionEnd = cursorPosition + 1;
        }
      }}
      inputProps={{
        style: {
          color: "#BDBDBD",
          fontSize: 20,
          flex: 5,
        },
      }}
      sx={{
        m: "10px",
        backgroundColor: "#f4f2f1",
        borderRadius: "20px",
        flex: 1,

        "& .MuiOutlinedInput-root": {
          borderRadius: "20px",
          borderWidth: "10px",
        },
        "& .MuiInputBase-root": {
          borderRadius: "20px",
          borderWidth: "10px",
          height: "100%",
          alignItems: "start",
        },
      }}
      multiline
      value={note}
      onChange={(e) => changeNote(e)}
    />
  );
};

export default Text;
