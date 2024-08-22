import {
  getStorage,
  ref,
  uploadBytes,
  getDownloadURL,
  deleteObject,
  getBlob,
  getBytes,
  listAll,
} from "firebase/storage";
//   import { v4 as uuidv4 } from "uuid";
//   import { ExtractFileExtension } from "../utils/utilsFS";
import { initializeApp } from "firebase/app";
//   import { uploadPath } from "../components/TaskEditor/hooks/useMultiField";

const firebaseConfig = {
  apiKey: "AIzaSyBwMnO7HaGuHu6LrzsTj6y6J9BojyC1ei0",
  authDomain: "testchallenge-52d1b.firebaseapp.com",
  projectId: "testchallenge-52d1b",
  storageBucket: "testchallenge-52d1b.appspot.com",
  messagingSenderId: "785621858975",
  appId: "1:785621858975:web:e1fcef81ff499466bd40aa",
  measurementId: "G-E08Z0JNFH2",
};

const app = initializeApp(firebaseConfig);
const storage = getStorage(app);

//   const getUploadPath = (fieldType, fieldName, TaskId) => {
//     return `${uploadPath(fieldType)}/${TaskId}/${fieldName}`;
//   };

export const UploadFileToTask = async (
  { file, folder },
  fieldType,
  fieldName,
  TaskId
) => {
  const filedb = await uploadFileToDB(file, `/capture/${folder}`);
  // const fullPath = await getURLbyRelativePath(filedb.ref.fullPath);
  // const relpath = filedb.ref.fullPath;
  // return { fullPath, relpath };
};

export const uploadFileToDB = async (file, folder) => {
  // const storageRef = ref(storage, `${folder}/${uuidv4()}.${extension}`);
  const storageRef = ref(storage, `${folder}/${file.name}`);
  const res = await uploadBytes(storageRef, file);
  return res;
};

export const getURL = async (ref) => {
  const url = await getDownloadURL(ref);
  return url;
};

export const getURLbyRelativePath = (relativePath) => {
  const Ref = ref(storage, relativePath);
  return getDownloadURL(Ref);
};

export const getFileBytes = async (relativePath) => {
  const Ref = ref(storage, relativePath);
  const file = getBytes(Ref);
  return file;
};

export const deleteFileFromDB = (relativePath) => {
  const Ref = ref(storage, relativePath);
  return deleteObject(Ref);
};

export const getAllFiles = async (relativePath) => {
  console.log("relativePath", relativePath);
  const Ref = ref(storage, `/capture/${relativePath}`);
  const res = await listAll(Ref);
  return res;
};
