import {
  updateDocFieldsInCollectionById,
  addDocInCollection,
  getDocFromCollectionById,
} from "../../../data model/client actions/datamodel";

const ETL = (doc) => {
  const data = doc.surveys;
  const docsFormatted = Object.keys(data).map((doc) => {
    const date = new Date(data[doc].datetime.seconds * 1000);
    return {
      id: doc,
      title: data[doc].title,
      datetime: date,
    };
  });
  return { rows: docsFormatted, id: doc.id };
};

export default function useSurveyGridVM() {
  const getGridData = async (user) => {
    const doc = await getDocFromCollectionById("surveys", user);
    return ETL(doc);
    // return ETL(JSON.parse(doc));
  };

  return {
    addDocInCollection,
    getGridData,
    updateDocFieldsInCollectionById,
  };
}
