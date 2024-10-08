"use client";

import { useState, useEffect } from "react";
import { getDocFromCollectionByIdUpdates } from "../../../../../../api/apiDB";

import { getDocFromCollectionByIdRealtime } from "../../../../../../data model/client actions/datamodel";

import { ObjtoArr } from "@/app/utils/objectUtils";

const useSurvFilesGrid2VC = ({
  setCurrRow,
  surveyid,
  setRowsx,
  setMediacardVisible,
}) => {
  const setCardVisible = (row) => {
    setMediacardVisible(true);
    setCurrRow(row);
  };

  useEffect(() => {
    console.log("render2", surveyid);
    if (!surveyid) return;
    getDocFromCollectionByIdRealtime("surveysresults", surveyid, (data) => {
      setRowsx(ObjtoArr(data.files));
    }).then((docData) => {
      setInterval(() => {
        docData.unsubscribe();
      }, 1000 * 60 * 30);
      setRowsx(ObjtoArr(docData?.data?.files));
    });
    return () => {
      console.log("grid unmounted");
    };
  }, [surveyid]);

  return { setCardVisible };
};

export default useSurvFilesGrid2VC;
