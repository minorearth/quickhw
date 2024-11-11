import { app, db, storage, auth } from "./client actions/firebaseapp";

import {
  updateDocFieldsInCollectionById,
  setDocInCollection,
  getDocDataFromCollectionById,
  getDocFromCollectionById,
  getDocFromCollectionByIdRealtime,
  addDocInCollection,
  getAllDocs,
  deleteDocFromCollection,
} from "@/app/db/dataModel";

import {
  UploadFile,
  deleteFileFromDB,
  deleteAllFileFromDir,
  getAllFiles,
  deleteFile,
} from "@/app/db/storage";

import { setAllIndexed } from "@/app/db/indexAdmin";

import {
  increaseIndexCurrInCollection,
  getCurrIndexDocID,
  getCurrIndex,
  searchInIndex,
  createNewUser,
} from "@/app/db/indexActions";

import { removeSurvey, removeFileFromSurvey } from "@/app/db/admin";

// getAuth(app);

export const updateDocFieldsInCollectionByIdClient = async (
  collectionName,
  id,
  data
) => {
  await updateDocFieldsInCollectionById(db, collectionName, id, data);
};

export const setDocInCollectionClient = async (collectionName, data, id) => {
  await setDocInCollection(db, collectionName, data, id);
};

export const increaseIndexCurrInCollectionClient = async (userId) => {
  return await increaseIndexCurrInCollection(db, userId);
};

export const getCurrIndexDocIDClient = async (userId) => {
  return await getCurrIndexDocID(db, userId);
};

export const getCurrIndexClient = async (userId) => {
  return await getCurrIndex(db, userId);
};

export const searchInIndexClient = async (
  manager,
  userpart,
  setSearchRows = () => {}
) => {
  return await searchInIndex(db, manager, userpart, setSearchRows);
};

export const removeSurveyClient = async (syrveyid, userid) => {
  await removeSurvey(db, storage, syrveyid, userid);
};

export const getDocDataFromCollectionByIdClient = async (
  collectionName,
  id
) => {
  return await getDocDataFromCollectionById(db, collectionName, id);
};

export const getDocsKeyValueClient = async (db, collectionName, key, value) => {
  return await getDocsKeyValue(db, collectionName, key, value);
};

export const getDocFromCollectionByIdClient = async (collectionName, id) => {
  return await getDocFromCollectionById(db, collectionName, id);
};

export const getDocFromCollectionByIdRealtimeClient = async (
  collectionName,
  id,
  refreshdata
) => {
  return await getDocFromCollectionByIdRealtime(
    db,
    collectionName,
    id,
    refreshdata
  );
};

export const addDocInCollectionClient = async (collectionName, data) => {
  return await addDocInCollection(db, collectionName, data);
};

export const getAllDocsClient = async (collectionName) => {
  return await getAllDocs(db, collectionName);
};

export const deleteDocFromCollectionClient = async (collectionName, id) => {
  await deleteDocFromCollection(db, collectionName, id);
};

export const removeFileFromSurveyClient = async (
  manager,
  syrveyid,
  filename
) => {
  await removeFileFromSurvey(db, storage, manager, syrveyid, filename);
};

export const setAllIndexedClient = async (indexed) => {
  await setAllIndexed(db, indexed);
};

export const UploadFileClient = async ({ file, folder }) => {
  return await UploadFile({ storage, file, folder });
};

export const deleteFileFromDBClient = async (relativePath) => {
  return deleteFileFromDB(storage, relativePath);
};

export const deleteAllFileFromDirClient = async (relativePath) => {
  await deleteAllFileFromDir(storage, relativePath);
};

export const getAllFilesClient = async (relativePath) => {
  return await getAllFiles(storage, relativePath);
};

export const deleteFileClient = async (relativePath) => {
  await deleteFile(storage, relativePath);
};

export const createNewUserClient = async (userId) => {
  return await createNewUser(db, userId);
};
