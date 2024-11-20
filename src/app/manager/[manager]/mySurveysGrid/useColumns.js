import { GridActionsCellItem, useGridApiRef } from "@mui/x-data-grid";
import PreviewIcon from "@mui/icons-material/Preview";
import ContentCopyIcon from "@mui/icons-material/ContentCopy";
import local from "@/globals/local";
import { Tooltip } from "@mui/material";

export const useColumns = ({ actions }) => {
  const columns = [
    // { field: "id", headerName: "id", width: 130 },
    // { field: "type", headerName: "type", width: 130 },
    // { field: "user", headerName: "user", width: 130 },

    {
      field: "details",
      type: "actions",
      width: 60,
      getActions: (params) => [
        <GridActionsCellItem
          key="PreviewIcon"
          label="View"
          icon={
            <Tooltip title={local.ru.tooltip.GRID_VIEW_SURVEY}>
              <PreviewIcon sx={{ fontSize: 40 }} />
            </Tooltip>
          }
          onClick={() =>
            actions.showSurvey(params.id, params.row.title, params.row.type)
          }
        />,
      ],
    },
    {
      field: "title",
      headerName: local.ru.gridcols.SURVEYS_NAME,
      flex: 1,
      minwidth: 230,
      editable: true,
    },
    // {
    //   field: "type",
    //   headerName: "SurveyType",
    //   flex: 1,
    //   minwidth: 230,
    //   editable: true,
    // },
    {
      field: "datetime",
      headerName: local.ru.gridcols.SURVEYS_DATE,
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
