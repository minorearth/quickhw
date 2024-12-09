import { arrayUnion } from "firebase/firestore";

import {
  getCurrIndexDocID,
  increaseIndexCurrInCollection,
  getCurrIndex,
} from "./indexActions";

import {
  getAllDocs,
  getDocDataFromCollectionById,
  updateDocFieldsInCollectionById,
} from "@/app/db/dataModel";

import stn from "@/globals/settings";

export const setAllIndexed = async (db, indexed) => {
  const querySnapshot = await getAllDocs(db, stn.collections.SURVEY_RESULTS);
  for (let i = 0; i < querySnapshot.docs.length; i++) {
    const data = { ...querySnapshot.docs[i].data(), indexed };
    const id = querySnapshot.docs[i].id;
    await updateDocFieldsInCollectionById(
      db,
      stn.collections.SURVEY_RESULTS,
      id,
      data
    );
  }
};

export const createIndexspealout2 = async (db, manager, slice) => {
  const maxindex = await getCurrIndex(db, manager);
  const index = `${manager}_${maxindex}`;
  const doc = await getDocDataFromCollectionById(
    db,
    stn.collections.INDEX,
    index
  );
  const data = doc.data;
  const copyrows = data.results.slice(0, slice);
  data.results = [...data.results, ...copyrows];

  try {
    await updateDocFieldsInCollectionById(
      db,
      stn.collections.INDEX,
      index,
      data
    );
  } catch (e) {
    if (e.message.includes("exceeds the maximum allowed size")) {
      console.log("exceeds the maximum allowed size");
    }
  }
};

export const deleteAllRecordsFromIndex = async (db, manager, surveyid) => {
  const maxindex = await getCurrIndex(db, manager);
  let rows = [];
  for (let i = 0; i <= maxindex; i++) {
    const currindex = `${manager}_${i}`;
    const doc = await getDocDataFromCollectionById(
      db,
      stn.collections.INDEX,
      currindex
    );
    const data = doc.data;
    data.results = data.results.filter((row) => row.surveyid != surveyid);
    await updateDocFieldsInCollectionById(
      db,
      stn.collections.INDEX,
      currindex,
      data
    );
  }
};

export const deleteAllRecordsFromSpecificIndex = async (
  db,
  surveyid,
  index
) => {
  const doc = await getDocDataFromCollectionById(
    db,
    stn.collections.INDEX,
    index
  );
  const data = doc.data;
  data.results = data.results.filter((row) => row.surveyid != surveyid);
  await updateDocFieldsInCollectionById(db, stn.collections.INDEX, index, data);
};

export const deleteUserSurveyFromIndex = async (
  db,
  manager,
  surveyid,
  username
) => {
  const user = username.toUpperCase();
  const maxindex = await getCurrIndex(db, manager);
  let rows = [];
  for (let i = 0; i <= maxindex; i++) {
    const currindex = `${manager}_${i}`;
    const doc = await getDocDataFromCollectionById(
      db,
      stn.collections.INDEX,
      currindex
    );
    const data = doc.data;
    data.results = data.results.filter(
      (row) => !(row.surveyid == surveyid && row.username == user)
    );
    await updateDocFieldsInCollectionById(
      db,
      stn.collections.INDEX,
      currindex,
      data
    );
  }
};

//legacy
export const addDataToIndex = async (db, managerid, studentname, data) => {
  let currindex = await getCurrIndexDocID(db, managerid);
  try {
    await updateDocFieldsInCollectionById(
      db,
      stn.collections.INDEX,
      currindex,
      {
        [`results.${studentname}`]: arrayUnion(data),
      }
    );
  } catch (e) {
    if (e.message.includes("exceeds the maximum allowed size")) {
      currindex = await increaseIndexCurrInCollection(db, managerid);
    }
    await updateDocFieldsInCollectionById(
      db,
      stn.collections.INDEX,
      currindex,
      {
        [`results.${studentname}`]: arrayUnion(data),
      }
    );
  }
};
