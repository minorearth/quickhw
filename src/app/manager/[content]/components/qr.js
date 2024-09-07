import { useState, useEffect } from "react";
import QRCode from "react-qr-code";
import { Box } from "@mui/material";
import Radio from "@mui/material/Radio";
import RadioGroup from "@mui/material/RadioGroup";
import FormControlLabel from "@mui/material/FormControlLabel";
import Fab from "@mui/material/Fab";
import LinkIcon from "@mui/icons-material/Link";

export const Qr = ({ session }) => {
  const [qrLink, setQrLink] = useState([]);
  const [value, setValue] = useState("img");

  const handleChange = (event) => {
    setValue(event.target.value);
  };

  useEffect(() => {
    setQrLink(
      `${process.env.NEXT_PUBLIC_DOMAIN}/dropfiles/${value}/${session}`
    );
  }, [value, session]);

  return (
    <Box
      sx={{
        flex: 1,
        height: "auto",
        maxHeight: "100%",
        maxWidth: "100%",
        width: "100%",
        display: "flex",
        flexDirection: "column",
        justifyContent: "space-around",
        alignItems: "center",
      }}
    >
      <Fab
        sx={{ position: "absolute", top: 16, right: 88 }}
        color="primary"
        onClick={() => {
          navigator.clipboard.writeText(qrLink);
        }}
      >
        <LinkIcon />
      </Fab>
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
      <RadioGroup
        row
        aria-labelledby="demo-controlled-radio-buttons-group"
        name="controlled-radio-buttons-group"
        value={value}
        onChange={handleChange}
        sx={{ marginBottom: "20px" }}
      >
        <FormControlLabel
          value="img"
          control={<Radio />}
          label="Собрать изображения"
        />
        <FormControlLabel
          value="files"
          control={<Radio />}
          label="собрать файлы"
        />
      </RadioGroup>
    </Box>
  );
};
