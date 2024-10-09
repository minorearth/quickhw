import { useEffect } from "react";
import { useRouter } from "next/navigation";
import { useState } from "react";
import useSurveyGridVM from "./useSurveygridVM";
import stn from "@/app/constants";
import { app } from "../../../data model/client actions/firebaseapp";
import { getAuth, onAuthStateChanged } from "firebase/auth";
import { searchInIndex } from "@/app/admin/adminVC";

export default function useSurveyGridVC({
  setModalVisible,
  setSearchVisible,
  user,
  setSurveyid,
  setSearchRows,
  setSurveyname,
}) {
  const {
    addDocInCollection,
    getGridData,
    updateDocFieldsInCollectionById,
    getGridDataMigration,
  } = useSurveyGridVM();
  // const apiRef = useGridApiRef();

  const router = useRouter();
  const [rows, setRows] = useState([]);
  const [currSurvey, setCurrSurvey] = useState([]);

  const addrow = () => {
    var today = new Date();

    addDocInCollection("surveysresults", {
      files: {},
      manager: user,
      surveyname: stn.defaults.NEW_SURVEY,
    }).then((id) => {
      const data = {
        title: stn.defaults.NEW_SURVEY,
        datetime: today,
      };
      updateDocFieldsInCollectionById("surveys", user, {
        [`surveys.${id}`]: data,
      });
      setRows((oldRows) => [{ id, ...data }, ...oldRows]);
    });
  };

  const startSearch = () => {
    setSearchVisible(true);
    // searchInIndex("3a5nHnKXJFTMM0eCooHqKefECTj1", "ЕВЯТКИН", setSearchRows);
  };

  useEffect(() => {
    getGridData(user).then((docs) => {
      setRows(docs.rows);
      setCurrSurvey(docs.id);
    });
  }, []);

  const showSurvey = (surveyid, surveyname) => {
    setModalVisible(true);
    setSurveyid(surveyid);
    setSurveyname(surveyname);
  };

  const processEdit = (newRow) => {
    updateDocFieldsInCollectionById("surveys", currSurvey, {
      [`surveys.${newRow.id}.title`]: newRow.title,
    });
    updateDocFieldsInCollectionById("surveysresults", newRow.id, {
      [`surveyname`]: newRow.title,
    });
    rows.filter((row) => row.id == newRow.id)[0].title = newRow.title;
    return newRow;
  };

  const navigateToFiles = (id) => {
    router.push(`/manager/${user}/content/${id}`);
  };

  return {
    actions: {
      navigateToFiles,
      processEdit,
      addrow,
      showSurvey,
      startSearch,
    },
    rows,
  };
}
