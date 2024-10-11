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
  deleteAllRecordsFromIndex(userid, syrveyid);
};

const extractusername = (filename) => {
  return filename.slice(0, filename.lastIndexOf("."));
};

export const removeFileFromSurvey = async (manager, syrveyid, filename) => {
  const surveysresultsColl = "surveysresults";
  const username = extractusername(filename);
  // console.log(username);
  // const survveyRessult = await getDocDataFromCollectionById(
  //   surveysresultsColl,
  //   syrveyid
  // );

  // delete survveyRessult.data.files[username];
  // updateDocFieldsInCollectionById(
  //   surveysresultsColl,
  //   syrveyid,
  //   survveyRessult.data
  // );
  // deleteFile(`/capture/${manager}/${syrveyid}/${filename}`);
  deleteUserSurveyFromIndex(manager, syrveyid, username);
};

export const createIndex = async (manager) => {
  let currindex = await getCurrIndexDocID(manager);
  const surveysresultsColl = "surveysresults";
  const querySnapshot = await getAllDocs(surveysresultsColl);
  for (let i = 0; i < querySnapshot.docs.length; i++) {
    const data = querySnapshot.docs[i].data();
    const id = querySnapshot.docs[i].id;
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
        name: userData.name,
        type: userData.type,
        surveyid: id,
        surveyname,
        username: user,
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
      }
    }
  }
};

const replaceDate = (datetime) => {
  const date = new Date(datetime.seconds * 1000);
  return date;
};

export const deleteAllRecordsFromIndex = async (manager, surveyid) => {
  const maxindex = await getCurrIndex(manager);
  let rows = [];
  for (let i = 0; i <= maxindex; i++) {
    const currindex = `${manager}_${i}`;
    const doc = await getDocDataFromCollectionById("index", currindex);
    const data = doc.data;
    const names = Object.keys(data.results);
    for (let j = 0; j < names.length; j++) {
      const userData = data.results[names[j]];
      userData.forEach((row, id) => {
        if (row.surveyid == surveyid) {
          userData.splice(id, 1);
        }
      });
    }
    await updateDocFieldsInCollectionById("index", currindex, data);
  }
  console.log(rows);
};

export const deleteUserSurveyFromIndex = async (
  manager,
  surveyid,
  username
) => {
  const user = username.toUpperCase();
  console.log(manager, surveyid, user);
  const maxindex = await getCurrIndex(manager);
  let rows = [];
  for (let i = 0; i <= maxindex; i++) {
    const currindex = `${manager}_${i}`;
    const doc = await getDocDataFromCollectionById("index", currindex);
    const data = doc.data;
    const names = Object.keys(data.results);
    for (let j = 0; j < names.length; j++) {
      const userData = data.results[names[j]];
      if (names[j] == user) {
        userData.forEach((row, id) => {
          if (row.surveyid == surveyid) {
            userData.splice(id, 1);
          }
        });
      }
    }
    await updateDocFieldsInCollectionById("index", currindex, data);
  }
};

export const searchInIndex = async (
  manager,
  userpart,
  setSearchRows = () => {}
) => {
  setSearchRows([]);

  const maxindex = await getCurrIndex(manager);
  let rows = [];
  for (let i = 0; i <= maxindex; i++) {
    const doc = await getDocDataFromCollectionById("index", `${manager}_${i}`);
    const data = doc.data;
    const names = Object.keys(data.results);
    for (let j = 0; j < names.length; j++) {
      if (names[j].includes(userpart)) {
        const userData = data.results[names[j]];
        console.log(userData);
        userData.forEach((row, id) => {
          row.id = `${i}${j}${id}`;
          row.datetime = replaceDate(row.datetime);
        });
        setSearchRows((rows) => [...rows, ...userData]);
        // setSearchRows(userData);
      }
    }
  }
  console.log(rows);
};

export const addDataToIndex = async (managerid, studentname, data) => {
  let currindex = await getCurrIndexDocID(managerid);
  try {
    await updateDocFieldsInCollectionById("index", currindex, {
      [`results.${studentname}`]: arrayUnion(data),
    });
  } catch (e) {
    console.log("тута");
    if (e.message.includes("exceeds the maximum allowed size")) {
      currindex = await increaseIndexCurrInCollection(managerid);
    }
    await updateDocFieldsInCollectionById("index", currindex, {
      [`results.${studentname}`]: arrayUnion(data),
    });
  }
};
