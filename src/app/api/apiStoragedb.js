"use server";
import { getStorage, ref, deleteObject, listAll } from "firebase/storage";

import { app } from "./firebaseapp";

const storage = getStorage(app);

export const deleteAllFileFromDir = async (relativePath) => {
  const Ref = ref(storage, relativePath);
  const listResults = await listAll(Ref);
  listResults.items.map((item) => {
    deleteObject(item);
  });
};
