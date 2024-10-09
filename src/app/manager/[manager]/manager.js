"use client";
import SurveyGrid from "./surveygrid/surveygrid.js";
import { useState } from "react";
import Splash from "../../../components/splash/splash.js";
import stn from "../../constants.js";
import SurveyModal from "./surveyModal.js";
import SearchCard from "../search/search.js";

export default function Manager({ user, setProfileVisible }) {
  const [closeSplash, setCloseSplash] = useState(false);
  const [modalVisible, setModalVisible] = useState(false);
  const [searchVisible, setSearchVisible] = useState(false);
  const [surveyid, setSurveyid] = useState("");
  const [surveyname, setSurveyname] = useState("");

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
            surveyname={surveyname}
          />
          <SearchCard
            searchVisible={searchVisible}
            setSearchVisible={setSearchVisible}
          />
          <SurveyGrid
            user={user}
            setSurveyid={setSurveyid}
            setSurveyname={setSurveyname}
            setModalVisible={setModalVisible}
            setSearchVisible={setSearchVisible}
          />
        </>
      )}
    </>
  );
}
