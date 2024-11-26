import * as React from "react";
import Box from "@mui/material/Box";
import Typography from "@mui/material/Typography";
import Modal from "@mui/material/Modal";
import MuiToggleButton from "@mui/material/ToggleButton";
import ToggleButtonGroup from "@mui/material/ToggleButtonGroup";
import { styled } from "@mui/material/styles";
import stn from "@/globals/settings";
import local from "@/globals/local";
import { useState } from "react";
import Tooltip from "@/components/tooltip";

const ToggleButton = styled(MuiToggleButton)({
  "&.Mui-selected, &.Mui-selected:hover": {
    color: "white",
    backgroundColor: "#AE4E9B",
  },
});

const TypePicker = ({
  modalVisible,
  setModalVisible,
  children,
  action,
  caption,
  variants,
  picked,
}) => {
  const [state, setState] = useState(picked);

  const handleClose = () => setModalVisible(false);

  const handleChange = (e, nextView) => {
    if (nextView !== null) {
      console.log("nextView", nextView);
      action(nextView);
      setState(nextView);
    }
  };

  const handleClick = () => {
    setTimeout(() => {
      setModalVisible(false);
    }, stn.typepicker.TYPE_PICKER_TIMEOUT);
  };

  return (
    <Modal
      open={modalVisible}
      onClose={handleClose}
      aria-labelledby="modal-modal-title"
      aria-describedby="modal-modal-description"
    >
      <Box
        sx={{
          position: "absolute",
          top: "50%",
          left: "50%",
          transform: "translate(-50%, -50%)",
          width: 400,
          bgcolor: "background.paper",
          border: "2px solid #000",
          boxShadow: 24,
          p: 4,
        }}
      >
        <Typography
          id="modal-modal-title"
          variant="h6"
          component="h2"
          sx={{ mb: "10px" }}
        >
          {caption}
        </Typography>
        <ToggleButtonGroup
          orientation="vertical"
          value={state}
          exclusive
          onChange={handleChange}
          onClick={handleClick}
          sx={{ width: "100%" }}
        >
          {variants.map((variant, id) => (
            <Tooltip title={variant.TOOLTIP} key={id}>
              <ToggleButton key={id} aria-label="list" value={variant.name}>
                {variant.caption}
              </ToggleButton>
            </Tooltip>
          ))}
        </ToggleButtonGroup>
        {children}
      </Box>
    </Modal>
  );
};

export default TypePicker;
