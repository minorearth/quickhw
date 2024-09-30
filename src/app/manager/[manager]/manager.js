"use client";
import SurveyGrid from "./surveygrid/surveygrid.js";
import { useState } from "react";
import Splash from "../../../components/splash/splash.js";
import stn from "../../constants.js";

export default function Manager({ user, setProfileVisible }) {
  const [closeSplash, setCloseSplash] = useState(false);
  return (
    <>
      {!closeSplash && (
        <Splash
          setCloseSplash={setCloseSplash}
          duration={stn.SPLASH_DURATION}
        />
      )}
      {closeSplash && (
        <SurveyGrid user={user} setProfileVisible={setProfileVisible} />
      )}
    </>
  );
}
