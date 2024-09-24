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

function BufferToArrayBuffer(buffer) {
  const arrayBuffer = new ArrayBuffer(buffer.data.length);
  const view = new Uint8Array(arrayBuffer);
  for (let i = 0; i < buffer.data.length; ++i) {
    view[i] = buffer.data[i];
  }
  return arrayBuffer;
}

export function arrayBufferToBuffer(arrayBuffer) {
  const buffer = Buffer.alloc(arrayBuffer.byteLength);
  const view = new Uint8Array(arrayBuffer);
  for (let i = 0; i < buffer.length; ++i) {
    buffer[i] = view[i];
  }
  return buffer;
}

export const fileToBuffer = async (file) => {
  const AB = await file.arrayBuffer();
  const buffer = arrayBufferToBuffer(AB);
  return buffer;
};

export const bufferToFile = (buffer, filename, type) => {
  const file = new File([BufferToArrayBuffer(buffer)], filename, {
    type,
  });
  return file;
};
