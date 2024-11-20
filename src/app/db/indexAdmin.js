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

export const setAllIndexed = async (db, indexed) => {
  const surveysresultsColl = "surveysresults";
  const querySnapshot = await getAllDocs(db, surveysresultsColl);
  for (let i = 0; i < querySnapshot.docs.length; i++) {
    const data = { ...querySnapshot.docs[i].data(), indexed };
    const id = querySnapshot.docs[i].id;
    await updateDocFieldsInCollectionById(db, surveysresultsColl, id, data);
  }
};

export const createIndexspealout2 = async (db, manager, slice) => {
  const maxindex = await getCurrIndex(db, manager);
  const index = `${manager}_${maxindex}`;
  const doc = await getDocDataFromCollectionById(db, "index", index);
  const data = doc.data;
  const copyrows = data.results.slice(0, slice);
  data.results = [...data.results, ...copyrows];

  try {
    await updateDocFieldsInCollectionById(db, "index", index, data);
    console.log("ok");
  } catch (e) {
    if (e.message.includes("exceeds the maximum allowed size")) {
      console.log("speal");
    }
  }
};

export const deleteAllRecordsFromIndex = async (db, manager, surveyid) => {
  const maxindex = await getCurrIndex(db, manager);
  let rows = [];
  for (let i = 0; i <= maxindex; i++) {
    const currindex = `${manager}_${i}`;
    const doc = await getDocDataFromCollectionById(db, "index", currindex);
    const data = doc.data;
    data.results = data.results.filter((row) => row.surveyid != surveyid);
    await updateDocFieldsInCollectionById(db, "index", currindex, data);
  }
  console.log(rows);
};

export const deleteAllRecordsFromSpecificIndex = async (
  db,
  surveyid,
  index
) => {
  const doc = await getDocDataFromCollectionById(db, "index", index);
  const data = doc.data;
  data.results = data.results.filter((row) => row.surveyid != surveyid);
  await updateDocFieldsInCollectionById(db, "index", index, data);
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
    const doc = await getDocDataFromCollectionById(db, "index", currindex);
    const data = doc.data;
    data.results = data.results.filter(
      (row) => !(row.surveyid == surveyid && row.username == user)
    );
    await updateDocFieldsInCollectionById(db, "index", currindex, data);
  }
};

//legacy
export const addDataToIndex = async (db, managerid, studentname, data) => {
  let currindex = await getCurrIndexDocID(db, managerid);
  try {
    await updateDocFieldsInCollectionById(db, "index", currindex, {
      [`results.${studentname}`]: arrayUnion(data),
    });
  } catch (e) {
    if (e.message.includes("exceeds the maximum allowed size")) {
      currindex = await increaseIndexCurrInCollection(db, managerid);
    }
    await updateDocFieldsInCollectionById(db, "index", currindex, {
      [`results.${studentname}`]: arrayUnion(data),
    });
  }
};

// export const deleteAllRecordsFromIndex = async (manager, surveyid) => {
//   const maxindex = await getCurrIndex(manager);
//   let rows = [];
//   for (let i = 0; i <= maxindex; i++) {
//     const currindex = `${manager}_${i}`;
//     const doc = await getDocDataFromCollectionById("index", currindex);
//     const data = doc.data;
//     const names = Object.keys(data.results);
//     for (let j = 0; j < names.length; j++) {
//       const userData = data.results[names[j]];
//       userData.forEach((row, id) => {
//         if (row.surveyid == surveyid) {
//           userData.splice(id, 1);
//         }
//       });
//     }
//     await updateDocFieldsInCollectionById("index", currindex, data);
//   }
//   console.log(rows);
// };
