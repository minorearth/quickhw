import * as React from "react";
import Box from "@mui/material/Box";
import Modal from "@mui/material/Modal";
import MuiToggleButton from "@mui/material/ToggleButton";
import { styled } from "@mui/material/styles";
import stn from "@/app/constants";
import Survey from "../[manager]/content/[content]/survey";

const style = {
  position: "absolute",
  top: "3px",
  left: "3px",
  bottom: "3px",
  right: "3px",
  // transform: "translate(-3%, -3%)",
  bgcolor: "background.paper",
  border: "2px solid #000",
  boxShadow: 24,
  p: 4,
};

const ToggleButton = styled(MuiToggleButton)({
  "&.Mui-selected, &.Mui-selected:hover": {
    color: "white",
    backgroundColor: "#AE4E9B",
  },
});

const ModalForm = ({ modalVisible, setModalVisible, surveyid }) => {
  const handleClose = () => setModalVisible(false);

  const handleChange = (event, nextView) => {
    // setFileType(nextView);
  };

  return (
    <Modal
      open={modalVisible}
      onClose={handleClose}
      aria-labelledby="modal-modal-title"
      aria-describedby="modal-modal-description"
    >
      <Box sx={style}>
        <Survey surveyid={surveyid} setSurveyVisible={setModalVisible} />
      </Box>
    </Modal>
  );
};

export default ModalForm;
