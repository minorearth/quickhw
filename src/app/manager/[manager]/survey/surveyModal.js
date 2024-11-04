import * as React from "react";
import Box from "@mui/material/Box";
import Modal from "@mui/material/Modal";
import MuiToggleButton from "@mui/material/ToggleButton";
import { styled } from "@mui/material/styles";
import stn from "@/globals/constants";
import Survey from "./survey";
import ModalBar from "@/components/modalBar";
import { observer } from "mobx-react-lite";
import survey from "@/store/survey";
import useSurvFilesGrid2VC from "./surveyVC";

const style = {
  position: "absolute",
  display: "flex",
  flexDirection: "column",
  top: "3px",
  left: "3px",
  bottom: "3px",
  right: "3px",
  // transform: "translate(-3%, -3%)",
  bgcolor: "background.paper",
  border: "2px solid #000",
  boxShadow: 0,
  borderRadius: "10px 10px 0px 0px",
};

const ToggleButton = styled(MuiToggleButton)({
  "&.Mui-selected, &.Mui-selected:hover": {
    color: "white",
    backgroundColor: "#AE4E9B",
  },
});

const ModalForm = observer(({ mode }) => {
  const handleClose = () => survey.setShowSurvey(false);
  const { rows, setRowsx } = useSurvFilesGrid2VC({
    surveyid: survey.surveySelectedId,
  });

  return (
    <Modal
      open={survey.showSurvey}
      onClose={handleClose}
      aria-labelledby="modal-modal-title"
      aria-describedby="modal-modal-description"
    >
      <Box sx={style}>
        <ModalBar
          closeAction={handleClose}
          caption={survey.surveySelectedName}
        />
        <Survey rows={rows} setRowsx={setRowsx} mode={mode} />
      </Box>
    </Modal>
  );
});

export default ModalForm;
