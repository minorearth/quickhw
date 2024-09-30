import { useState, useEffect } from "react";
import QRCode from "react-qr-code";
import { Box } from "@mui/material";
import Radio from "@mui/material/Radio";
import RadioGroup from "@mui/material/RadioGroup";
import FormControlLabel from "@mui/material/FormControlLabel";
import FabAnimated from "@/components/fabAnimated/fabAnimated";
import stn from "@/app/constants";

export const Qr = ({ surveyid }) => {
  const [qrLink, setQrLink] = useState([]);
  const [value, setValue] = useState(stn.files.droptypes.IMAGES);

  const handleChange = (event) => {
    setValue(event.target.value);
  };

  useEffect(() => {
    setQrLink(
      `${process.env.NEXT_PUBLIC_DOMAIN}/dropfiles/${value}/${surveyid}`
    );
    return () => {
      console.log("qr unmounted");
    };
  }, [value, surveyid]);

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
      <FabAnimated
        icon="copyClipboard"
        visible={true}
        action={() => navigator.clipboard.writeText(qrLink)}
        position={{ top: 16, right: 88 }}
      />

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
          value={stn.files.droptypes.IMAGES}
          control={<Radio />}
          label="собрать изображения"
        />
        <FormControlLabel
          value={stn.files.droptypes.FILES}
          control={<Radio />}
          label="собрать файлы"
        />
      </RadioGroup>
    </Box>
  );
};
