import { app } from "../data model/client actions/firebaseapp";
import {
  getDocFromCollectionById,
  setDocInCollection,
  getAllDocs,
  updateDocFieldsInCollectionById,
  getDocDataFromCollectionById,
  deleteDocFromCollection,
} from "../data model/client actions/datamodel";
import { doc, updateDoc, arrayUnion, arrayRemove } from "firebase/firestore";
import {
  getCurrIndexDocID,
  increaseIndexCurrInCollection,
  getCurrIndex,
} from "../data model/client actions/indexUtils";

import { deleteAllFileFromDir, deleteFile } from "./storagedb";

import { initializeFirestore } from "firebase/firestore";

const db = initializeFirestore(app, {
  experimentalForceLongPolling: true,
  useFetchStreams: false,
});

export const removeSurvey = async (syrveyid, userid) => {
  const surveysColl = "surveys";
  const surveysresultsColl = "surveysresults";
  const dc = await getDocDataFromCollectionById(surveysColl, userid);
  const managerSurv = dc.data;
  delete managerSurv.surveys[syrveyid];
  updateDocFieldsInCollectionById(surveysColl, userid, managerSurv);
  deleteDocFromCollection(surveysresultsColl, syrveyid);
  deleteAllFileFromDir(`/capture/${userid}/${syrveyid}`);
};

const extractusername = (filename) => {
  return filename.slice(0, filename.lastIndexOf("."));
};

export const removeFileFromSurvey = async (manager, syrveyid, filename) => {
  const surveysresultsColl = "surveysresults";
  const username = extractusername(filename);
  console.log(username);
  const survveyRessult = await getDocDataFromCollectionById(
    surveysresultsColl,
    syrveyid
  );

  delete survveyRessult.data.files[username];
  updateDocFieldsInCollectionById(
    surveysresultsColl,
    syrveyid,
    survveyRessult.data
  );
  deleteFile(`/capture/${manager}/${syrveyid}/${filename}`);
};

export const createIndex = async (manager) => {
  let currindex = await getCurrIndexDocID(manager);

  const surveysresultsColl = "surveysresults";
  const querySnapshot = await getAllDocs(surveysresultsColl);
  //   const docs = await getDocDataFromCollectionById(
  //     "surveysresults",
  //     "5G9X9JCZKDQyNU2SvKSJ"
  //   );
  //   const querySnapshot = [docs];

  //   for (let i = 0; i < 1; i++) {
  for (let i = 0; i < querySnapshot.docs.length; i++) {
    const data = querySnapshot.docs[i].data();
    const id = querySnapshot.docs[i].id;
    // const data = querySnapshot[0].data;
    // const id = querySnapshot[0].id;
    console.log(id);

    const surveyname = !!data?.surveyname ? data?.surveyname : false;
    if (!surveyname) {
      console.log(id, "Не указан опрос");
      break;
    }
    const manager = !!data?.manager ? data?.manager : false;
    if (!surveyname) {
      console.log(id, "Не указан менеджер");
      break;
    }
    const keys = Object.keys(data.files);

    for (let j = 0; j < keys.length; j++) {
      const user = keys[j].toUpperCase();
      const userData = data.files[keys[j]];
      const newUserData = {
        datetime: userData.datetime,
        id: userData.id,
        path: userData.path,
        type: userData.type,
        surveyid: id,
        surveyname,
      };
      try {
        await updateDocFieldsInCollectionById("index", currindex, {
          [`results.${user}`]: arrayUnion(newUserData),
        });
      } catch (e) {
        e.code == "not-found" &&
          (await setDocInCollection(
            "index",
            {
              results: { [user]: newUserData },
            },
            manager + "_1"
          ));
      }
    }
  }
};

export const createIndexspealout = async (manager) => {
  let currindex = await getCurrIndexDocID(manager);

  const surveysresultsColl = "surveysresults";
  const querySnapshot = await getAllDocs(surveysresultsColl);

  let cnt = 0;

  for (let i = 0; i < querySnapshot.docs.length; i++) {
    const data = querySnapshot.docs[i].data();
    const id = querySnapshot.docs[i].id;

    console.log(id);

    const surveyname = !!data?.surveyname ? data?.surveyname : false;
    if (!surveyname) {
      console.log(id, "Не указан опрос");
      break;
    }
    const manager = !!data?.manager ? data?.manager : false;
    if (!surveyname) {
      console.log(id, "Не указан менеджер");
      break;
    }
    const keys = Object.keys(data.files);

    for (let j = 0; j < keys.length; j++) {
      const user = keys[j].toUpperCase();
      const userData = data.files[keys[j]];
      const newUserData = {
        datetime: userData.datetime,
        id: userData.id,
        path: userData.path,
        type: userData.type,
        surveyid: id,
        surveyname,
      };
      let batch = [];
      let limit = 1000;
      for (let k = 0; k < limit; k++) {
        batch.push({
          datetime: userData.datetime,
          id: userData.id,
          path: userData.path,
          type: `ok${k}${i}${j}`,
          surveyid: id,
          surveyname,
        });
      }
      cnt += limit;

      try {
        await updateDocFieldsInCollectionById("index", currindex, {
          [`results.${user}`]: arrayUnion(...batch),
        });
      } catch (e) {
        if (e.message.includes("exceeds the maximum allowed size")) {
          currindex = await increaseIndexCurrInCollection(manager);
        }
        // e.code == "not-found" &&
        //   (await setDocInCollection(
        //     "index",
        //     {
        //       results: { [user]: newUserData },
        //     },
        //     manager + "_1"
        //   ));
      }
    }
  }
};

export const searchInIndex = async (manager, userpart) => {
  const maxindex = await getCurrIndex(manager);
  for (let i = 0; i <= maxindex; i++) {
    const doc = await getDocDataFromCollectionById("index", `${manager}_${i}`);
    const data = doc.data;
    const names = Object.keys(data.results);
    for (let j = 0; j < names.length; j++) {
      if (names[j].includes(userpart)) {
        console.log(names[j], data.results[names[j]]);
      }
      //   const newUserData = {
      //     datetime: userData.datetime,
      //     id: userData.id,
      //     path: userData.path,
      //     type: userData.type,
      //     surveyid: id,
      //     surveyname,
      //   };
    }
  }
};
