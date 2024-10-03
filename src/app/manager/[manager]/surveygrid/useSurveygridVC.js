import { useEffect } from "react";
import { useRouter } from "next/navigation";
import { useState } from "react";
import useSurveyGridVM from "./useSurveygridVM";
import stn from "@/app/constants";
import {
  addDocInCollection2,
  setDocInCollection,
} from "../../../data model/client actions/migration";

export default function useSurveyGridVC({ setProfileVisible, user }) {
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
    addDocInCollection("surveysresults", { files: {}, manager: user }).then(
      (id) => {
        const data = {
          title: stn.defaults.NEW_SURVEY,
          datetime: today,
        };
        updateDocFieldsInCollectionById("surveys2", user, {
          [`surveys.${id}`]: data,
        });
        setRows((oldRows) => [{ id, ...data }, ...oldRows]);
      }
    );
  };

  const Migrate = () => {
    getGridDataMigration(user).then((docs) => {
      // setRows(docs);

      Promise.all(
        Object.keys(docs).map(async (doc) => {
          const docid = await addDocInCollection2("surveysresults", {
            files: docs[doc].files,
            manager: user,
          });
          docs[docid] = {
            title: docs[doc].title,
            datetime: docs[doc].datetime,
          };
          delete docs[doc];
        })
      ).then((res) => setDocInCollection("surveys2", { surveys: docs }, user));
    });
  };

  useEffect(() => {
    console.log("request docs", user);

    getGridData(user).then((docs) => {
      console.log(user, docs);
      setRows(docs.rows);
      setCurrSurvey(docs.id);
    });
  }, []);

  const navigateToSettings = () => {
    setProfileVisible(true);
  };

  const processEdit = (newRow) => {
    updateDocFieldsInCollectionById("surveys2", currSurvey, {
      [`surveys.${newRow.id}.title`]: newRow.title,
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
      navigateToSettings,
      addrow,
      Migrate,
    },
    rows,
  };
}
