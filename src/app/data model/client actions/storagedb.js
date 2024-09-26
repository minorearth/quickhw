"use client";
import {
  getStorage,
  ref,
  uploadBytes,
  deleteObject,
  listAll,
} from "firebase/storage";
import { getDownloadURL } from "firebase/storage";
import { app } from "./firebaseapp";

const storage = getStorage(app);

export const UploadFile = async ({ file, folder }) => {
  const filedb = await uploadFileToDB(file, `/capture/${folder}`);
  return filedb;
};

const uploadFileToDB = async (file, folder) => {
  const storageRef = ref(storage, `${folder}/${file.name}`);
  const res = await uploadBytes(storageRef, file);
  const path = await getDownloadURL(res.ref);
  return path;
};
