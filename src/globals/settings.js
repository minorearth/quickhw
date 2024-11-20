import local from "./local";
const stn = {
  typepicker: { TYPE_PICKER_TIMEOUT: 400 },
  ui: { FLOAT_BTN_PADDING: 80 },
  surveys: {
    filetypes: {
      img: {
        name: "img",
        allowed_ext: {
          "image/png": [".png", ".jpg", ".jpeg", ".bmp", ".gif"],
        },
        SHORTNAME: "i",
        caption: local.ru.caption.FILE_TYPE_IMG,
        save_ext: ".jpg",
        multiple: true,
        drop_message: local.ru.text.DROP_GUIDE_IMG,
      },
      zip: {
        name: "zip",
        allowed_ext: {},
        SHORTNAME: "z",
        caption: local.ru.caption.FILE_TYPE_ANYFILE,
        save_ext: ".zip",
        multiple: true,
        drop_message: local.ru.text.DROP_GUIDE_FILES,
      },
      anyfile: {
        name: "anyfile",
        allowed_ext: {},
        SHORTNAME: "a",
        caption: local.ru.caption.FILE_TYPE_SINGLEFILE,
        save_ext: "",
        multiple: false,
        drop_message: local.ru.text.DROP_GUIDE_SINGLEFILE,
      },
      text: {
        name: "text",
        allowed_ext: {},
        SHORTNAME: "t",
        caption: local.ru.caption.FILE_TYPE_TEXT,
        save_ext: ".txt",
        multiple: false,
        drop_message: "",
      },
    },
    surveytypes: {
      task: {
        name: "task",
        caption: local.ru.caption.SURVEY_TYPE_TASK,
        SHORTNAME: "t",
      },
      collection: {
        name: "collection",
        caption: local.ru.caption.SURVEY_TYPE_COLLECTION,
        SHORTNAME: "c",
      },
    },
  },
  files: {
    MAX_SIZE: 10 * 1024 * 1024,
    NAME_CLEANUP_INTERVAL: 5 * 60 * 1000,
  },
  SPLASH_DURATION: 2000,
};
export default stn;
