import * as React from "react";
import Box from "@mui/material/Box";
import Modal from "@mui/material/Modal";
import MuiToggleButton from "@mui/material/ToggleButton";
import { styled } from "@mui/material/styles";
import stn from "@/globals/constants";
import Survey from "../[manager]/content/[content]/survey";
import ModalBar from "@/components/modalBar";

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
  // flex: 1,
  // overflow: "auto",
  // height: "95%",
  borderRadius: "17px 17px 0px 0px",

  // p: "4px",
};

const ToggleButton = styled(MuiToggleButton)({
  "&.Mui-selected, &.Mui-selected:hover": {
    color: "white",
    backgroundColor: "#AE4E9B",
  },
});

const ModalForm = ({ modalVisible, setModalVisible, surveyid, surveyname }) => {
  const handleClose = () => setModalVisible(false);

  return (
    <Modal
      open={modalVisible}
      onClose={handleClose}
      aria-labelledby="modal-modal-title"
      aria-describedby="modal-modal-description"
    >
      <Box sx={style}>
        <ModalBar closeAction={handleClose} caption={surveyname} />
        <Survey
          surveyid={surveyid}
          setSurveyVisible={setModalVisible}
          surveyname={surveyname}
        />
      </Box>
    </Modal>
  );
};

export default ModalForm;
