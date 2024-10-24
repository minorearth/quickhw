"use client";
import { useState, useEffect } from "react";
import SearchGrid from "./components/survFilesGrid/survFilesGri.js";
import { Box } from "@mui/material";
import FabAnimated from "@/components/fabAnimated/fabAnimated.js";
import Progress from "@/components/progress.js";
import progress from "@/store/progress.js";
import { observer } from "mobx-react-lite";
import stn from "@/globals/constants.js";
import { Search } from "@mui/icons-material";
import * as React from "react";
import Modal from "@mui/material/Modal";
import MediaCard from "../[manager]/content/[content]/components/mediacard/mediaCard.js";
import AddCircleIcon from "@mui/icons-material/AddCircle";
import IconButton from "@mui/material/IconButton";
import { searchInIndex } from "../../admin/adminVC.js";
import SearchIcon from "@mui/icons-material/Search";
import TextField from "@mui/material/TextField";
import ModalBar from "@/components/modalBar.js";

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

const SearchCard = observer(
  ({
    searchVisible,
    setSearchVisible,
    setSurveyid,
    setSurveyname,
    setSurveyModalVisible,
    user,
  }) => {
    const [currRow, setCurrRow] = useState();
    const [mediacardVisible, setMediacardVisible] = useState(false);
    const [searchSurveyid, setSearchSurveyid] = useState("");
    const [searchRows, setSearchRows] = useState([]);

    const handleSearch = () => {
      searchInIndex(user, searchString.toUpperCase(), setSearchRows);
    };

    const [searchString, setSearchString] = useState("");

    const changeSearchString = (e) => {
      setSearchString(e.target.value);
    };

    return (
      <Modal
        open={searchVisible}
        // onClose={handleClose}
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
          <Box
            sx={{
              display: "flex",
              direction: "row",
              flex: 1,
              width: "100%",
              overflow: "auto",
            }}
          >
            <Progress open={progress.showProgress} />
            <Box
              sx={{
                display: "flex",
                flexDirection: "column",
                height: "100%",
                width: "100%",
                minWidth: "30%",
                flex: 1,
              }}
            >
              <SearchGrid
                setSurveyModalVisible={setSurveyModalVisible}
                setCurrRow={setCurrRow}
                rows={searchRows}
                setMediacardVisible={setMediacardVisible}
                setSearchSurveyid={setSearchSurveyid}
                setSurveyid={setSurveyid}
                setSurveyname={setSurveyname}
              />
            </Box>
            {mediacardVisible && !!currRow && (
              <MediaCard
                setCurrRow={setCurrRow}
                setMediacardVisible={setMediacardVisible}
                currRow={currRow}
                surveyid={searchSurveyid}
                setRowsx={setSearchRows}
              />
            )}
          </Box>
        </Box>
      </Modal>
    );
  }
);

export default SearchCard;
