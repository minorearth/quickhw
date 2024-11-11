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
} from "firebase/firestore";
// import { getAuth } from "firebase/auth";

import {
  updateDocFieldsInCollectionById,
  getDocsKeyValue,
  setDocInCollection,
  getDocDataFromCollectionById,
} from "./dataModel";

// const db = initializeFirestore(app, {
//   experimentalForceLongPolling: true,
//   useFetchStreams: false,
// });

// getAuth(app);

const INDEX_COL = "index";
const INDEXCURR_COL = "indexcurr";

//New user
export const createNewUser = async (db, userId) => {
  await setDocInCollection("surveys", { surveys: {} }, userId);
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
  await setDoc(doc(db, INDEX_COL, userId + `_${ci + 1}`), {});
  return userId + `_${ci + 1}`;
};

export const getCurrIndexDocID = async (db, userId) => {
  const docSnap = await getDoc(doc(db, INDEXCURR_COL, userId));
  const data = docSnap.data();
  const ci = data.currindex;
  const docSnap2 = await getDoc(doc(db, INDEX_COL, userId + `_${ci}`));
  return docSnap2.id;
};

export const getCurrIndex = async (db, userId) => {
  const docSnap = await getDoc(doc(db, INDEXCURR_COL, userId));
  const data = docSnap.data();
  const ci = data.currindex;
  return ci;
};

export const createIndex = async (db) => {
  const surveysresultsColl = "surveysresults";
  // const querySnapshot = await getAllDocs(surveysresultsColl);
  const querySnapshot = await getDocsKeyValue(
    db,
    surveysresultsColl,
    "indexed",
    false
  );
  for (let i = 0; i < querySnapshot.docs.length; i++) {
    const data = querySnapshot.docs[i].data();
    let currindex = await getCurrIndexDocID(db, data.manager);

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
        // datetime: data.datetime,
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
      await updateDocFieldsInCollectionById(db, "index", currindex, {
        results: arrayUnion(...res),
      });
      await updateDocFieldsInCollectionById(db, "surveysresults", id, {
        indexed: true,
      });
    } catch (e) {
      e.code == "not-found" &&
        (await setDocInCollection(
          db,
          "index",
          {
            results: { [user]: newUserData },
          },
          manager + "_0"
        ));
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
