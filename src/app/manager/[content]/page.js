"use client";

import { useState, useEffect } from "react";
import MediaCard from "./components/mediacard/mediaCard.js";
import SurvFilesGrid2 from "./components/survFilesGrid/survFilesGri.js";
import { Box } from "@mui/material";
import BlackBoard from "../[content]/components/blackBoard";
import FabAnimated from "../../../components/fabAnimated/fabAnimated.js";
import { Qr } from "./components/qr";
import Progress from "@/components/progress.js";
import progress from "@/app/store/progress";
import { observer } from "mobx-react-lite";

const Content = observer(({ params }) => {
  const [currRow, setCurrRow] = useState();
  const [rows, setRowsx] = useState([]);
  const [qrVisible, setQrVisible] = useState(false);
  const [noteVisible, setNoteVisible] = useState(false);
  const [mediacardVisible, setMediacardVisible] = useState(false);

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
          height: "100%",
          width: "100%",
          minWidth: "30%",
          width: "100%",
          height: "100%",
          flex: 1,
        }}
      >
        {noteVisible && <BlackBoard surveyid={params.content} />}
        <SurvFilesGrid2
          setCurrRow={setCurrRow}
          rows={rows}
          setRowsx={setRowsx}
          surveyid={params.content}
          setMediacardVisible={setMediacardVisible}
        />
      </Box>
      {mediacardVisible && !!currRow && (
        <MediaCard
          setCurrRow={setCurrRow}
          setMediacardVisible={setMediacardVisible}
          currRow={currRow}
          surveyid={params.content}
          setRowsx={setRowsx}
        />
      )}
      {qrVisible && <Qr surveyid={params.content} />}
    </Box>
  );
});

export default Content;
