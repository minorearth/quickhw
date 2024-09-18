import JSZip from "jszip";

export const extractFileExtension = (filename) => {
  return filename.split(".").pop();
};

export const compressFiles = async (files, filename) => {
  var zip = new JSZip();
  files.forEach((file) => zip.file(file.name, file));
  const fileZIPpedBlob = await zip.generateAsync({ type: "blob" });
  const fileZIPped = new File([fileZIPpedBlob], filename, {
    type: fileZIPpedBlob.type,
  });
  return fileZIPped;
};
