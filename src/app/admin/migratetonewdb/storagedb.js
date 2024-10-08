"use client";
import {
  getStorage,
  ref,
  uploadBytes,
  deleteObject,
  listAll,
} from "firebase/storage";
import { getDownloadURL } from "firebase/storage";
import { app2 } from "./firebaseapp";

const storage = getStorage(app2);

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

export const deleteFileFromDB = async (relativePath) => {
  const Ref = ref(storage, relativePath);
  deleteObject(Ref)
    .then((res) => {})
    .catch((e) => {});
};

export const deleteAllFileFromDir = async (relativePath) => {
  const Ref = ref(storage, relativePath);
  const listResults = await listAll(Ref);
  listResults.items.map((item) => {
    deleteObject(item);
  });
};

export const getAllFiles = async (relativePath) => {
  const Ref = ref(storage, `/capture/${relativePath}`);
  const res = await listAll(Ref);
  return res;
};
