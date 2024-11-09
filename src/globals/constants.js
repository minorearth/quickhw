const stn = {
  msg: {
    snack: {
      PICK_FILES: "Ты хоть выбери что-нибудь :(",
      PICK_NAME: "Ввведи свою фамилию, будь другом...",
      JOB_DONE: "Все OK! Молодец",
    },
    alert: {
      PSW_RECOVERY_TITLE: "Проверь почту",
      PSW_RECOVERY_TEXT:
        "На ваш почтовый ящик выслано письмо, перейдите по ссылке в письме для смены пароля",
      PSW_ACOUNT_CREATED_TITLE: "Ваш аккаунт успешно создан!",
      PSW_ACOUNT_CREATED_TEXT:
        "На ваш почтовый ящик выслано письмо, перейдите по ссылке в письме для активации аккаунта",
    },
  },
  caption: {
    ENTER_NAME: "Укажи фамилию",
  },
  defaults: {
    NEW_SURVEY: "Новый опрос",
    BLACKBOARD_TEXT:
      "ЗАДАНИЕ[шаблон]\n\n1)Скачай файл из задания\n2)Заполни файл\n3)Перейди с телефона по ссылке в QR-коде, нажми на область загрузки файлов. Выбери файлы и отправь учителю\n\nили\n\nПерейди с телефона по ссылке в QR-коде, нажми на область загрузки файлов. Cфотографируй документ с монитора, так чтобы был виден номер ПК и отправь учителю\n\nили\n\nОткрой ссылку на компьютере,выбери файлы и отправь их учителю\n\nУдачи!!!",
  },
  surveys: {
    filetypes: {
      img: {
        name: "img",
        allowed_ext: {
          "image/png": [".png", ".jpg", ".jpeg", ".bmp", ".gif"],
        },
        SHORTNAME: "i",
        caption: "Изображения",
        save_ext: ".jpg",
        multiple: true,
      },
      zip: {
        name: "zip",
        allowed_ext: {},
        SHORTNAME: "z",
        caption: "Любые файлы",
        save_ext: ".zip",
        multiple: true,
      },
      anyfile: {
        name: "anyfile",
        allowed_ext: {},
        SHORTNAME: "a",
        caption: "Один любой файл",
        save_ext: "",
        multiple: false,
      },
      text: {
        name: "text",
        allowed_ext: {},
        SHORTNAME: "t",
        caption: "Текст",
        save_ext: ".txt",
        multiple: false,
      },
    },
    surveytypes: {
      task: { name: "task", caption: "Проверка знаний", SHORTNAME: "t" },
      collection: {
        name: "collection",
        caption: "Простой сбор файлов",
        SHORTNAME: "c",
      },
    },
  },
  files: {
    MAX_SIZE: 10 * 1024 * 1024,
    UPLOAD_TEXT:
      " Максимальный размер файла 10 мегабайт, файл не появится в списке на загрузку, если он больше 10 мегабайт",
    NAME_CLEANUP_INTERVAL: 5 * 60 * 1000,
  },
  SPLASH_DURATION: 2000,
};
export default stn;
