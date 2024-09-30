import {
  addDocInCollection,
  getDocsKeyValue,
  updateDocFieldsInCollectionById,
  getDocFromCollectionById,
} from "../../../data model/server actions/datamodel";

import { setDocInCollection } from "../../../data model/client actions/migration";

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

const ETLMigration = (docs) => {
  const docsFormatted = docs.reduce((acc, doc, id) => {
    // const date = new Date(doc.datetime.seconds * 1000);
    return {
      ...acc,
      [`survey${id}`]: {
        title: doc.title,
        datetime: doc.datetime,
        user: doc.user,
        files: !!doc.files ? doc.files : {},
      },
    };
  }, {});
  return docsFormatted;
};

export default function useSurveyGridVM() {
  const getGridDataMigration = async (user) => {
    const docs = await getDocsKeyValue(
      "surveys",
      "user",
      "r.v.lavrentev@school1298.ru"
    );
    return ETLMigration(docs);
  };

  const getGridData = async (user) => {
    const doc = await getDocFromCollectionById("surveys2", user);
    console.log("doc", doc);
    // setDocInCollection(
    //   "surveys2",
    //   { surveys: doc.surveys },
    //   "KtT1bUjz7few0Y5zjzucKZ5IMhy1"
    // );
    return ETL(doc);
  };

  return {
    addDocInCollection,
    getGridData,
    updateDocFieldsInCollectionById,
    getGridDataMigration,
  };
}
