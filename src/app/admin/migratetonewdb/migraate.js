import { app } from "../../data model/client actions/firebaseapp";
import { app2 } from "./firebaseapp";
import {
  getDocFromCollectionById,
  setDocInCollection,
  getAllDocs,
  updateDocFieldsInCollectionById,
} from "./datamodel";

import { getJimpFileByUrl } from "../../../globals/utils/imageUtils";

import { UploadFile } from "./storagedb";

import { initializeFirestore } from "firebase/firestore";

const db1 = initializeFirestore(app, {
  experimentalForceLongPolling: true,
  useFetchStreams: false,
});

const db2 = initializeFirestore(app2, {
  experimentalForceLongPolling: true,
  useFetchStreams: false,
});

const copyDoc = async (
  db1,
  db2,
  collection,
  newcollection,
  docid,
  newdocid
) => {
  const doc = await getDocFromCollectionById(db1, collection, docid);
  setDocInCollection(db2, newcollection, doc.data, newdocid);
};

export const copyAllDocs = async () => {
  // copyDoc(
  //   db1,
  //   db2,
  //   "surveys2",
  //   "surveys",
  //   "KtT1bUjz7few0Y5zjzucKZ5IMhy1",
  //   "3a5nHnKXJFTMM0eCooHqKefECTj1"
  // );
  const querySnapshot = await getAllDocs(db1, "surveysresults");
  querySnapshot.forEach((doc) => {
    setDocInCollection(db2, "surveysresults", doc.data(), doc.id);
  });
};

const filepath =
  "https://firedbasestorage.googleapis.com/v0/b/testchallenge-52d1b.appspot.com/o/capture%2F2RwsACvWjdbHWOll6Xxl%2F%3A)%20%D0%BF%D0%BE%D1%81%D1%82%D0%B0%D0%B2%D1%82%D0%B5%20%D0%BF%D1%8F%D1%82%D1%8C%20%D0%BF%D0%B6%D0%BF%D0%B6%D0%BF%D0%B4%D0%BF.jpg?alt=media&token=f5206ba0-38d9-4272-b88d-bb1998adb33b";

const copyfile = async (db1, db2, collection, docid) => {
  const doc = await getDocFromCollectionById(db1, collection, docid);
  setDocInCollection(db2, surveys, doc.data, docid);
};

export const migrateAllfiles = async () => {
  const dc = await getDocFromCollectionById(
    db2,
    "surveys",
    "3a5nHnKXJFTMM0eCooHqKefECTj1"
  );
  const managerSurv = dc.data;
  const querySnapshot = await getAllDocs(db2, "surveysresults");
  // const querySnapshot = [
  //   await getDocFromCollectionById(
  //     db1,
  //     "surveysresults",
  //     "5G9X9JCZKDQyNU2SvKSJ"
  //   ),
  // ];

  for (let i = 0; i < querySnapshot.docs.length; i++) {
    // const data = querySnapshot[0].data;
    const data = querySnapshot.docs[i].data();

    // const id = querySnapshot[0].id;
    const id = querySnapshot.docs[i].id;
    const surveyname = managerSurv.surveys[id];

    const keys = Object.keys(data?.files);
    for (let j = 0; j < keys.length; j++) {
      if (!surveyname) break;
      const username = data?.files[keys[j]];
      const filepath = username.path;
      if (!filepath || filepath.includes("/b/getitquick-79ca5.appspot.com/o")) {
        console.log("skipped", filepath);
        continue;
      }
      const fileName = username.name;
      const folder = `3a5nHnKXJFTMM0eCooHqKefECTj1/${id}`;
      try {
        const file = await getJimpFileByUrl(filepath, fileName);
        const newpath = await UploadFile({ file, folder });
        const encoded = decodeURI(newpath);
        username.path = encoded;
      } catch (e) {
        console.log(e);
        username.path = "notfound";
      }
      await updateDocFieldsInCollectionById(db2, "surveysresults", id, {
        files: data?.files,
        manager: "3a5nHnKXJFTMM0eCooHqKefECTj1",
        surveyname: surveyname.title,
      });
    }
  }

  //   try {
  //     const response = await fetch(filepath);
  //     const blob = await response.blob();
  //     const file = new File([blob], fileName, {
  //       type: blob.type,
  //     });
  //     const newpath = await UploadFile({ file, folder });
  //   } catch (e) {
  //     console.log("error");
  //   }
};
