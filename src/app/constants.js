import { Splash } from "next/font/google";

const stn = {
  msg: {
    PICK_FILES: "Ты хоть выбери что-нибудь :(",
    PICK_NAME: "Ввведи свою фамилию, будь другом...",
    JOB_DONE: "Все OK! Молодец",
  },
  caption: {
    ENTER_NAME: "Укажи фамилию",
  },
  defaults: {
    NEW_SURVEY: "Новый опрос",
    BLACKBOARD_TEXT:
      "ЗАДАНИЕ[шаблон]\n\n1)Скачай файл из задания\n2)Заполни файл\n3)Перейди с телефона по ссылке в QR-коде, нажми на область загрузки файлов. Выбери файлы и отправь учителю\n\nили\n\nПерейди с телефона по ссылке в QR-коде, нажми на область загрузки файлов. Cфотографируй документ с монитора, так чтобы был виден номер ПК и отправь учителю\n\nили\n\nОткрой ссылку на компьютере,выбери файлы и отправь их учителю\n\nУдачи!!!",
  },
  files: {
    ALLOWED_IMG: [".png", ".jpg", ".jpeg", ".bmp", ".gif"],
    MAX_SIZE: 10 * 1024 * 1024,
    UPLOAD_TEXT:
      " Максимальный размер файла 10 мегабайт, файл не появится в списке на загрузку, если он больше 10 мегабайт",
    droptypes: {
      IMAGES: "img",
      FILES: "zip",
    },
    NAME_CLEANUP_INTERVAL: 5 * 60 * 1000,
  },
  SPLASH_DURATION: 2000,
};
export default stn;