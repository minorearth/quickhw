"use client";
import { useState, useEffect } from "react";
import MediaCard from "./components/mediacard/mediaCard.js";
import SurvFilesGrid from "./components/survFilesGrid/survFilesGrid.js";
import { Box } from "@mui/material";
import BlackBoard from "./components/blackBoard.js";
import Qr from "./components/qr.js";
import Progress from "@/components/progress.js";
import progress from "@/store/progress.js";
import { observer } from "mobx-react-lite";
import survey from "@/store/survey.js";
import { downloadUrls } from "@/globals/utils/fileUtils.js";
import FloatMenu from "./floatMenu.js";

const Content = observer(
  ({ rows, setRowsx, mode, note, setNote, saveNote }) => {
    const [currRow, setCurrRow] = useState();
    const [qrVisible, setQrVisible] = useState(false);
    const [noteVisible, setNoteVisible] = useState(false);
    const [mediacardVisible, setMediacardVisible] = useState(false);
    const [pickTypeModalVisible, setPickTypeModalVisible] = useState(false);
    const [qrLink, setQrLink] = useState([]);

    const downloadAll = async () => {
      const urls = rows.map((row) => ({
        url: row.path,
        filename: row.name,
      }));

      progress.setShowProgress(true);
      await downloadUrls(urls);
      progress.setShowProgress(false);
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
        <FloatMenu
          state={{ qrVisible, noteVisible }}
          actions={{
            setQrVisible,
            setNoteVisible,
            downloadAll,
            setPickTypeModalVisible,
            saveNote,
            copyCB: () => navigator.clipboard.writeText(qrLink),
            openDropWindow: () => window.open(qrLink, "_blank"),
          }}
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
          {noteVisible && <BlackBoard note={note} setNote={setNote} />}
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
          <Qr
            surveyid={survey.surveySelectedId}
            pickTypeModalVisible={pickTypeModalVisible}
            setPickTypeModalVisible={setPickTypeModalVisible}
            qrLink={qrLink}
            setQrLink={setQrLink}
          />
        )}
      </Box>
    );
  }
);

export default Content;
