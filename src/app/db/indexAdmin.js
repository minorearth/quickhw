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
    console.log("тута");
    if (e.message.includes("exceeds the maximum allowed size")) {
      currindex = await increaseIndexCurrInCollection(db, managerid);
    }
    await updateDocFieldsInCollectionById(db, "index", currindex, {
      [`results.${studentname}`]: arrayUnion(data),
    });
  }
};

// export const createIndex = async (manager) => {
//   let currindex = await getCurrIndexDocID(manager);
//   const surveysresultsColl = "surveysresults";
//   const querySnapshot = await getAllDocs(surveysresultsColl);
//   for (let i = 0; i < querySnapshot.docs.length; i++) {
//     const data = querySnapshot.docs[i].data();
//     const id = querySnapshot.docs[i].id;
//     const surveyname = !!data?.surveyname ? data?.surveyname : false;
//     if (!surveyname) {
//       console.log(id, "Не указан опрос");
//       break;
//     }
//     const manager = !!data?.manager ? data?.manager : false;
//     if (!surveyname) {
//       console.log(id, "Не указан менеджер");
//       break;
//     }
//     const keys = Object.keys(data.files);
//     for (let j = 0; j < keys.length; j++) {
//       const user = keys[j].toUpperCase();
//       const userData = data.files[keys[j]];
//       const newUserData = {
//         datetime: userData.datetime,
//         id: userData.id,
//         path: userData.path,
//         name: userData.name,
//         type: userData.type,
//         surveyid: id,
//         surveyname,
//         username: user,
//       };
//       try {
//         await updateDocFieldsInCollectionById("index", currindex, {
//           [`results.${user}`]: arrayUnion(newUserData),
//         });
//       } catch (e) {
//         e.code == "not-found" &&
//           (await setDocInCollection(
//             "index",
//             {
//               results: { [user]: newUserData },
//             },
//             manager + "_1"
//           ));
//       }
//     }
//   }
// };

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

// export const createIndex2 = async (manager) => {
//   const maxindex = await getCurrIndex(manager);
//   const currindex = `${manager}_${maxindex}`;
//   const doc = await getDocDataFromCollectionById("index", currindex);
//   const indexData = doc.data;

//   const surveysresultsColl = "surveysresults";
//   // const querySnapshot = await getAllDocs(surveysresultsColl);
//   const querySnapshot = await getDocsKeyValue(
//     surveysresultsColl,
//     "indexed",
//     false
//   );

//   let results = {};
//   for (let i = 0; i < querySnapshot.docs.length; i++) {
//     const data = querySnapshot.docs[i].data();
//     const id = querySnapshot.docs[i].id;
//     const surveyname = !!data?.surveyname ? data?.surveyname : false;
//     if (!surveyname) {
//       console.log(id, "Не указан опрос");
//       break;
//     }
//     const manager = !!data?.manager ? data?.manager : false;
//     if (!surveyname) {
//       console.log(id, "Не указан менеджер");
//       break;
//     }
//     const keys = Object.keys(data.files);
//     for (let j = 0; j < keys.length; j++) {
//       const user = keys[j].toUpperCase();
//       const userData = data.files[keys[j]];
//       const newUserData = {
//         datetime: userData.datetime,
//         id: userData.id,
//         path: userData.path,
//         name: userData.name,
//         type: userData.type,
//         surveyid: id,
//         surveyname,
//         username: user,
//       };
//       results[user] = !results[user]
//         ? [newUserData]
//         : [...results[user], newUserData];
//     }

//     // console.log("indexData", indexData);
//     // try {
//     //   await updateDocFieldsInCollectionById("index", currindex, {
//     //     [`results.${user}`]: arrayUnion(newUserData),
//     //   });
//     // } catch (e) {
//     //   e.code == "not-found" &&
//     //     (await setDocInCollection(
//     //       "index",
//     //       {
//     //         results: { [user]: newUserData },
//     //       },
//     //       manager + "_1"
//     //     ));
//     // }
//   }
//   console.log("res", results);
//   Object.keys(results).forEach((key) => {
//     if (!indexData.results[key]) {
//       indexData.results[key] = [];
//     }
//     indexData.results[key].push(...results[key]);
//   });
// };

// export const createIndexspealout = async (db, manager) => {
//   let currindex = await getCurrIndexDocID(db, manager);
//   const surveysresultsColl = "surveysresults";
//   const querySnapshot = await getAllDocs(db, surveysresultsColl);
//   let cnt = 0;
//   for (let i = 0; i < querySnapshot.docs.length; i++) {
//     const data = querySnapshot.docs[i].data();
//     const id = querySnapshot.docs[i].id;
//     const surveyname = !!data?.surveyname ? data?.surveyname : false;
//     if (!surveyname) {
//       console.log(id, "Не указан опрос");
//       break;
//     }
//     const manager = !!data?.manager ? data?.manager : false;
//     if (!surveyname) {
//       console.log(id, "Не указан менеджер");
//       break;
//     }
//     const keys = Object.keys(data.files);
//     for (let j = 0; j < keys.length; j++) {
//       const user = keys[j].toUpperCase();
//       const userData = data.files[keys[j]];
//       const newUserData = {
//         datetime: userData.datetime,
//         id: userData.id,
//         path: userData.path,
//         type: userData.type,
//         surveyid: id,
//         surveyname,
//       };
//       let batch = [];
//       let limit = 1000;
//       for (let k = 0; k < limit; k++) {
//         batch.push({
//           datetime: userData.datetime,
//           id: userData.id,
//           path: userData.path,
//           type: `ok${k}${i}${j}`,
//           surveyid: id,
//           surveyname,
//         });
//       }
//       cnt += limit;

//       try {
//         await updateDocFieldsInCollectionById(db, "index", currindex, {
//           [`results.${user}`]: arrayUnion(...batch),
//         });
//       } catch (e) {
//         if (e.message.includes("exceeds the maximum allowed size")) {
//           currindex = await increaseIndexCurrInCollection(db, manager);
//         }
//       }
//     }
//   }
// };
