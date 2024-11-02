import { useState, useEffect } from "react";
import QRCode from "react-qr-code";
import { Box } from "@mui/material";
import Radio from "@mui/material/Radio";
import RadioGroup from "@mui/material/RadioGroup";
import FormControlLabel from "@mui/material/FormControlLabel";
import FabAnimated from "@/components/fabAnimated/fabAnimated";
import user from "@/store/user";
import Picktype from "../../../../../components/typepicker/typepicker.js";
import stn from "@/globals/constants";

export const Qr = ({ surveyid }) => {
  const [qrLink, setQrLink] = useState([]);
  const [pickTypeModalVisible, setPickTypeModalVisible] = useState(false);
  const [fileType, setFileType] = useState(stn.files.PICKER.droptypes[0].type);

  useEffect(() => {
    setQrLink(
      `${process.env.NEXT_PUBLIC_DOMAIN}/df/${fileType}/${surveyid}/${user.userid}`
    );
    return () => {
      console.log("qr unmounted");
    };
  }, [fileType, surveyid]);

  useEffect(() => {
    setPickTypeModalVisible(true);
  }, []);

  return (
    <Box
      sx={{
        flex: 1,
        width: "100%",
        height: "100%",
        display: "flex",
        justifyContent: "center",
        alignItems: "center",
      }}
    >
      {pickTypeModalVisible && (
        <Picktype
          modalVisible={pickTypeModalVisible}
          setModalVisible={setPickTypeModalVisible}
          action={(state) => setFileType(state)}
          variants={stn.files.PICKER.droptypes}
          picked={fileType}
          caption={"Что будем собирать?"}
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
          setPickTypeModalVisible(true);
        }}
        position={{ top: 16, right: 164 }}
      />

      <QRCode
        style={{
          flex: 1,
          width: "85%",
          height: "100%",
        }}
        value={qrLink}
      />
    </Box>
  );
};
