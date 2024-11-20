import { useEffect } from "react";
import { useRouter } from "next/navigation";
import { useState } from "react";
import useSurveyGridVM from "./useMySurveysGridVM";
import stn from "@/globals/settings";
import local from "@/globals/local";
import survey from "@/store/survey";

export default function useSurveyGridVC({ setSearchVisible, user }) {
  const {
    addDocInCollection,
    getGridData,
    updateDocFieldsInCollectionByIdClient,
  } = useSurveyGridVM();

  const router = useRouter();
  const [rows, setRows] = useState([]);
  const [currSurvey, setCurrSurvey] = useState([]);

  const addrow = (type) => {
    var today = new Date();

    addDocInCollection("surveysresults", {
      files: {},
      manager: user,
      surveyname: local.ru.defaults.NEW_SURVEY,
      indexed: false,
      type,
    }).then((id) => {
      const data = {
        title: local.ru.defaults.NEW_SURVEY,
        datetime: today,
        type,
      };
      updateDocFieldsInCollectionByIdClient("surveys", user, {
        [`surveys.${id}`]: data,
      });
      setRows((oldRows) => [{ id, ...data }, ...oldRows]);
    });
  };

  const startSearch = () => {
    setSearchVisible(true);
  };

  useEffect(() => {
    getGridData(user).then((docs) => {
      setRows(docs.rows);
      setCurrSurvey(docs.id);
    });
  }, []);

  const showSurvey = (surveyid, surveyname, surveytype, filetype) => {
    survey.setSurveySelected({
      surveySelectedId: surveyid,
      surveySelectedName: surveyname,
      surveySelectedType: surveytype,
    });
  };

  const processEdit = (newRow) => {
    updateDocFieldsInCollectionByIdClient("surveys", currSurvey, {
      [`surveys.${newRow.id}.title`]: newRow.title,
    });
    updateDocFieldsInCollectionByIdClient("surveysresults", newRow.id, {
      [`surveyname`]: newRow.title,
      [`datetime`]: newRow.datetime,
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
