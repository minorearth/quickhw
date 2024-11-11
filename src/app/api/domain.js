import { app, db } from "./firebaseapp";
import {
  updateDocFieldsInCollectionById,
  getDocsKeyValue,
  setDocInCollection,
} from "@/app/db/dataModel";

import {
  createNewUser,
  increaseIndexCurrInCollection,
  getCurrIndexDocID,
  getCurrIndex,
  createIndex,
} from "@/app/db/indexActions";

export const updateDocFieldsInCollectionByIdAPI = async (
  collectionName,
  id,
  data
) => {
  await updateDocFieldsInCollectionById(db, collectionName, id, data);
};

export const getDocsKeyValueAPI = async (collectionName, key, value) => {
  return await getDocsKeyValue(db, collectionName, key, value);
};

export const setDocInCollectionAPI = async (collectionName, data, id) => {
  await setDocInCollection(db, collectionName, data, id);
};

export const createNewUserAPI = async (userId) => {
  return await createNewUser(db, userId);
};

export const increaseIndexCurrInCollectionAPI = async (userId) => {
  return await increaseIndexCurrInCollection(db, userId);
};

export const getCurrIndexDocIDAPI = async (userId) => {
  return await getCurrIndexDocID(db, userId);
};

export const getCurrIndexAPI = async (userId) => {
  return await getCurrIndex(db, userId);
};

export const createIndexAPI = async () => {
  await createIndex(db);
};
