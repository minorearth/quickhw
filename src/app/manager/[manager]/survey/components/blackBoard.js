import TextField from "@mui/material/TextField";

import stn from "@/globals/settings";
import local from "@/globals/local";

const BlackBoard = ({ note, setNote }) => {
  const changeNote = (e) => {
    setNote(e.target.value);
  };

  return (
    <>
      <TextField
        id="outlined-multiline-static"
        inputProps={{
          style: {
            color: "#405D72",
            fontSize: 20,
          },
        }}
        sx={{
          m: "10px",
          backgroundColor: "#f4f2f1",
          borderRadius: "20px",

          "& .MuiOutlinedInput-root": {
            borderRadius: "20px",
            borderWidth: "10px",
          },
        }}
        multiline
        value={note}
        rows={20}
        onChange={(e) => changeNote(e)}
      />
    </>
  );
};

export default BlackBoard;
