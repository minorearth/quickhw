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

export const updateDocFieldsInCollectionById = async (
  db,
  collectionName,
  id,
  data
) => {
  console.log("here i am");
  await updateDoc(doc(db, collectionName, id), data);
};
