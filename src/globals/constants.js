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
  // grid: {
  //   // Root
  //   noRowsLabel: "Нет данных",
  //   noResultsOverlayLabel: "Ничего не найдено",

  //   // Density selector toolbar button text
  //   toolbarDensity: "Density",
  //   toolbarDensityLabel: "Density",
  //   toolbarDensityCompact: "Compact",
  //   toolbarDensityStandard: "Standard",
  //   toolbarDensityComfortable: "Comfortable",

  //   // Columns selector toolbar button text
  //   toolbarColumns: "Columns",
  //   toolbarColumnsLabel: "Select columns",

  //   // Filters toolbar button text
  //   toolbarFilters: "Filters",
  //   toolbarFiltersLabel: "Show filters",
  //   toolbarFiltersTooltipHide: "Hide filters",
  //   toolbarFiltersTooltipShow: "Show filters",
  //   toolbarFiltersTooltipActive: (count) =>
  //     count !== 1 ? `${count} активн.` : `${count} авктивн.`,

  //   // Quick filter toolbar field
  //   toolbarQuickFilterPlaceholder: "Search…",
  //   toolbarQuickFilterLabel: "Search",
  //   toolbarQuickFilterDeleteIconLabel: "Clear",

  //   // Export selector toolbar button text
  //   toolbarExport: "Export",
  //   toolbarExportLabel: "Export",
  //   toolbarExportCSV: "Download as CSV",
  //   toolbarExportPrint: "Print",
  //   toolbarExportExcel: "Download as Excel",

  //   // Columns management text
  //   columnsManagementSearchTitle: "Поиск столбца",
  //   columnsManagementNoColumns: "Без столбцов",
  //   columnsManagementShowHideAllText: "Показать/скрыть все",
  //   columnsManagementReset: "Сбросить",

  //   // Filter panel text
  //   filterPanelAddFilter: "Add filter",
  //   filterPanelRemoveAll: "Remove all",
  //   filterPanelDeleteIconLabel: "Delete",
  //   filterPanelLogicOperator: "Logic operator",
  //   filterPanelOperator: "Оператор",
  //   filterPanelOperatorAnd: "And",
  //   filterPanelOperatorOr: "Or",
  //   filterPanelColumns: "Столбцы",
  //   filterPanelInputLabel: "Значение",
  //   filterPanelInputPlaceholder: "Значение",

  //   // Filter operators text
  //   filterOperatorContains: "содержит",
  //   filterOperatorDoesNotContain: "не содержит",
  //   filterOperatorEquals: "равен",
  //   filterOperatorDoesNotEqual: "не равен",
  //   filterOperatorStartsWith: "начинается с",
  //   filterOperatorEndsWith: "заканчивается на",
  //   filterOperatorIs: "равен",
  //   filterOperatorNot: "не равен",
  //   filterOperatorAfter: "после",
  //   filterOperatorOnOrAfter: "в эту дату или позже",
  //   filterOperatorBefore: "до",
  //   filterOperatorOnOrBefore: "в эту дату или раньше",
  //   filterOperatorIsEmpty: "пустой",
  //   filterOperatorIsNotEmpty: "не пустой",
  //   filterOperatorIsAnyOf: "любой из перечисленных",
  //   "filterOperator=": "=",
  //   "filterOperator!=": "!=",
  //   "filterOperator>": ">",
  //   "filterOperator>=": ">=",
  //   "filterOperator<": "<",
  //   "filterOperator<=": "<=",

  //   // Header filter operators text
  //   headerFilterOperatorContains: "Contains",
  //   headerFilterOperatorDoesNotContain: "Does not contain",
  //   headerFilterOperatorEquals: "Equals",
  //   headerFilterOperatorDoesNotEqual: "Does not equal",
  //   headerFilterOperatorStartsWith: "Starts with",
  //   headerFilterOperatorEndsWith: "Ends with",
  //   headerFilterOperatorIs: "Is",
  //   headerFilterOperatorNot: "Is not",
  //   headerFilterOperatorAfter: "Is after",
  //   headerFilterOperatorOnOrAfter: "Is on or after",
  //   headerFilterOperatorBefore: "Is before",
  //   headerFilterOperatorOnOrBefore: "Is on or before",
  //   headerFilterOperatorIsEmpty: "Is empty",
  //   headerFilterOperatorIsNotEmpty: "Is not empty",
  //   headerFilterOperatorIsAnyOf: "Is any of",
  //   "headerFilterOperator=": "Equals",
  //   "headerFilterOperator!=": "Not equals",
  //   "headerFilterOperator>": "Greater than",
  //   "headerFilterOperator>=": "Greater than or equal to",
  //   "headerFilterOperator<": "Less than",
  //   "headerFilterOperator<=": "Less than or equal to",

  //   // Filter values text
  //   filterValueAny: "any",
  //   filterValueTrue: "true",
  //   filterValueFalse: "false",

  //   // Column menu text
  //   columnMenuLabel: "Menu",
  //   columnMenuShowColumns: "Show columns",
  //   columnMenuManageColumns: "Настроить столбцы",
  //   columnMenuFilter: "Фильтр",
  //   columnMenuHideColumn: "Скрыть столбец",
  //   columnMenuUnsort: "Не сортировать",
  //   columnMenuSortAsc: "Сортировать по возрастанию",
  //   columnMenuSortDesc: "Сортировать по убыванию",

  //   // Column header text
  //   columnHeaderFiltersTooltipActive: (count) =>
  //     count !== 1 ? `${count} активн.` : `${count} активн.`,
  //   columnHeaderFiltersLabel: "Показать фильтры",
  //   columnHeaderSortIconLabel: "Сортировать",

  //   // Rows selected footer text
  //   footerRowSelected: (count) =>
  //     count !== 1
  //       ? `${count.toLocaleString()} rows selected`
  //       : `${count.toLocaleString()} row selected`,

  //   // Total row amount footer text
  //   footerTotalRows: "Total Rows:",

  //   // Total visible row amount footer text
  //   footerTotalVisibleRows: (visibleCount, totalCount) =>
  //     `${visibleCount.toLocaleString()} из ${totalCount.toLocaleString()}`,

  //   // Checkbox selection text
  //   checkboxSelectionHeaderName: "Checkbox selection",
  //   checkboxSelectionSelectAllRows: "Select all rows",
  //   checkboxSelectionUnselectAllRows: "Unselect all rows",
  //   checkboxSelectionSelectRow: "Select row",
  //   checkboxSelectionUnselectRow: "Unselect row",

  //   // Boolean cell text
  //   booleanCellTrueLabel: "yes",
  //   booleanCellFalseLabel: "no",

  //   // Actions cell more text
  //   actionsCellMore: "more",

  //   // Column pinning text
  //   pinToLeft: "Pin to left",
  //   pinToRight: "Pin to right",
  //   unpin: "Unpin",

  //   // Tree Data
  //   treeDataGroupingHeaderName: "Group",
  //   treeDataExpand: "see children",
  //   treeDataCollapse: "hide children",

  //   // Grouping columns
  //   groupingColumnHeaderName: "Group",
  //   groupColumn: (name) => `Group by ${name}`,
  //   unGroupColumn: (name) => `Stop grouping by ${name}`,

  //   // Master/detail
  //   detailPanelToggle: "Detail panel toggle",
  //   expandDetailPanel: "Expand",
  //   collapseDetailPanel: "Collapse",

  //   // Used core components translation keys
  //   MuiTablePagination: {
  //     labelDisplayedRows,
  //   },

  //   // Row reordering text
  //   rowReorderingHeaderName: "Row reordering",

  //   // Aggregation
  //   aggregationMenuItemHeader: "Aggregation",
  //   aggregationFunctionLabelSum: "sum",
  //   aggregationFunctionLabelAvg: "avg",
  //   aggregationFunctionLabelMin: "min",
  //   aggregationFunctionLabelMax: "max",
  //   aggregationFunctionLabelSize: "size",
  // },
};
export default stn;

// const labelDisplayedRows = ({ from, to, count, estimated }) => {
//   if (!estimated) {
//     return `${from}–${to} из ${count !== -1 ? count : `всего ${to}`}`;
//   }
//   return `${from}–${to} из ${
//     count !== -1 ? count : `всего ${estimated > to ? estimated : to}`
//   }`;
// };
