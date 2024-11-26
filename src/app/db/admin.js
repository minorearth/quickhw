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
  onSnapshot,
  arrayUnion,
  arrayRemove,
  initializeFirestore,
} from "firebase/firestore";

import {
  getDocDataFromCollectionById,
  updateDocFieldsInCollectionById,
  getAllDocs,
} from "@/app/db/dataModel";

import { deleteAllFileFromDir, deleteFile } from "@/app/db/storage";
import stn from "@/globals/settings";

import {
  deleteAllRecordsFromIndex,
  deleteUserSurveyFromIndex,
} from "./indexAdmin";

export const backup = async (db) => {
  const cols = [
    stn.collections.SURVEYS,
    stn.collections.SURVEY_RESULTS,
    stn.collections.USER_META,
    stn.collections.INDEX_CURR,
    stn.collections.INDEX,
  ];
  cols.forEach(async (collection) => {
    const docs = await getAllDocs(db, collection);
    for (let i = 0; i < docs.docs.length; i++) {
      const data = docs.docs[i].data();
      const id = docs.docs[i].id;
      setDoc(doc(db, collection + "_backup", id), data);
    }
  });
};

export const removeSurvey = async (db, storage, syrveyid, userid) => {
  const dc = await getDocDataFromCollectionById(
    db,
    stn.collections.SURVEYS,
    userid
  );
  const managerSurv = dc.data;
  delete managerSurv.surveys[syrveyid];
  updateDocFieldsInCollectionById(
    db,
    stn.collections.SURVEYS,
    userid,
    managerSurv
  );
  deleteDoc(doc(db, stn.collections.SURVEY_RESULTS, syrveyid));
  deleteAllFileFromDir(storage, `/capture/${userid}/${syrveyid}`);
  deleteAllRecordsFromIndex(db, userid, syrveyid);
};

const extractusername = (filename) => {
  return filename.slice(0, filename.lastIndexOf("."));
};

export const removeFileFromSurvey = async (
  db,
  storage,
  manager,
  syrveyid,
  filename
) => {
  const username = extractusername(filename);
  const survveyRessult = await getDocDataFromCollectionById(
    db,
    stn.collections.SURVEY_RESULTS,
    syrveyid
  );

  delete survveyRessult.data.files[username];
  updateDocFieldsInCollectionById(
    db,
    stn.collections.SURVEY_RESULTS,
    syrveyid,
    survveyRessult.data
  );
  deleteFile(storage, `/capture/${manager}/${syrveyid}/${filename}`);
  deleteUserSurveyFromIndex(db, manager, syrveyid, username);
};
