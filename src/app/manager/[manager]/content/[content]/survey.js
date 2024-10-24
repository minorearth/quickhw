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
import stn from "@/globals/constants.js";

const Content = observer(({ surveyid, setSurveyVisible, surveyname }) => {
  const [currRow, setCurrRow] = useState();
  const [rows, setRowsx] = useState([]);
  const [qrVisible, setQrVisible] = useState(false);
  const [noteVisible, setNoteVisible] = useState(false);
  const [mediacardVisible, setMediacardVisible] = useState(false);
  const [modalVisible, setModalVisible] = useState(false);
  const [fileType, setFileType] = useState(stn.files.droptypes.IMAGES);

  return (
    <Box
      sx={{
        display: "flex",
        flex: 1,
        overflow: "auto",
        width: "100%",
      }}
    >
      <Progress open={progress.showProgress} />
      <FabAnimated
        icon="qr"
        visible={qrVisible}
        action={() => setQrVisible((state) => !state)}
        position={{ top: 16, right: 16 }}
      />
      <FabAnimated
        icon="note"
        visible={noteVisible}
        action={() => setNoteVisible((state) => !state)}
        position={{ bottom: 16, left: 16 }}
      />

      <Box
        sx={{
          display: "flex",
          flexDirection: "column",
          width: "100%",
          minWidth: "30%",
          flex: 1,
        }}
      >
        {noteVisible && <BlackBoard surveyid={surveyid} />}
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
      {qrVisible && (
        <Qr
          surveyid={surveyid}
          modalVisible={modalVisible}
          setModalVisible={setModalVisible}
          fileType={fileType}
          setFileType={setFileType}
          surveyname={surveyname}
        />
      )}
    </Box>
  );
});

export default Content;
