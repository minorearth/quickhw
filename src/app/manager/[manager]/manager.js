"use client";
import MySurveysGrid from "@/app/manager/[manager]/mySurveysGrid/mySurveysGrid.js";
import { useState } from "react";
import Splash from "@/components/splash/splash.js";
import stn from "@/globals/settings.js";
import SurveyModal from "./survey/surveyModal.js";
import SearchCard from "@/app/manager/[manager]/search/search.js";

export default function Manager({ user }) {
  const [closeSplash, setCloseSplash] = useState(false);
  const [searchVisible, setSearchVisible] = useState(false);

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
          <SurveyModal mode={"survey"} />
          <SearchCard
            user={user}
            searchVisible={searchVisible}
            setSearchVisible={setSearchVisible}
          />
          <MySurveysGrid user={user} setSearchVisible={setSearchVisible} />
        </>
      )}
    </>
  );
}
