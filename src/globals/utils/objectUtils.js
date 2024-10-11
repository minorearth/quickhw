export const ObjtoArr = (obj) => {
  return !obj
    ? []
    : Object.keys(obj).map((key) => {
        const datetime = new Date(obj[key]?.datetime?.seconds * 1000);
        return {
          name: obj[key].name,
          id: key,
          path: obj[key].path,
          type: obj[key].type,
          datetime: datetime,
        };
      });
};
