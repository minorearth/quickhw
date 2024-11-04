import { GridActionsCellItem, useGridApiRef } from "@mui/x-data-grid";

import SettingsIcon from "@mui/icons-material/Settings";
import PreviewIcon from "@mui/icons-material/Preview";
import LinkIcon from "@mui/icons-material/Link";
import ContentCopyIcon from "@mui/icons-material/ContentCopy";

export const useColumns = ({ actions }) => {
  const columns = [
    // { field: "id", headerName: "id", width: 130 },
    // { field: "user", headerName: "ПОльзователь", width: 130 },

    {
      field: "details",
      type: "actions",
      width: 60,
      getActions: (params) => [
        <GridActionsCellItem
          key="PreviewIcon"
          label="View"
          icon={<PreviewIcon sx={{ fontSize: 40 }} />}
          onClick={() =>
            actions.showSurvey(params.id, params.row.title, params.row.type)
          }
        />,
      ],
    },
    {
      field: "title",
      headerName: "Имя",
      flex: 1,
      minwidth: 230,
      editable: true,
    },
    // {
    //   field: "type",
    //   headerName: "Тип",
    //   flex: 1,
    //   minwidth: 230,
    //   editable: true,
    // },
    {
      field: "datetime",
      headerName: "Дата и время",
      width: 200,
      type: "dateTime",
    },
    {
      field: "copyid",
      type: "actions",
      width: 60,
      getActions: (params) => [
        <GridActionsCellItem
          key="Copyid"
          label="View"
          icon={<ContentCopyIcon sx={{ fontSize: 40 }} />}
          onClick={() => navigator.clipboard.writeText(params.id)}
        />,
      ],
    },
  ];

  return { columns };
};
