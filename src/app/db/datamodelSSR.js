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
} from "firebase/firestore";

import { deleteAllFileFromDir } from "./storagedb";

// import { checkIfUniqueExistAndReturnDocDM } from "./dm";

const firebaseConfig = {
  apiKey: "AIzaSyBwMnO7HaGuHu6LrzsTj6y6J9BojyC1ei0",
  authDomain: "testchallenge-52d1b.firebaseapp.com",
  projectId: "testchallenge-52d1b",
  storageBucket: "testchallenge-52d1b.appspot.com",
  messagingSenderId: "785621858975",
  appId: "1:785621858975:web:e1fcef81ff499466bd40aa",
  measurementId: "G-E08Z0JNFH2",
};

import { initializeApp } from "firebase/app";

const app = initializeApp(firebaseConfig);
const db = initializeFirestore(app, {
  experimentalForceLongPolling: true,
  useFetchStreams: false,
});

// const auth = getAuth(app);

const DBDocsToObject = (docs) => {
  let ret = [];
  docs.forEach((item) => {
    {
      const data = item.data();
      ret = [...ret, { id: item.id, ...data }];
    }
  });
  return ret;
};

export const getDocsKeyValue = async (collectionName, key, value) => {
  const q = query(collection(db, collectionName), where(key, "==", value));
  const docs = await getDocs(q);
  return DBDocsToObject(docs);
};

export const addDocInCollection = async (collectionName, data) => {
  const doc = await addDoc(collection(db, collectionName), data);
  return doc.id;
};

export const updateDocFieldsInCollectionById = async (
  collectionName,
  id,
  data
) => {
  await updateDoc(doc(db, collectionName, id), data);
};

export const updateDocFieldsInCollectionById2 = async (path, data) => {
  await updateDoc(doc(db, path), data);
};

export const getDocFromCollectionById = async (collectionName, id) => {
  const docSnap = await getDoc(doc(db, collectionName, id));
  const data = docSnap.data();
  return { id: docSnap.id, ...data };
};

export const getDocFromCollectionByIdRealtime = async (collectionName, id) => {
  const docRef = doc(db, collectionName, id);

  const docSnap = await getDoc(docRef);
  const data = docSnap.data();
  return { data: { id: docSnap.id, ...data }, docref: docRef };
};

export const deleteAllDocsInCollection = async (collectionName, timeLag) => {
  let th = new Date();
  th.setDate(th.getDate() - timeLag);
  const thresold = Timestamp.fromDate(th);
  const col = collection(db, collectionName);
  const q = query(col, where("datetime", "<=", thresold));
  const docs = await getDocs(q);
  let log = { len: docs.docs.length, date: th.toString(), vers: "4" };
  await Promise.all(
    docs.docs.map(async (docS) => {
      deleteAllFileFromDir(`/capture/${docS.id}`);
      log = { ...log, [docS.id]: docS.id };
      await deleteDoc(doc(db, collectionName, docS.id));
    })
  );
  return log;
};

// const DBDocsToIds = (docs) => {
//   return docs.docs.map((item) => item.id);
// };

// const DBDocsToIdExt = (docs) => {
//   let ret = [];
//   docs.forEach((item) => {
//     {
//       const data = item.data();
//       ret = [...ret, { id: item.id, extid: data.extid }];
//     }
//   });
//   return ret;
// };

// export const getMultipleDocsFromCollection = async (collectionName, ids) => {
//   const col = collection(db, collectionName);
//   const q = query(col, where(documentId(), "in", ids));
//   return DBDocsToObject(await getDocs(q));
// };

// const getDocsExtFiltered = async (collectionName, dependentFilter) => {
//   if (dependentFilter.length == 0) {
//     return [];
//   }
//   const col = collection(db, collectionName);
//   let q;
//   if (dependentFilter != "none") {
//     const ids = dependentFilter.map((item) => item.id);
//     q = query(col, where("extid", "in", ids));
//   } else {
//     q = query(col);
//   }
//   return await getDocs(q);
// };

// export const getDocsDataExtFiltered = async (
//   collectionName,
//   dependentFilter
// ) => {
//   const docs = await getDocsExtFiltered(collectionName, dependentFilter);
//   return DBDocsToObject(docs);
// };

// export const getDocsIdExtFiltered = async (collectionName, dependentFilter) => {
//   const docs = await getDocsExtFiltered(collectionName, dependentFilter);
//   return DBDocsToIdExt(docs);
// };

// export const deleteAllDocsInCollection = async (collectionName) => {
//   const citySnapshot = await getDocs(collection(db, collectionName));
//   citySnapshot.forEach((item) => {
//     deleteDoc(doc(db, collectionName, item.id));
//   });
// };

// export const deleteAllDocsInCollectionByIds = async (collectionName, ids) => {
//   const batch = writeBatch(db);
//   ids.forEach((item) => {
//     batch.delete(doc(db, collectionName, item));
//   });
//   await batch.commit();
// };

// const checkIfExistByFieldValue = async (collectionName, key, value) => {
//   const q = query(collection(db, collectionName), where(key, "==", value));
//   const querySnapshot = await getDocs(q);
//   return querySnapshot.docs.length == 0;
// };

// export const addMultipledDocsInCollectionByValue = async (
//   collectionName,
//   keyField,
//   data,
//   checkduplic,
//   extid
// ) => {
//   const collectionRef = collection(db, collectionName);
//   const zu = data.map((item) => {
//     if (checkduplic == true) {
//       const checkFields =
//         extid == false
//           ? {
//               [keyField]: item[keyField],
//             }
//           : {
//               [keyField]: item[keyField],
//               extid: item["extid"],
//             };
//       return checkIfUniqueExistAndReturnDoc(collectionName, checkFields).then(
//         (res) => {
//           if (res == "none") {
//             addDoc(collectionRef, item);
//           }
//         }
//       );
//     } else {
//       return addDoc(collectionRef, item);
//     }
//   });
//   await Promise.allSettled(zu);
// };

// export const addDocInCollectionByValue = async (
//   collectionName,
//   key,
//   value,
//   data,
//   checkduplic
// ) => {
//   const collectionRef = collection(db, collectionName);
//   const check =
//     checkduplic == true
//       ? await checkIfExistByFieldValue(collectionName, key, value)
//       : true;
//   check && (await addDoc(collectionRef, data));
// };

// export const copyDocInCollection = async (collectionName, ids) => {
//   const zu = ids.map((item) => {
//     return getDoc(doc(db, collectionName, item)).then((res) => {
//       const data = res.data();
//       return addDoc(collection(db, collectionName), data);
//     });
//   });

//   await Promise.allSettled(zu);
// };

// export const updateMultipleDocInCollectionById = async (
//   collectionName,
//   ids,
//   data
// ) => {
//   ids.forEach((item) => {
//     updateDoc(doc(db, collectionName, item.id), data);
//   });
// };

// export const FullUpdateDocInCollectionById = async (
//   collectionName,
//   id,
//   data
// ) => {
//   setDoc(doc(db, collectionName, id), data);
// };

// export const checkIfUniqueExistAndReturnDoc = async (
//   collectionName,
//   request
// ) => {
//   return await checkIfUniqueExistAndReturnDocDM(collectionName, request);
// };
