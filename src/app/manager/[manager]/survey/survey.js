"use client";

import { useState, useEffect } from "react";
import MediaCard from "./components/mediacard/mediaCard.js";
import SurvFilesGrid from "./components/survFilesGrid/survFilesGrid.js";
import { Box } from "@mui/material";
import BlackBoard from "./components/blackBoard.js";
import FabAnimated from "@/components/fabAnimated/fabAnimated.js";
import Qr from "./components/qr.js";
import Progress from "@/components/progress.js";
import progress from "@/store/progress.js";
import { observer } from "mobx-react-lite";
import survey from "@/store/survey.js";
import { downloadUrls } from "@/globals/utils/fileUtils.js";

const Content = observer(({ rows, setRowsx, mode }) => {
  const [currRow, setCurrRow] = useState();
  const [qrVisible, setQrVisible] = useState(false);
  const [noteVisible, setNoteVisible] = useState(false);
  const [mediacardVisible, setMediacardVisible] = useState(false);

  const downloadAll = () => {
    const urls = rows.map((row) => ({
      url: row.path,
      filename: row.name,
    }));

    downloadUrls(urls);
  };

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
      {mode != "search" && (
        <FabAnimated
          icon="qr"
          visible={qrVisible}
          action={() => setQrVisible((state) => !state)}
          position={{ top: 16, right: 16 }}
        />
      )}
      {mode != "search" && (
        <FabAnimated
          icon="note"
          visible={noteVisible}
          action={() => setNoteVisible((state) => !state)}
          position={{ bottom: 16, left: 80 }}
        />
      )}
      {mode != "search" && (
        <FabAnimated
          icon="downloadall"
          visible={noteVisible}
          action={() => downloadAll()}
          position={{ bottom: 16, left: 16 }}
        />
      )}

      <Box
        sx={{
          display: "flex",
          flexDirection: "column",
          width: "100%",
          minWidth: "30%",
          flex: 1,
        }}
      >
        {noteVisible && <BlackBoard surveyid={survey.surveySelectedId} />}
        <SurvFilesGrid
          setCurrRow={setCurrRow}
          rows={rows}
          setMediacardVisible={setMediacardVisible}
          mode={mode}
        />
      </Box>
      {mediacardVisible && !!currRow && (
        <MediaCard
          setCurrRow={setCurrRow}
          setMediacardVisible={setMediacardVisible}
          currRow={currRow}
          surveyid={survey.surveySelectedId}
          setRowsx={setRowsx}
        />
      )}
      {qrVisible && mode != "search" && (
        <Qr surveyid={survey.surveySelectedId} />
      )}
    </Box>
  );
});

export default Content;
