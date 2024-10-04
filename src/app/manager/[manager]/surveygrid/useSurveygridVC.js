import { useEffect } from "react";
import { useRouter } from "next/navigation";
import { useState } from "react";
import useSurveyGridVM from "./useSurveygridVM";
import stn from "@/app/constants";
import { app } from "../../../data model/client actions/firebaseapp";
import { getAuth, onAuthStateChanged } from "firebase/auth";

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

  useEffect(() => {
    console.log("request docs", user);
    // getAuth(app);

    // onAuthStateChanged(auth, async (user) => {
    //   console.log("signinuser", user);
    // });

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
    },
    rows,
  };
}
