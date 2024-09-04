"use client";

import { useState, useEffect } from "react";
import { MediaCard } from "./mediaCard";
import { DataGrid } from "@mui/x-data-grid";
import SurvFilesGrid from "./survFilesGrid";
import SurvFilesGrid2 from "./survFilesGrid2";
import QRCode from "react-qr-code";
import { Box } from "@mui/material";
import Fab from "@mui/material/Fab";
import QrCodeIcon from "@mui/icons-material/QrCode";

export default function Content({ params }) {
  const [currRow, setCurrRow] = useState();
  const [rows, setRowsx] = useState([]);
  const [qrLink, setQrLink] = useState([]);
  const [qrVisible, setQrVisible] = useState(false);

  useEffect(() => {
    setQrLink(
      `${process.env.NEXT_PUBLIC_DOMAIN}/dropfiles/img/${params.content}`
    );
  }, []);

  return (
    <Box
      sx={{ display: "flex", direction: "row", height: "100%", width: "100%" }}
    >
      <Fab
        sx={{ position: "absolute", top: 16, right: 16 }}
        variant="extended"
        onClick={() => setQrVisible((state) => !state)}
      >
        <QrCodeIcon sx={{ mr: 1 }} />
        Показать QR-код
      </Fab>
      <SurvFilesGrid2
        setCurrRow={setCurrRow}
        rows={rows}
        setRowsx={setRowsx}
        session={params.content}
      />
      <MediaCard row={currRow} session={params.content} setRowsx={setRowsx} />

      {qrVisible && (
        <QRCode
          style={{
            flex: 1,
            height: "auto",
            maxHeight: "100%",
            maxWidth: "100%",
            width: "100%",
          }}
          value={qrLink}
        />
      )}
    </Box>
  );
}
