"use client";
import { useState, useEffect } from "react";
import { getDocFromCollectionByIdRealtime } from "../../../data model/client actions/datamodel";
import { ObjtoArr } from "@/globals/utils/objectUtils";

const useSurvFilesGrid2VC = ({ setCurrRow, surveyid, setMediacardVisible }) => {
  const [rows, setRowsx] = useState([]);

  const setCardVisible = (row) => {
    setMediacardVisible(true);
    setCurrRow(row);
  };

  useEffect(() => {
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

  return { rows, setRowsx };
};

export default useSurvFilesGrid2VC;
