"use client";
import { useState, useEffect } from "react";
import {
  getDocFromCollectionByIdRealtimeClient,
  updateDocFieldsInCollectionByIdClient,
} from "@/app/domain/domain";
import { ObjtoArr } from "@/globals/utils/objectUtils";
import survey from "@/store/survey";
import stn from "@/globals/settings";
import local from "@/globals/local";

const useSurvFilesGrid2VC = ({ surveyid }) => {
  const [rows, setRowsx] = useState([]);
  const [note, setNote] = useState(local.ru.defaults.BLACKBOARD_TEXT);

  useEffect(() => {
    if (!surveyid) return;
    if (!survey.showSurvey) return;
    getDocFromCollectionByIdRealtimeClient(
      "surveysresults",
      surveyid,
      (data) => {
        !!data?.note && setNote(data?.note);
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

  const saveNote = async () => {
    await updateDocFieldsInCollectionByIdClient("surveysresults", surveyid, {
      note: note,
    });
  };

  return { rows, setRowsx, saveNote, note, setNote };
};

export default useSurvFilesGrid2VC;
