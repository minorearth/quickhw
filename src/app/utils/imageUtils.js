import mergeImages from "merge-images";
import "jimp";

export function getImageDimensions(file) {
  return new Promise(function (resolved, rejected) {
    new Jimp(file, (err, image) => {
      resolved({ w: image.bitmap.width, h: image.bitmap.height });
    });
  });
}

export const scaleToBase = (base, sDim) => {
  const scale = Number(Number(sDim.h / (sDim.w / base)).toFixed(0));
  if (sDim.w <= base) {
    return sDim;
  } else {
    return { w: base, h: scale };
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

const prepareImages = (photos, log) => {
  let pos = 0;
  let maxW = 0;
  let logsArray = [];
  const allimg = photos.map((img) => {
    logsArray.push({ src: img.src.slice(0, 1000), x: 0, y: pos });
    const res = { src: img.src, x: 0, y: pos };
    pos += img.h;
    maxW = Math.max(img.w, maxW);
    return res;
  });

  return { images: allimg, totalH: pos, maxW };
};

export const prepareAndMergeImagesTob46URI = async (photos, log) => {
  const imagesPrepared = prepareImages(photos, log);
  const b64URI = await mergeImages(imagesPrepared.images, {
    height: imagesPrepared.totalH,
    width: imagesPrepared.maxW,
  });
  return { b64URI, h: imagesPrepared.totalH, w: imagesPrepared.maxW };
};

export const b64URItoFile = async (b64URI, filename) => {
  const preBlob = await fetch(b64URI);
  const blob = await preBlob.blob();
  const file = new File([blob], filename, {
    type: blob.type,
  });
  return file;
};

export const bufferToFile = (buffer, filename) => {
  const file = new File([buffer], filename, {
    type: buffer.type,
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

const prepareImages2 = async (files, setProgress) => {
  const filesExtracted = await Promise.all(
    files.map(async (file) => {
      const arrayBuffer = await file.arrayBuffer();
      return new Promise(function (resolved, rejected) {
        new Jimp(arrayBuffer, (err, image) => {
          const sDimResized = scaleToBase(640, {
            w: image.bitmap.width,
            h: image.bitmap.height,
          });
          image.resize(sDimResized.w, sDimResized.h);
          resolved({
            arrayBuffer: arrayBuffer,
            jimpimg: image,
            w: sDimResized.w,
            h: sDimResized.h,
          });
        });
      });
    })
  );
  const maxW = Math.max(...filesExtracted.map((img) => img.w));
  let pos = 0;
  const allimg = filesExtracted.map((img) => {
    const res = { ...img, y: pos };
    pos += img.h;
    return res;
  });
  return { images: allimg, totalH: pos, maxW };
};

export const rotateImage = async (file, filename) => {
  return new Promise(function (resolved, rejected) {
    new Jimp(file, (err, image) => {
      image.rotate(90);
      image.getBuffer(Jimp.AUTO, (err, res) => {
        const file = new File([res], filename, {
          type: "image/png",
        });
        resolved(file);
      });
    });
  });
};

export const mergeAllImages = async (files, username, setProgress) => {
  const filesPrepared = await prepareImages2(files, setProgress);
  return new Promise(function (resolved, rejected) {
    new Jimp(
      filesPrepared.maxW,
      filesPrepared.totalH,
      "white",
      (err, image) => {
        filesPrepared.images.forEach((img) => {
          image.blit(img.jimpimg, 0, img.y);
        });

        image.getBuffer(Jimp.AUTO, (err, res) => {
          const filename = `${username}.jpg`;
          const file = new File([res], filename, {
            type: "image/png",
          });
          resolved(file);
        });
        // image.getBase64(Jimp.AUTO, (err, res) => {
        //   const filename = `${username}.jpg`;
        //   b64URItoFile(res, filename).then((file) => {
        //     resolved(file);
        //   });
        // });
      }
    );
  });
};
