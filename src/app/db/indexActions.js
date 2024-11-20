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

import {
  updateDocFieldsInCollectionById,
  getDocsKeyValue,
  setDocInCollection,
  getDocDataFromCollectionById,
} from "./dataModel";

import { deleteAllRecordsFromSpecificIndex } from "@/app/db/indexAdmin";

// const db = initializeFirestore(app, {
//   experimentalForceLongPolling: true,
//   useFetchStreams: false,
// });

// getAuth(app);

const INDEX_COL = "index";
const INDEXCURR_COL = "indexcurr";

//New user
export const createNewUser = async (db, userId, name, company) => {
  await setDocInCollection(db, "surveys", { surveys: {} }, userId);
  await setDocInCollection(db, "usermeta", { company, name }, userId);
  await setDoc(doc(db, INDEX_COL, userId + "_0"), {});
  await setDoc(doc(db, INDEXCURR_COL, userId), { currindex: 0 });
  return doc.id;
};

//exceed error
export const increaseIndexCurrInCollection = async (db, userId) => {
  const docSnap = await getDoc(doc(db, INDEXCURR_COL, userId));
  const data = docSnap.data();
  const ci = data.currindex;
  await updateDoc(doc(db, INDEXCURR_COL, userId), { currindex: ci + 1 });
  await setDoc(doc(db, INDEX_COL, userId + `_${ci + 1}`), {
    results: [],
  });
  return userId + `_${ci + 1}`;
};

export const getCurrIndexDocID = async (db, userId) => {
  const docSnap = await getDoc(doc(db, INDEXCURR_COL, userId));
  const data = docSnap.data();
  const ci = data?.currindex;
  const docSnap2 = await getDoc(doc(db, INDEX_COL, userId + `_${ci}`));
  return docSnap2?.id;
};

export const getCurrIndex = async (db, userId) => {
  const docSnap = await getDoc(doc(db, INDEXCURR_COL, userId));
  const data = docSnap.data();
  const ci = data.currindex;
  return ci;
};

const addDataToIndex = async (db, currindex, surveyid, res) => {
  await updateDocFieldsInCollectionById(db, "index", currindex, {
    results: arrayUnion(...res),
  });
  await updateDocFieldsInCollectionById(db, "surveysresults", surveyid, {
    indexed: true,
  });
};

export const createIndex = async (db) => {
  console.log("d", "notIndexedDocs.docs.length");

  const surveysresultsColl = "surveysresults";
  const notIndexedDocs = await getDocsKeyValue(
    db,
    surveysresultsColl,
    "indexed",
    false
  );
  for (let i = 0; i < notIndexedDocs.docs.length; i++) {
    const data = notIndexedDocs.docs[i].data();
    let currindex = await getCurrIndexDocID(db, data.manager);
    if (!currindex) {
      continue;
    }
    const surveyid = notIndexedDocs.docs[i].id;
    const surveyname = !!data?.surveyname ? data?.surveyname : false;
    const type = !!data?.type ? data?.type : false;
    const keys = Object.keys(data.files);
    let res = [];
    for (let j = 0; j < keys.length; j++) {
      const user = keys[j].toUpperCase();
      const userData = data.files[keys[j]];
      const newUserData = {
        datetime: userData.datetime,
        // datetime: data.datetime,
        id: userData.id,
        path: !userData.path ? "" : userData.path,
        name: userData.name,
        type: userData.type,
        surveytype: type,
        surveyid,
        surveyname,
        username: user,
      };
      res.push(newUserData);
    }
    console.log(res);
    try {
      await addDataToIndex(db, currindex, surveyid, res);
      console.log("success");
    } catch (e) {
      console.log(e, e.message);
      if (e.message.includes("exceeds the maximum allowed size")) {
        await deleteAllRecordsFromSpecificIndex(db, surveyid, currindex);
        const newindexId = await increaseIndexCurrInCollection(db, manager);
        await addDataToIndex(db, newindexId, surveyid, res);
      }
      if (e.code == "not-found") {
        console.log(e, e.message);

        // await setDocInCollection(
        //   db,
        //   "index",
        //   {
        //     results: { [user]: newUserData },
        //   },
        //   manager + "_0"
        // );
      }
    }
  }
};

const replaceDate = (datetime) => {
  const date = new Date(datetime.seconds * 1000);
  return date;
};

export const searchInIndex = async (
  db,
  manager,
  userpart,
  setSearchRows = () => {}
) => {
  setSearchRows([]);
  const maxindex = await getCurrIndex(db, manager);
  let rows = [];
  for (let i = 0; i <= maxindex; i++) {
    const doc = await getDocDataFromCollectionById(
      db,
      "index",
      `${manager}_${i}`
    );
    const data = doc.data;
    data.results.forEach((row, id) => {
      if (row.username.includes(userpart)) {
        row.id = `${i}${id}`;
        row.datetime = replaceDate(row.datetime);
        setSearchRows((rows) => [...rows, row]);
      }
    });
  }
};
