import {
  ref,
  uploadBytes,
  deleteObject,
  listAll,
  getDownloadURL,
} from "firebase/storage";

export const UploadFile = async ({ storage, file, folder }) => {
  const filedb = await uploadFileToDB(storage, file, `/capture/${folder}`);
  return filedb;
};

const uploadFileToDB = async (storage, file, folder) => {
  const storageRef = ref(storage, `${folder}/${file.name}`);
  const res = await uploadBytes(storageRef, file);
  const path = await getDownloadURL(res.ref);
  return path;
};

export const deleteFileFromDB = async (storage, relativePath) => {
  const Ref = ref(storage, relativePath);
  deleteObject(Ref)
    .then((res) => {})
    .catch((e) => {});
};

export const deleteAllFileFromDir = async (storage, relativePath) => {
  const Ref = ref(storage, relativePath);
  const listResults = await listAll(Ref);
  listResults.items.map((item) => {
    deleteObject(item);
  });
};

export const getAllFiles = async (storage, relativePath) => {
  const Ref = ref(storage, `/capture/${relativePath}`);
  const res = await listAll(Ref);
  return res;
};

export const deleteFile = async (storage, relativePath) => {
  const Ref = ref(storage, relativePath);
  deleteObject(Ref);
};

// export const deleteAllDocsInCollection = async (collectionName, timeLag) => {
//   let th = new Date();
//   th.setDate(th.getDate() - timeLag);
//   const thresold = Timestamp.fromDate(th);
//   const col = collection(db, collectionName);
//   const q = query(col, where("datetime", "<=", thresold));
//   const docs = await getDocs(q);
//   let log = { len: docs.docs.length, date: th.toString(), vers: "4" };
//   await Promise.all(
//     docs.docs.map(async (docS) => {
//       deleteAllFileFromDir(`/capture/${docS.id}`);
//       log = { ...log, [docS.id]: docS.id };
//       await deleteDoc(doc(db, collectionName, docS.id));
//     })
//   );
//   return log;
// };
