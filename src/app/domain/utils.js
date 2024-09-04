import { UploadFile } from "../../storagedb";
import { getDownloadURL } from "firebase/storage";
import { updateDocFieldsInCollectionById } from "../../datamodel";

export const UploadFileAndRefreshcollection = async (
  file,
  session,
  username
) => {
  const fileDB = await UploadFile({ file, folder: session });
  const filePath = await getDownloadURL(fileDB.ref);
  // const fileMeta = await getMetadata(fileDB);
  // const dateFormatted = formatDate(fileMeta.updated);
  await updateDocFieldsInCollectionById("surveys", session, {
    [`files.${username}`]: { path: filePath, id: file.name, name: file.name },
  });
};
