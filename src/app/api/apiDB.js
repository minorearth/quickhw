"use server";
import {
  collection,
  getDocs,
  setDoc,
  doc,
  query,
  where,
  addDoc,
  deleteDoc,
  getFirestore,
  documentId,
  getDoc,
  updateDoc,
  writeBatch,
  getAll,
  initializeFirestore,
  onSnapshot,
  arrayUnion,
} from "firebase/firestore";

import { getAuth, onAuthStateChanged } from "firebase/auth";
import {
  getCurrIndexDocID,
  increaseIndexCurrInCollection,
  getCurrIndex,
} from "./indexUtils";

import { deleteAllFileFromDir } from "./apiStoragedb";
import { app } from "./firebaseapp";

const db = initializeFirestore(app, {
  experimentalForceLongPolling: true,
  useFetchStreams: false,
});

// export const deleteAllDocsInCollection = async (collectionName, timeLag) => {
//   let th = new Date();
//   th.setDate(th.getDate() - timeLag);
//   const thresold = Timestamp.fromDate(th);
//   const col = collection(db, collectionName);
//   const q = query(col, where("datetime", "<=", thresold));
//   const docs = await getDocs(q);
//   let log = { len: docs.docs.length, date: th.toString(), vers: "4" };
//   await Promise.all(
//     docs.docs.map(async (docS) => {
//       deleteAllFileFromDir(`/capture/${docS.id}`);
//       log = { ...log, [docS.id]: docS.id };
//       await deleteDoc(doc(db, collectionName, docS.id));
//     })
//   );
//   return log;
// };

export const createIndex = async () => {
  const surveysresultsColl = "surveysresults";
  // const querySnapshot = await getAllDocs(surveysresultsColl);
  const querySnapshot = await getDocsKeyValue(
    surveysresultsColl,
    "indexed",
    false
  );
  for (let i = 0; i < querySnapshot.docs.length; i++) {
    const data = querySnapshot.docs[i].data();
    let currindex = await getCurrIndexDocID(data.manager);

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
    let res = [];
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
      res.push(newUserData);
    }
    try {
      await updateDocFieldsInCollectionById("index", currindex, {
        results: arrayUnion(...res),
      });
      await updateDocFieldsInCollectionById("surveysresults", id, {
        indexed: true,
      });
    } catch (e) {
      e.code == "not-found" &&
        (await setDocInCollection(
          "index",
          {
            results: { [user]: newUserData },
          },
          manager + "_0"
        ));
    }
  }
};

export const getDocsKeyValue = async (collectionName, key, value) => {
  const q = query(collection(db, collectionName), where(key, "==", value));
  const docs = await getDocs(q);
  return docs;
};

export const updateDocFieldsInCollectionById = async (
  collectionName,
  id,
  data
) => {
  console.log("here i am");
  await updateDoc(doc(db, collectionName, id), data);
};

export const setDocInCollection = async (collectionName, data, id) => {
  await setDoc(doc(db, collectionName, id), data);
};
