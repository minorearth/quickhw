import { useEffect } from "react";
import { useRouter } from "next/navigation";
import { useState } from "react";
import useSurveyGridVM from "./useMySurveysGridVM";
import stn from "@/globals/constants";
import survey from "@/store/survey";

export default function useSurveyGridVC({ setSearchVisible, user }) {
  const { addDocInCollection, getGridData, updateDocFieldsInCollectionById } =
    useSurveyGridVM();

  const router = useRouter();
  const [rows, setRows] = useState([]);
  const [currSurvey, setCurrSurvey] = useState([]);

  const addrow = (type) => {
    var today = new Date();

    addDocInCollection("surveysresults", {
      files: {},
      manager: user,
      surveyname: stn.defaults.NEW_SURVEY,
      indexed: false,
      type,
    }).then((id) => {
      const data = {
        title: stn.defaults.NEW_SURVEY,
        datetime: today,
        type,
      };
      updateDocFieldsInCollectionById("surveys", user, {
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

  const showSurvey = (surveyid, surveyname, surveytype) => {
    // setModalVisible(true);
    // setSurveyid(surveyid);
    // setSurveyname(surveyname);
    survey.setSurveySelected({
      surveySelectedId: surveyid,
      surveySelectedName: surveyname,
      surveySelectedType: surveytype,
    });
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
