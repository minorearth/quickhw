"use client";

import { useState, useEffect } from "react";

const useSurvFilesGrid2VC = ({
  setCurrRow,
  setMediacardVisible,
  setSearchSurveyid,
}) => {
  const setCardVisible = (row) => {
    setMediacardVisible(true);
    setCurrRow(row);
    setSearchSurveyid(row.surveyid);
  };

  useEffect(() => {}, []);

  return { setCardVisible };
};

export default useSurvFilesGrid2VC;
