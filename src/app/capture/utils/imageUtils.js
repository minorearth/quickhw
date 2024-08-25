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

export const resize = async (screen, orientation, w, h) => {
  switch (true) {
    case (orientation == "portrait" && w < h) ||
      (orientation != "portrait" && w > h):
      return { src: screen, w, h };
    case (orientation == "portrait" && w >= h) ||
      (orientation != "portrait" && w <= h):
      return await resizeImg(screen, h, w);
  }
};
