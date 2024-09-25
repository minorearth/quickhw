import {
  addDocInCollection,
  getDocsKeyValue,
  updateDocFieldsInCollectionById,
} from "../../data model/server actions/datamodel";

const ETL = (docs) => {
  const docsFormatted = docs.map((doc) => {
    const date = new Date(doc.datetime.seconds * 1000);
    return { id: doc.id, title: doc.title, datetime: date, user: doc.user };
  });
  return docsFormatted;
};

export default function useSurveyGridVM() {
  const getGridData = async (user) => {
    console.log(user);
    const docs = await getDocsKeyValue("surveys", "user", user);
    return ETL(docs);
  };

  return {
    addDocInCollection,
    getGridData,
    updateDocFieldsInCollectionById,
  };
}
