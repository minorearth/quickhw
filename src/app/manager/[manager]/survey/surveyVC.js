"use client";
import { useState, useEffect } from "react";
import { getDocFromCollectionByIdRealtimeClient } from "@/app/data model/domain";
import { ObjtoArr } from "@/globals/utils/objectUtils";

const useSurvFilesGrid2VC = ({ setCurrRow, surveyid, setMediacardVisible }) => {
  const [rows, setRowsx] = useState([]);

  useEffect(() => {
    if (!surveyid) return;
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
  }, [surveyid]);

  return { rows, setRowsx };
};

export default useSurvFilesGrid2VC;
