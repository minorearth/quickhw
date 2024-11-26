"use client";
import { updateDocFieldsInCollectionByIdClient } from "@/app/domain/domain";
import survey from "@/store/survey";
import { useState } from "react";
import stn from "@/globals/settings";

const useSurvFilesGrid2VC = ({ setCurrRow, setMediacardVisible, rows }) => {
  const [rowSelectionModel, setRowSelectionModel] = useState([]);

  const setCardVisible = (row) => {
    setMediacardVisible(true);
    setCurrRow(row);
    setRowSelectionModel([row.id]);
  };

  const processEdit = (newRow) => {
    console.log(newRow);
    updateDocFieldsInCollectionByIdClient(
      stn.collections.SURVEY_RESULTS,
      survey.surveySelectedId,
      {
        [`files.${newRow.id}.tasknumber`]: newRow.tasknumber,
      }
    );
    rows.filter((row) => row.id == newRow.id)[0].tasknumber = newRow.tasknumber;
    return newRow;
  };

  return {
    actions: { setCardVisible, processEdit },
    state: { rowSelectionModel },
  };
};

export default useSurvFilesGrid2VC;
