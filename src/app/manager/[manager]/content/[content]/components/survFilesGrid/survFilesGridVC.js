"use client";

import { useState, useEffect } from "react";
import { getDocFromCollectionByIdUpdates } from "../../../../../../data model/server actions/datamodel";

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
  }, []);

  return { setCardVisible };
};

export default useSurvFilesGrid2VC;
