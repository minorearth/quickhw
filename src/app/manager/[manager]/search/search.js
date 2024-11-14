"use client";
import { useState, useEffect } from "react";
import { Box } from "@mui/material";
import { observer } from "mobx-react-lite";
import stn from "@/globals/constants.js";
import * as React from "react";
import Modal from "@mui/material/Modal";
import IconButton from "@mui/material/IconButton";
import { searchInIndexClient } from "@/app/domain/domain";
import SearchIcon from "@mui/icons-material/Search";
import TextField from "@mui/material/TextField";
import ModalBar from "@/components/modalBar.js";
import Survey from "@/app/manager/[manager]/survey/survey.js";
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
  boxShadow: "none",
  flex: 1,
  borderRadius: "10px 10px 0px 0px",
};

const SearchCard = observer(({ searchVisible, setSearchVisible, user }) => {
  const [searchRows, setSearchRows] = useState([]);

  const handleSearch = () => {
    searchInIndexClient(user, searchString.toUpperCase(), setSearchRows);
  };

  const [searchString, setSearchString] = useState("");

  const changeSearchString = (e) => {
    setSearchString(e.target.value);
  };

  return (
    <Modal
      open={searchVisible}
      aria-labelledby="modal-modal-title"
      aria-describedby="modal-modal-description"
    >
      <Box sx={style}>
        <ModalBar closeAction={() => setSearchVisible(false)} />
        <Box sx={{ display: "flex", flexDirection: "row" }}>
          <IconButton
            aria-label="delete"
            size="small"
            onClick={() => handleSearch()}
          >
            <SearchIcon sx={{ fontSize: 60 }} />
          </IconButton>
          <TextField
            id="outlined-basic"
            label={stn.caption.ENTER_NAME}
            variant="outlined"
            sx={{ margin: "10px" }}
            onChange={(e) => changeSearchString(e)}
            value={searchString}
            fullWidth
            InputProps={{ sx: { borderRadius: 5 } }}
          />
        </Box>
        <Survey rows={searchRows} setRowsx={setSearchRows} mode={"search"} />
      </Box>
    </Modal>
  );
});

export default SearchCard;
