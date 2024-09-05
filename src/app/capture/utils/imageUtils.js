import mergeImages from "merge-images";
import "jimp";

export function getImageDimensions(file) {
  return new Promise(function (resolved, rejected) {
    var i = document.createElement("img");
    i.onload = function () {
      resolved({ w: i.width, h: i.height });
    };
    i.src = file;
  });
}

export const scaleToBase = (base, sDim) => {
  if (sDim.w <= base) {
    return sDim;
  } else {
    return { w: base, h: sDim.h / (sDim.w / base) };
  }
};

export const resizeImg = (base64Str, w, h) => {
  return new Promise(function (resolved, rejected) {
    Jimp.read(base64Str, (err, screenJimp) => {
      screenJimp.resize(w, h);
      screenJimp.getBase64(Jimp.AUTO, (err, res) => {
        resolved({ src: res, w, h });
      });
    });
  });
};

export const resizeWebCamImg = async (base64Str, orientation, w, h) => {
  switch (true) {
    case (orientation == "portrait" && w < h) ||
      (orientation != "portrait" && w > h):
      return { src: base64Str, w, h };
    case (orientation == "portrait" && w >= h) ||
      (orientation != "portrait" && w <= h):
      return await resizeImg(base64Str, h, w);
  }
};

const prepareImages = (photos) => {
  let pos = 0;
  let maxW = 0;
  const allimg = photos.map((img) => {
    const res = { src: img.src, x: 0, y: pos };
    pos += img.h;
    maxW = Math.max(img.w, maxW);
    return res;
  });

  return { images: allimg, totalH: pos, maxW };
};

export const prepareAndMergeImagesTob46URI = async (photos) => {
  const images = prepareImages(photos);
  const b64 = await mergeImages(images.images, {
    height: images.totalH,
    width: images.maxW,
  });
  return b64;
};

export const b64URItoFile = async (b64URI, filename) => {
  const preBlob = await fetch(b64URI);
  const blob = await preBlob.blob();
  const file = new File([blob], filename, {
    type: blob.type,
  });
  return file;
};

export function blobToBase64(blob) {
  return new Promise((resolve, _) => {
    const reader = new FileReader();
    reader.onloadend = () => resolve(reader.result);
    reader.readAsDataURL(blob);
  });
}

export const mergeAllImages = async (files, username) => {
  const photos = await Promise.all(
    files.map(async (file) => {
      const base64Str = await blobToBase64(file);
      const sDim = await getImageDimensions(base64Str);
      return { src: base64Str, w: sDim.w, h: sDim.h };
    })
  );

  const b64URI = await prepareAndMergeImagesTob46URI(photos);
  const sDim = await getImageDimensions(b64URI);
  const sDimResized = scaleToBase(640, sDim);
  const base64StrResized = await resizeImg(
    b64URI,
    sDimResized.w,
    sDimResized.h
  );
  const filename = `${username}.jpg`;
  const file = await b64URItoFile(base64StrResized.src, filename);
  return file;
};
