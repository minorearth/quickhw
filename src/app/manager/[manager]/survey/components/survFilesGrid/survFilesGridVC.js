"use client";
import { updateDocFieldsInCollectionById } from "@/app/data model/client actions/datamodel";
import survey from "@/store/survey";
import { useState } from "react";

const useSurvFilesGrid2VC = ({ setCurrRow, setMediacardVisible, rows }) => {
  const [rowSelectionModel, setRowSelectionModel] = useState([]);

  const setCardVisible = (row) => {
    setMediacardVisible(true);
    setCurrRow(row);
    setRowSelectionModel([row.id]);
  };

  const processEdit = (newRow) => {
    console.log(newRow);
    // updateDocFieldsInCollectionById("surveys", currSurvey, {
    //   [`surveys.${newRow.id}.title`]: newRow.title,
    // });
    updateDocFieldsInCollectionById("surveysresults", survey.surveySelectedId, {
      [`files.${newRow.id}.tasknumber`]: newRow.tasknumber,
    });
    rows.filter((row) => row.id == newRow.id)[0].tasknumber = newRow.tasknumber;
    return newRow;
  };

  return {
    actions: { setCardVisible, processEdit },
    state: { rowSelectionModel },
  };
};

export default useSurvFilesGrid2VC;
