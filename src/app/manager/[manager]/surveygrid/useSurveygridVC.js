import { useEffect } from "react";
import { useRouter } from "next/navigation";
import { useState } from "react";
import useSurveyGridVM from "./useSurveygridVM";
import stn from "@/app/constants";
import { app } from "../../../data model/client actions/firebaseapp";
import { getAuth, onAuthStateChanged } from "firebase/auth";

export default function useSurveyGridVC({
  setModalVisible,
  user,
  setSurveyid,
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

  useEffect(() => {
    getGridData(user).then((docs) => {
      setRows(docs.rows);
      setCurrSurvey(docs.id);
    });
  }, []);

  const showSurvey = (surveyid) => {
    setModalVisible(true);
    setSurveyid(surveyid);
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
    },
    rows,
  };
}
