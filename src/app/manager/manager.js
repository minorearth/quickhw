"use client";
import SurveyGrid from "./surveygrid/surveygrid.js";
import { useState } from "react";
import Splash from "../components/splash/splash.js";

export default function Manager({ user, setEditProfile }) {
  const [closeSplash, setCloseSplash] = useState(false);
  return (
    <>
      {!closeSplash && (
        <Splash setCloseSplash={setCloseSplash} duration={2000} />
      )}
      {closeSplash && (
        <SurveyGrid user={user} setEditProfile={setEditProfile} />
      )}
    </>
  );
}
