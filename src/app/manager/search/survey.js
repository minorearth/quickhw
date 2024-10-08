"use client";

import { useState, useEffect } from "react";
import MediaCard from "./components/mediacard/mediaCard.js";
import SurvFilesGrid2 from "./components/survFilesGrid/survFilesGri.js";
import { Box } from "@mui/material";
import BlackBoard from "./components/blackBoard.js";
import FabAnimated from "@/components/fabAnimated/fabAnimated.js";
import { Qr } from "./components/qr.js";
import Progress from "@/components/progress.js";
import progress from "@/store/progress.js";
import { observer } from "mobx-react-lite";
import stn from "@/app/constants.js";

const Content = observer(({ surveyid, setSurveyVisible }) => {
  const [currRow, setCurrRow] = useState();
  const [rows, setRowsx] = useState([]);
  const [qrVisible, setQrVisible] = useState(false);
  const [noteVisible, setNoteVisible] = useState(false);
  const [mediacardVisible, setMediacardVisible] = useState(false);
  // const [open, setOpen] = React.useState(false);
  const [modalVisible, setModalVisible] = useState(false);
  const [fileType, setFileType] = useState(stn.files.droptypes.IMAGES);

  return (
    <Box
      sx={{
        display: "flex",
        direction: "row",
        height: "100%",
        width: "100%",
      }}
    >
      <Progress open={progress.showProgress} />
      <FabAnimated
        icon="close"
        visible={noteVisible}
        action={() => setSurveyVisible(false)}
        position={{ top: 16, left: 16 }}
      />

      <Box
        sx={{
          display: "flex",
          flexDirection: "column",
          height: "100%",
          width: "100%",
          minWidth: "30%",
          width: "100%",
          height: "100%",
          flex: 1,
        }}
      >
        <SurvFilesGrid2
          setCurrRow={setCurrRow}
          rows={rows}
          setRowsx={setRowsx}
          surveyid={surveyid}
          setMediacardVisible={setMediacardVisible}
        />
      </Box>
      {mediacardVisible && !!currRow && (
        <MediaCard
          setCurrRow={setCurrRow}
          setMediacardVisible={setMediacardVisible}
          currRow={currRow}
          surveyid={surveyid}
          setRowsx={setRowsx}
        />
      )}
    </Box>
  );
});

export default Content;
