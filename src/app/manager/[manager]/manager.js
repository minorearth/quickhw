"use client";
import SurveyGrid from "./surveygrid/surveygrid.js";
import { useState } from "react";
import Splash from "../../../components/splash/splash.js";
import stn from "../../constants.js";
import SurveyModal from "./surveyModal.js";

export default function Manager({ user, setProfileVisible }) {
  const [closeSplash, setCloseSplash] = useState(false);
  const [modalVisible, setModalVisible] = useState(false);
  const [surveyid, setSurveyid] = useState("");

  return (
    <>
      {!closeSplash && (
        <Splash
          setCloseSplash={setCloseSplash}
          duration={stn.SPLASH_DURATION}
        />
      )}
      {closeSplash && (
        <>
          <SurveyModal
            modalVisible={modalVisible}
            setModalVisible={setModalVisible}
            surveyid={surveyid}
          />
          <SurveyGrid
            user={user}
            setSurveyid={setSurveyid}
            setModalVisible={setModalVisible}
          />
        </>
      )}
    </>
  );
}
