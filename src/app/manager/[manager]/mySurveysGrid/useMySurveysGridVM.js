import {
  addDocInCollectionClient,
  getDocFromCollectionByIdClient,
  updateDocFieldsInCollectionByIdClient,
} from "@/app/domain/domain";

const ETL = (doc) => {
  const data = doc.surveys;
  const docsFormatted = Object.keys(data).map((doc) => {
    const date = new Date(data[doc].datetime.seconds * 1000);
    return {
      id: doc,
      title: data[doc].title,
      datetime: date,
      type: data[doc].type,
    };
  });
  return { rows: docsFormatted, id: doc.id };
};

export default function useSurveyGridVM() {
  const getGridData = async (user) => {
    const doc = await getDocFromCollectionByIdClient("surveys", user);
    return ETL(doc);
  };

  return {
    addDocInCollection: addDocInCollectionClient,
    getGridData,
    updateDocFieldsInCollectionByIdClient,
  };
}
