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

const resizeImg = (screen, w, h) => {
  return new Promise(function (resolved, rejected) {
    Jimp.read(screen, (err, screenJimp) => {
      screenJimp.resize(w, h);
      screenJimp.getBase64(Jimp.AUTO, (err, res) => {
        resolved({ src: res, w, h });
      });
    });
  });
};

export const resizeWebCamImg = async (screen, orientation, w, h) => {
  switch (true) {
    case (orientation == "portrait" && w < h) ||
      (orientation != "portrait" && w > h):
      return { src: screen, w, h };
    case (orientation == "portrait" && w >= h) ||
      (orientation != "portrait" && w <= h):
      return await resizeImg(screen, h, w);
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
