const stnd = {
  FILES_UPLOAD_GUIDE: (type) => {
    return `Перетащите сюда ${
      type == "img" ? "изображения(bmp,jpeg,gif,png)" : "файлы"
    } или нажмите на область для загрузки вручную`;
  },
};
export default stnd;
