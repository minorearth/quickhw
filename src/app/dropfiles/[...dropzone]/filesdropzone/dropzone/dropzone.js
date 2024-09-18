import Box from "@mui/material/Box";
import IconButton from "@mui/material/IconButton";
import { Snack } from "../../../../components/snackbar";
import Progress from "@/app/components/progress";
import Drop from "../drop";
import TextField from "@mui/material/TextField";
import EmailIcon from "@mui/icons-material/Email";
import useDropZone from "./dropzoneVM";

const DropZone = ({ session, type }) => {
  const { actions, state } = useDropZone({ session, type });
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
      <Snack snackopen={state.snack} setSnackopen={actions.setSnackopen} />
      <Progress open={state.showProgress} perc={state.progress} />
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
          label="Укажи фамилию"
          variant="outlined"
          sx={{ margin: "10px" }}
          onChange={(e) => actions.changeName(e)}
          value={state.name}
          fullWidth
          InputProps={{ sx: { borderRadius: 5 } }}
        />
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
        <Drop files={state.files} setFiles={actions.setFiles} type={type} />
      </Box>
    </Box>
  );
};

export default DropZone;
