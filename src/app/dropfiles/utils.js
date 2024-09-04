export const extractFileExtension = (filename) => {
  console.log(filename.split("."));
  return filename.split(".").pop();
};
