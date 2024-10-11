import * as React from "react";
import Box from "@mui/material/Box";
// import Button from "@mui/material/Button";
import Typography from "@mui/material/Typography";
import Modal from "@mui/material/Modal";
import MuiToggleButton from "@mui/material/ToggleButton";
import ToggleButtonGroup from "@mui/material/ToggleButtonGroup";
import { styled } from "@mui/material/styles";
import stn from "@/globals/constants";

const style = {
  position: "absolute",
  top: "50%",
  left: "50%",
  transform: "translate(-50%, -50%)",
  width: 400,
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

const ModalForm = ({
  modalVisible,
  setModalVisible,
  children,
  setFileType,
  fileType,
}) => {
  const handleClose = () => setModalVisible(false);

  const handleChange = (event, nextView) => {
    if (nextView !== null) {
      setFileType(nextView);
    }
  };

  const handleClick = (event, nextView) => {
    setTimeout(() => {
      setModalVisible(false);
    }, 500);
  };

  return (
    <Modal
      open={modalVisible}
      onClose={handleClose}
      aria-labelledby="modal-modal-title"
      aria-describedby="modal-modal-description"
    >
      <Box sx={style}>
        <Typography
          id="modal-modal-title"
          variant="h6"
          component="h2"
          sx={{ mb: "10px" }}
        >
          Что будем собирать?
        </Typography>
        <ToggleButtonGroup
          orientation="vertical"
          value={fileType}
          exclusive
          onChange={handleChange}
          onClick={handleClick}
          sx={{ width: "100%" }}
        >
          <ToggleButton aria-label="list" value={stn.files.droptypes.IMAGES}>
            Изображения
          </ToggleButton>
          <ToggleButton aria-label="module" value={stn.files.droptypes.FILES}>
            Файлы
          </ToggleButton>
        </ToggleButtonGroup>
        {children}
      </Box>
    </Modal>
  );
};

export default ModalForm;
