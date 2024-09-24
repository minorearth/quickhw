import { useEffect } from "react";
import { useRouter } from "next/navigation";
import { useState } from "react";
import useSurveyGridVM from "./useSurveygridVM";
import stn from "@/app/constants";

export default function useSurveyGridVC({ setEditProfile, user }) {
  const { addDocInCollection, getGridData, updateDocFieldsInCollectionById } =
    useSurveyGridVM();
  // const apiRef = useGridApiRef();

  const router = useRouter();
  const [rows, setRows] = useState([]);

  const addrow = () => {
    var today = new Date();
    const data = { title: stn.defaults.NEW_SURVEY, datetime: today, user };
    addDocInCollection("surveys", { ...data }).then((id) => {
      setRows((oldRows) => [{ id, ...data }, ...oldRows]);
    });
  };

  useEffect(() => {
    getGridData(user).then((docs) => {
      setRows(docs);
    });
  }, []);

  const navigateToSettings = () => {
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
