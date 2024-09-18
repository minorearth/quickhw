import * as React from "react";
import Box from "@mui/material/Box";
import { DataGrid, GridActionsCellItem, useGridApiRef } from "@mui/x-data-grid";
import AddCircleIcon from "@mui/icons-material/AddCircle";
import SettingsIcon from "@mui/icons-material/Settings";
import IconButton from "@mui/material/IconButton";
import { updateDocFieldsInCollectionById } from "../../db/datamodelSSR";
import { useEffect } from "react";
import PreviewIcon from "@mui/icons-material/Preview";
import { useRouter } from "next/navigation";
import { addDocInCollection, getDocsKeyValue } from "../../db/datamodelSSR";
import { useState } from "react";

const ETL = (docs) => {
  const docsFormatted = docs.map((doc) => {
    const date = new Date(doc.datetime.seconds * 1000);
    return { id: doc.id, title: doc.title, datetime: date, user: doc.user };
  });
  return docsFormatted;
};

export default function useSurveyGrid({ setEditProfile, user }) {
  // const apiRef = useGridApiRef();

  const router = useRouter();
  const [rows, setRows] = useState([]);

  const addrow = () => {
    var today = new Date();
    const data = { title: "Новый опрос", datetime: today, user };
    addDocInCollection("surveys", { ...data }).then((id) => {
      setRows((oldRows) => [{ id, ...data }, ...oldRows]);
    });
  };

  const getGridData = () => {
    getDocsKeyValue("surveys", "user", user).then((docs) => {
      setRows(ETL(docs));
    });
  };

  useEffect(() => {
    getGridData();

    // apiRef.current.autosizeColumns(autosizeOptions);
  }, []);

  const navigateToSettings = () => {
    // deleteAllDocsInCollection("surveys", -10);
    setEditProfile(true);
  };

  const processEdit = (newRow) => {
    updateDocFieldsInCollectionById("surveys", newRow.id, {
      title: newRow.title,
    });
    rows.filter((row) => row.id == newRow.id)[0].title = newRow.title;
    return newRow;
  };

  const navigateToFiles = (id) => {
    router.push(`/manager/${id}`);
  };

  return {
    actions: { navigateToFiles, processEdit, navigateToSettings, addrow },
    rows,
  };
}
