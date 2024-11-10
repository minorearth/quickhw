import { app, db } from "./client actions/firebaseapp";
import { updateDocFieldsInCollectionById } from "@/app/dataModel";

export const updateDocFieldsInCollectionByIdClient = async (
  collectionName,
  id,
  data
) => {
  await updateDocFieldsInCollectionById(db, collectionName, id, data);
};
