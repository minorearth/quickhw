import * as React from "react";
import Box from "@mui/material/Box";
import Modal from "@mui/material/Modal";
import stn from "@/globals/settings";
import local from "@/globals/local";
import Survey from "./survey";
import ModalBar from "@/components/modalBar";
import { observer } from "mobx-react-lite";
import survey from "@/store/survey";
import useSurvFilesGrid2VC from "./surveyVC";

const ModalForm = observer(({ mode }) => {
  const { rows, setRowsx, saveNote, note, setNote } = useSurvFilesGrid2VC({
    surveyid: survey.surveySelectedId,
  });

  const handleClose = () => {
    survey.setShowSurvey(false);
    setRowsx([]);
  };

  return (
    <Modal
      open={survey.showSurvey}
      onClose={handleClose}
      aria-labelledby="modal-modal-title"
      aria-describedby="modal-modal-description"
    >
      <Box
        sx={{
          position: "absolute",
          display: "flex",
          flexDirection: "column",
          top: "3px",
          left: "3px",
          bottom: "3px",
          right: "3px",
          bgcolor: "background.paper",
          border: "2px solid #000",
          boxShadow: 0,
          borderRadius: "10px 10px 0px 0px",
        }}
      >
        <ModalBar
          closeAction={handleClose}
          caption={survey.surveySelectedName}
        />
        <Survey
          rows={rows}
          setRowsx={setRowsx}
          mode={mode}
          note={note}
          setNote={setNote}
          saveNote={saveNote}
        />
      </Box>
    </Modal>
  );
});

export default ModalForm;
