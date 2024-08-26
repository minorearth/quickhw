import {
  getStorage,
  ref,
  uploadBytes,
  deleteObject,
  listAll,
} from "firebase/storage";
import { initializeApp } from "firebase/app";

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

export const UploadFileToTask = async ({ file, folder }) => {
  const filedb = await uploadFileToDB(file, `/capture/${folder}`);
};

const uploadFileToDB = async (file, folder) => {
  const storageRef = ref(storage, `${folder}/${file.name}`);
  const res = await uploadBytes(storageRef, file);
  return res;
};

export const deleteFileFromDB = (relativePath) => {
  const Ref = ref(storage, relativePath);
  return deleteObject(Ref);
};

export const getAllFiles = async (relativePath) => {
  const Ref = ref(storage, `/capture/${relativePath}`);
  const res = await listAll(Ref);
  return res;
};
