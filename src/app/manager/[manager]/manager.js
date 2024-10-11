"use client";
import SurveyGrid from "./surveygrid/surveygrid.js";
import { useState } from "react";
import Splash from "../../../components/splash/splash.js";
import stn from "@/globals/constants";
import SurveyModal from "./surveyModal.js";
import SearchCard from "../search/search.js";

export default function Manager({ user, setProfileVisible }) {
  const [closeSplash, setCloseSplash] = useState(false);
  const [surveyModalVisible, setSurveyModalVisible] = useState(false);
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
            modalVisible={surveyModalVisible}
            setModalVisible={setSurveyModalVisible}
            surveyid={surveyid}
            surveyname={surveyname}
          />
          <SearchCard
            user={user}
            searchVisible={searchVisible}
            setSearchVisible={setSearchVisible}
            setSurveyid={setSurveyid}
            setSurveyModalVisible={setSurveyModalVisible}
            setSurveyname={setSurveyname}
          />
          <SurveyGrid
            user={user}
            setSurveyid={setSurveyid}
            setSurveyname={setSurveyname}
            setModalVisible={setSurveyModalVisible}
            setSearchVisible={setSearchVisible}
          />
        </>
      )}
    </>
  );
}
