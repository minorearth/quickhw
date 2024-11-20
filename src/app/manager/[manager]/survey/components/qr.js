import { useState, useEffect } from "react";
import QRCode from "react-qr-code";
import { Box } from "@mui/material";
import user from "@/store/user";
import Picktype from "../../../../../components/typepicker.js";
import stn from "@/globals/settings.js";
import local from "@/globals/local";
import survey from "@/store/survey.js";
import { observer } from "mobx-react-lite";
import { autorun } from "mobx";
import { getSubKeyValues } from "@/globals/utils/objectUtils.js";

const encodeTypes = (fileType, type) => {
  console.log("zxxz", fileType, type);

  return (
    stn.surveys.filetypes[fileType].SHORTNAME +
    stn.surveys.surveytypes[!type ? "task" : type].SHORTNAME
  );
};

const Qr = observer(
  ({
    surveyid,
    setPickTypeModalVisible,
    pickTypeModalVisible,
    qrLink,
    setQrLink,
  }) => {
    //TODO
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
            caption={local.ru.text.PICK_FILE_TYPE}
          />
        )}

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
  }
);

export default Qr;
