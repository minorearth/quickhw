import Box from "@mui/material/Box";
import IconButton from "@mui/material/IconButton";
import Snack from "../../../../components/snackbar";
import DropZone from "./dropzone/dropzone";
import TextField from "@mui/material/TextField";
import EmailIcon from "@mui/icons-material/Email";
import useDropZone from "./useDropVC";
import { observer } from "mobx-react-lite";
import stn from "@/globals/constants";
import { flipObject, getKeyBySubKeyValue } from "@/globals/utils/objectUtils";
import { useEffect, useState } from "react";
import Button from "@mui/material/Button";

const Drop = observer(({ surveyid, typeEncoded, manager }) => {
  const [surveytype, setSurveytype] = useState("img");
  const [fileType, setFileType] = useState("img");
  const [note, setNote] = useState("");
  const changeNote = (e) => {
    setNote(e.target.value);
  };

  useEffect(() => {
    setSurveytype(
      getKeyBySubKeyValue(stn.surveys.surveytypes, "SHORTNAME", typeEncoded[1])
    );
    setFileType(
      getKeyBySubKeyValue(stn.surveys.filetypes, "SHORTNAME", typeEncoded[0])
    );
  }, []);

  const { actions, state } = useDropZone({
    surveyid,
    type: fileType,
    manager,
    surveytype,
    note,
  });

  return (
    <Box
      sx={{
        display: "flex",
        flexDirection: "column",
        height: window.innerHeight,
        alignItems: "center",
        padding: "10px",
        transition: "padding 5s",
      }}
    >
      <Snack />
      <Box
        sx={{
          display: "flex",
          flexDirection: "row",
          width: "100%",
          height: surveytype == "task" ? "200px" : "100px",
          alignItems: "center",
          alignContent: "center",
          // backgroundColor: "green",
        }}
      >
        <Box
          sx={{
            display: "flex",
            flexDirection: "column",
            width: "100%",
            height: "100%",
            alignItems: "center",
            justifyContent: "center",
            // backgroundColor: "yellow",
          }}
        >
          <TextField
            id="outlined-basic"
            label={stn.caption.ENTER_NAME}
            variant="outlined"
            sx={{ margin: "10px" }}
            onChange={(e) => actions.changeName(e)}
            value={state.name}
            fullWidth
            InputProps={{ sx: { borderRadius: 5 } }}
          />
          {surveytype == "task" && (
            <TextField
              id="outlined-basic"
              label={"Введи номер задания или вариант"}
              variant="outlined"
              sx={{ margin: "10px" }}
              onChange={(e) => actions.changeTaskNumber(e)}
              value={state.tasknum}
              fullWidth
              InputProps={{ sx: { borderRadius: 5 } }}
            />
          )}
        </Box>
        {/* <Box
          sx={{
            // backgroundColor: "red",
            display: "flex",
            width: surveytype == "task" ? "200px" : "100px",
            height: "100%",
            justifyContent: "center",
            alignItems: "center",
          }}
        >
          <IconButton
            sx={{ display: "block" }}
            aria-label="delete"
            onClick={actions.sendFiles}
          >
            
          </IconButton>
        </Box> */}
      </Box>
      <Box
        sx={{
          display: "flex",
          flexDirection: "column",
          padding: "10px",
          width: "100%",
          flex: 1,
          height: "auto",
        }}
      >
        {fileType != "text" ? (
          <DropZone
            files={state.files}
            setFiles={actions.setFiles}
            type={fileType}
          />
        ) : (
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
                // fontStyle: "italic",
                // fontWeight: "bold",
                // fontFamily: myFont.style.fontFamily,
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
            // rows={20}
            onChange={(e) => changeNote(e)}
          />
        )}
      </Box>
      <Button
        sx={{ mt: 3, mb: 3 }}
        variant="contained"
        aria-label="delete"
        onClick={actions.sendFiles}
        endIcon={
          <EmailIcon
          // sx={{ fontSize: surveytype == "task" ? 100 : 80 }}
          />
        }
      >
        Отправить
      </Button>
    </Box>
  );
});

export default Drop;
