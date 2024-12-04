import Box from "@mui/material/Box";
import Snack from "@/components/snackbar";
import DropZone from "./components/dropzone/dropzone";
import TextField from "@mui/material/TextField";
import EmailIcon from "@mui/icons-material/Email";
import useDropZone from "./useDropVC";
import { observer } from "mobx-react-lite";
import stn from "@/globals/settings";
import local from "@/globals/local";
import Button from "@mui/material/Button";
import Text from "./components/text";

const Drop = observer(
  ({ surveyid, typeEncoded, manager, setCongratVisible }) => {
    const { actions, state } = useDropZone({
      surveyid,
      manager,
      typeEncoded,
      setCongratVisible,
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
            height:
              state.surveytype == stn.surveys.surveytypes.task.name
                ? "200px"
                : "100px",
            alignItems: "center",
            alignContent: "center",
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
              label={local.ru.caption.DROP_ENTER_NAME}
              variant="outlined"
              sx={{ margin: "10px" }}
              onChange={(e) => actions.changeName(e)}
              value={state.name}
              fullWidth
              InputProps={{ sx: { borderRadius: 5 } }}
            />
            {state.surveytype == stn.surveys.surveytypes.task.name && (
              <TextField
                id="outlined-basic"
                label={local.ru.caption.DROP_ENTER_TASKID}
                variant="outlined"
                sx={{ margin: "10px" }}
                onChange={(e) => actions.changeTaskNumber(e)}
                value={state.tasknum}
                fullWidth
                InputProps={{ sx: { borderRadius: 5 } }}
              />
            )}
          </Box>
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
          {state.fileType != stn.surveys.filetypes.text.name ? (
            <DropZone
              files={state.files}
              setFiles={actions.setFiles}
              type={state.fileType}
            />
          ) : (
            <Text saveNote={actions.saveNote} />
          )}
        </Box>
        <Button
          sx={{ mt: 3, mb: 3 }}
          variant="contained"
          aria-label="delete"
          onClick={actions.sendFiles}
          endIcon={<EmailIcon />}
        >
          {local.ru.caption.DROP_SEND_BTN}
        </Button>
      </Box>
    );
  }
);

export default Drop;
