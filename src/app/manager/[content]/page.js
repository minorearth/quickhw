"use client";

import { useState, useEffect } from "react";
import { MediaCard } from "./components/mediacard/mediaCard";
import SurvFilesGrid2 from "./components/survFilesGrid";
import { Box } from "@mui/material";
import Fab from "@mui/material/Fab";
import QrCodeIcon from "@mui/icons-material/QrCode";
import { TbQrcode } from "react-icons/tb";
import { TbQrcodeOff } from "react-icons/tb";
import TextField from "@mui/material/TextField";
import { MdSpeakerNotes } from "react-icons/md";
import { MdSpeakerNotesOff } from "react-icons/md";
import SaveIcon from "@mui/icons-material/Save";
import {
  updateDocFieldsInCollectionById,
  getDocFromCollectionById,
} from "../../db/datamodelSSR";

import { Roboto } from "next/font/google";
import localFont from "next/font/local";

import { Qr } from "./components/qr";
const roboto = Roboto({
  weight: "900",
  subsets: ["latin"],
});

const myFont = localFont({ src: "../../fonts/overdozesans.ttf" });

export default function Content({ params }) {
  const [currRow, setCurrRow] = useState();
  const [rows, setRowsx] = useState([]);
  const [qrVisible, setQrVisible] = useState(false);
  const [noteVisible, setNoteVisible] = useState(false);

  const [mediacardVisible, setMediacardVisible] = useState(false);

  const [note, setNote] = useState(
    "Перейдите по ссылке в QR-коде. Нажмите на область загрузки файлов.Cфотографируйте экран монитора, так чтобы был видел номер ПК. Нажмите на область загрузки файлов, выберите файлы для отправки"
  );

  useEffect(() => {
    getDocFromCollectionById("surveys", params.content).then((docData) => {
      // const fileMeta = await getMetadata(file);
      !!docData?.note && setNote(docData?.note);
    });
  }, []);

  const changeNote = (e) => {
    setNote(e.target.value);
  };

  const handleSaveNote = async () => {
    await updateDocFieldsInCollectionById("surveys", params.content, {
      note: note,
    });
  };

  return (
    <Box
      sx={{
        display: "flex",
        direction: "row",
        height: "100%",
        width: "100%",
      }}
    >
      <Fab
        sx={{ position: "absolute", top: 16, right: 16 }}
        color="primary"
        onClick={() => setQrVisible((state) => !state)}
      >
        {!qrVisible ? (
          <TbQrcode style={{ fontSize: 30 }} />
        ) : (
          <TbQrcodeOff style={{ fontSize: 30 }} />
        )}
      </Fab>
      <Fab
        sx={{ position: "absolute", bottom: 16, left: 16 }}
        color="primary"
        onClick={() => setNoteVisible((state) => !state)}
      >
        {!noteVisible ? (
          <MdSpeakerNotes style={{ fontSize: 30 }} />
        ) : (
          <MdSpeakerNotesOff style={{ fontSize: 30 }} />
        )}
      </Fab>
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
        {noteVisible && (
          <>
            <Fab
              sx={{ position: "absolute", bottom: 16, left: 88 }}
              color="primary"
              onClick={() => handleSaveNote()}
            >
              <SaveIcon style={{ fontSize: 30 }} />
            </Fab>
            <TextField
              id="outlined-multiline-static"
              inputProps={{
                style: {
                  color: "#405D72",
                  fontSize: 34,
                  fontStyle: "italic",
                  fontWeight: "bold",
                  fontFamily: myFont.style.fontFamily,
                },
              }}
              sx={{
                m: "10px",
                backgroundColor: "#f4f2f1",
                borderRadius: "20px",

                "& .MuiOutlinedInput-root": {
                  borderRadius: "20px",
                  borderWidth: "10px",
                },
              }}
              // label="Заметка"
              // placeholder="Введите текст заметки, например, задание к уроку сфотографируйте экран ПК, так чтобы был видел номер ПК"
              multiline
              value={note}
              rows={20}
              onChange={(e) => changeNote(e)}
            />
          </>
        )}
        <SurvFilesGrid2
          setCurrRow={setCurrRow}
          rows={rows}
          setRowsx={setRowsx}
          session={params.content}
          setMediacardVisible={setMediacardVisible}
        />
      </Box>
      {mediacardVisible && (
        <MediaCard
          row={currRow}
          session={params.content}
          setRowsx={setRowsx}
          setMediacardVisible={setMediacardVisible}
        />
      )}

      {qrVisible && <Qr session={params.content} />}
    </Box>
  );
}
