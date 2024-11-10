import { app, db } from "./firebaseapp";
import { updateDocFieldsInCollectionById } from "@/app/dataModel";

export const updateDocFieldsInCollectionByIdAPI = async (
  collectionName,
  id,
  data
) => {
  await updateDocFieldsInCollectionById(db, collectionName, id, data);
};
