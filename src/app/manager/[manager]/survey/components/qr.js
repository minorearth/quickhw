import { useState, useEffect } from "react";
import QRCode from "react-qr-code";
import { Box } from "@mui/material";
import FabAnimated from "@/components/fabAnimated/fabAnimated";
import user from "@/store/user";
import Picktype from "../../../../../components/typepicker/typepicker.js";
import stn from "@/globals/constants";
import survey from "@/store/survey.js";
import { observer } from "mobx-react-lite";
import { autorun } from "mobx";
import { getSubKeyValues } from "@/globals/utils/objectUtils.js";

const encodeTypes = (fileType, type) => {
  return (
    stn.surveys.filetypes[fileType].SHORTNAME +
    stn.surveys.surveytypes[!type ? "task" : type].SHORTNAME
  );
};

const Qr = observer(({ surveyid }) => {
  const [qrLink, setQrLink] = useState([]);
  const [pickTypeModalVisible, setPickTypeModalVisible] = useState(false);

  // autorun(() => {
  //   console.log("Energy level:", survey.filetype);
  // });

  useEffect(() => {
    const dropType = encodeTypes(survey.filetype, survey.surveySelectedType);
    console.log(dropType);
    setQrLink(
      `${process.env.NEXT_PUBLIC_DOMAIN}/df/${dropType}/${surveyid}/${user.userid}`
    );
    return () => {
      console.log("qr unmounted");
    };
  }, [survey.filetype, survey.surveySelectedType, surveyid]);

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
          action={(state) => survey.setSurveyFileType(state)}
          variants={getSubKeyValues(stn.surveys.filetypes)}
          picked={survey.filetype}
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
});

export default Qr;
