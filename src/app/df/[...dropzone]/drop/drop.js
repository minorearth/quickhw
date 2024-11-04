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

const Drop = observer(({ surveyid, typeEncoded, manager }) => {
  const [surveytype, setSurveytype] = useState("img");
  const [fileType, setFileType] = useState("img");
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
  });

  return (
    <Box
      sx={{
        display: "flex",
        flexDirection: "column",
        height: "100%",
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
          height: "100px",
          alignItems: "center",
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
        <IconButton aria-label="delete" onClick={actions.sendFiles}>
          <EmailIcon sx={{ fontSize: 50 }} color="primary" />
        </IconButton>
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
        <DropZone
          files={state.files}
          setFiles={actions.setFiles}
          type={fileType}
        />
      </Box>
    </Box>
  );
});

export default Drop;
