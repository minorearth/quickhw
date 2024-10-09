import { useState, useEffect } from "react";
import QRCode from "react-qr-code";
import { Box } from "@mui/material";
import Radio from "@mui/material/Radio";
import RadioGroup from "@mui/material/RadioGroup";
import FormControlLabel from "@mui/material/FormControlLabel";
import FabAnimated from "@/components/fabAnimated/fabAnimated";
import user from "@/store/user";
import Picktype from "../components/typepicker/typepicker.js";
import stn from "@/app/constants";

export const Qr = ({
  surveyid,
  modalVisible,
  setModalVisible,
  fileType,
  setFileType,
  surveyname,
}) => {
  const [qrLink, setQrLink] = useState([]);

  const handleChange = (event) => {
    setFileType(event.target.value);
  };

  useEffect(() => {
    setQrLink(
      `${process.env.NEXT_PUBLIC_DOMAIN}/dropfiles/${fileType}/${surveyid}/${user.userid}/${surveyname}`
    );
    return () => {
      console.log("qr unmounted");
    };
  }, [fileType, surveyid]);

  useEffect(() => {
    setModalVisible(true);
  }, []);

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
      {modalVisible && (
        <Picktype
          modalVisible={modalVisible}
          setModalVisible={setModalVisible}
          setFileType={setFileType}
          fileType={fileType}
        />
      )}

      <FabAnimated
        icon="copyClipboard"
        visible={true}
        action={() => navigator.clipboard.writeText(qrLink)}
        position={{ top: 16, right: 88 }}
      />
      <FabAnimated
        icon="pickFileType"
        visible={true}
        action={() => {
          setModalVisible(true);
        }}
        position={{ top: 16, right: 164 }}
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
      {/* <RadioGroup
        row
        aria-labelledby="demo-controlled-radio-buttons-group"
        name="controlled-radio-buttons-group"
        value={fileType}
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
      </RadioGroup> */}
    </Box>
  );
};
