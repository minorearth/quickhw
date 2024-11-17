"use client";
import { useState, useEffect } from "react";
import { getDocFromCollectionByIdRealtimeClient } from "@/app/domain/domain";
import { ObjtoArr } from "@/globals/utils/objectUtils";
import survey from "@/store/survey";

const useSurvFilesGrid2VC = ({ setCurrRow, surveyid, setMediacardVisible }) => {
  const [rows, setRowsx] = useState([]);

  useEffect(() => {
    if (!surveyid) return;
    if (!survey.showSurvey) return;
    getDocFromCollectionByIdRealtimeClient(
      "surveysresults",
      surveyid,
      (data) => {
        setRowsx(ObjtoArr(data.files));
      }
    ).then((docData) => {
      setInterval(() => {
        docData.unsubscribe();
      }, 1000 * 60 * 30);
      setRowsx(ObjtoArr(docData?.data?.files));
    });
    return () => {
      console.log("grid unmounted");
    };
  }, [surveyid, survey.showSurvey]);

  return { rows, setRowsx };
};

export default useSurvFilesGrid2VC;
