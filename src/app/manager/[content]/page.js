"use client";

import { useState, useEffect } from "react";
import { MediaCard } from "./components/mediacard/mediaCard";
import SurvFilesGrid2 from "./components/survFilesGrid";
import { Box } from "@mui/material";
import Fab from "@mui/material/Fab";
import QrCodeIcon from "@mui/icons-material/QrCode";
import { Qr } from "./components/qr";

export default function Content({ params }) {
  const [currRow, setCurrRow] = useState();
  const [rows, setRowsx] = useState([]);
  const [qrVisible, setQrVisible] = useState(false);
  const [mediacardVisible, setMediacardVisible] = useState(false);

  return (
    <Box
      sx={{ display: "flex", direction: "row", height: "100%", width: "100%" }}
    >
      <Fab
        sx={{ position: "absolute", top: 16, right: 16 }}
        color="primary"
        onClick={() => setQrVisible((state) => !state)}
      >
        <QrCodeIcon />
      </Fab>

      <SurvFilesGrid2
        setCurrRow={setCurrRow}
        rows={rows}
        setRowsx={setRowsx}
        session={params.content}
        setMediacardVisible={setMediacardVisible}
      />
      {mediacardVisible && (
        <MediaCard row={currRow} session={params.content} setRowsx={setRowsx} />
      )}

      {qrVisible && <Qr session={params.content} />}
    </Box>
  );
}
