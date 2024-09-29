import {
  addDocInCollection,
  getDocsKeyValue,
  updateDocFieldsInCollectionById,
  getDocFromCollectionById,
} from "../../data model/server actions/datamodel";

const ETL = (docs) => {
  console.log(docs);
  const data = docs.surveys;
  // console.log("docs", docs);
  const docsFormatted = Object.keys(data).map((doc) => {
    const date = new Date(data[doc].datetime.seconds * 1000);
    return {
      id: doc,
      title: data[doc].title,
      datetime: date,
    };
  });
  return { rows: docsFormatted, id: docs.id };
};

// const ETLMigration = (docs) => {
//   const docsFormatted = docs.reduce((acc, doc, id) => {
//     // const date = new Date(doc.datetime.seconds * 1000);
//     return {
//       ...acc,
//       [`survey${id}`]: {
//         title: doc.title,
//         datetime: doc.datetime,
//         user: doc.user,
//         files: !!doc.files ? doc.files : {},
//       },
//     };
//   }, {});
//   console.log(docsFormatted);
//   return docsFormatted;
// };

export default function useSurveyGridVM() {
  // const getGridDataMigration = async (user) => {
  //   const docs = await getDocsKeyValue("surveys", "user", user);
  //   return ETLMigration(docs);
  // };

  const getGridData = async (user) => {
    const doc = await getDocFromCollectionById("surveys2", user);
    return ETL(doc);
  };

  return {
    addDocInCollection,
    getGridData,
    updateDocFieldsInCollectionById,
    // getGridDataMigration,
  };
}
