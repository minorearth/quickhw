"use server";
import {
  getStorage,
  ref,
  uploadBytes,
  deleteObject,
  listAll,
} from "firebase/storage";
import { getDownloadURL } from "firebase/storage";

import { initializeApp } from "firebase/app";

import { bufferToFile } from "@/app/utils/fileUtils";
import { app } from "./firebaseapp";

// const firebaseConfig = {
//   apiKey: process.env.API_KEY,
//   authDomain: process.env.AUTH_DOMAIN,
//   projectId: process.env.PROJECT_ID,
//   storageBucket: "testchallenge-52d1b.appspot.com",
//   messagingSenderId: process.env.MESSAGING_SENDER_ID,
//   appId: process.env.APP_ID,
//   measurementId: process.env.MEASUREMENT_ID,
// };

// const firebaseConfig = {
//   apiKey: process.env.API_KEY,
//   authDomain: process.env.AUTH_DOMAIN,
//   projectId: process.env.ROJECT_ID,
//   storageBucket: process.env.STORAGE_BUCKET,
//   messagingSenderId: process.env.MESSAGING_SENDER_ID,
//   appId: process.env.APP_ID,
//   measurementI: process.env.MEASUREMENT_ID,
// };

// const app = initializeApp(firebaseConfig);
const storage = getStorage(app);

export const UploadFile = async ({ buffer, filename, filetype, folder }) => {
  //Strange behaviour -buffer comes as object from client in case of Use server
  const file = bufferToFile(buffer, filename, filetype);
  const filedb = await uploadFileToDB(file, `/capture/${folder}`);
  const path = await getDownloadURL(filedb.ref);
  return path;
};

const uploadFileToDB = async (file, folder) => {
  const storageRef = ref(storage, `${folder}/${file.name}`);
  const res = await uploadBytes(storageRef, file);
  return res;
};

// const formData = new FormData();
//       formData.set(`image`, responseBlob);

//       // This is a server action!!
//      const result = await uploadImage({ formData });

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
