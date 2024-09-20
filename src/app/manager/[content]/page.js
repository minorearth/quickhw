"use client";

import { useState, useEffect } from "react";
import MediaCard from "./components/mediaCard/mediaCard";
import SurvFilesGrid2 from "./components/survFilesGrid";
import { Box } from "@mui/material";
import BlackBoard from "../[content]/components/blackBoard";
import FabAnimated from "../../components/fabAnimated/fabAnimated";
import { Qr } from "./components/qr";

export default function Content({ params }) {
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
        {noteVisible && <BlackBoard session={params.content} />}
        <SurvFilesGrid2
          setCurrRow={setCurrRow}
          rows={rows}
          setRowsx={setRowsx}
          session={params.content}
          setMediacardVisible={setMediacardVisible}
        />
      </Box>
      {mediacardVisible && !!currRow && (
        <MediaCard
          setCurrRow={setCurrRow}
          setMediacardVisible={setMediacardVisible}
          row={currRow}
          session={params.content}
          setRowsx={setRowsx}
        />
      )}

      {qrVisible && <Qr session={params.content} />}
    </Box>
  );
}
