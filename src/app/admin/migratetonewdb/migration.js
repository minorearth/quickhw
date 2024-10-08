"use client";
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

import { app } from "./app/data model/client actions/firebaseapp";

const db = initializeFirestore(app, {
  experimentalForceLongPolling: true,
  useFetchStreams: false,
});

export const getDocFromCollectionByIdRealtime = async (
  collectionName,
  id,
  refreshdata
) => {
  const docRef = doc(db, collectionName, id);
  const unsubscribe = onSnapshot(docRef, (doc) => {
    refreshdata(doc.data());
  });
  const docSnap = await getDoc(docRef);
  const data = docSnap.data();
  return { data: { id: docSnap.id, ...data }, unsubscribe };
};

export const addDocInCollection2 = async (collectionName, data) => {
  const doc = await addDoc(collection(db, collectionName), data);
  return doc.id;
};

export const setDocInCollection = async (collectionName, data, id) => {
  const newdoc = await setDoc(doc(db, collectionName, id), data);
  return newdoc.id;
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

const getGridDataMigration = async (user) => {
  const docs = await getDocsKeyValue(
    "surveys",
    "user",
    "r.v.lavrentev@school1298.ru"
  );
  return ETLMigration(docs);
};

const ETLMigration = (docs) => {
  const docsFormatted = docs.reduce((acc, doc, id) => {
    // const date = new Date(doc.datetime.seconds * 1000);
    return {
      ...acc,
      [`survey${id}`]: {
        title: doc.title,
        datetime: doc.datetime,
        user: doc.user,
        files: !!doc.files ? doc.files : {},
      },
    };
  }, {});
  return docsFormatted;
};
