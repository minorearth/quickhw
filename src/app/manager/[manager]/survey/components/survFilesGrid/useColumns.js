import { GridActionsCellItem } from "@mui/x-data-grid";
import { RiImageEditFill } from "react-icons/ri";
import stn from "@/globals/constants";
import ContentCopyIcon from "@mui/icons-material/ContentCopy";
import VisibilityOutlinedIcon from "@mui/icons-material/VisibilityOutlined";
import DownloadForOfflineOutlinedIcon from "@mui/icons-material/DownloadForOfflineOutlined";
import Link from "@mui/material/Link";
import survey from "@/store/survey";
import BackupOutlinedIcon from "@mui/icons-material/BackupOutlined";
import Tooltip from "@mui/material/Tooltip";

export const useColumns = ({ actions, mode }) => {
  let columns = [
    {
      field: "download",
      type: "actions",
      width: 40,
      getActions: (params) => [
        // eslint-disable-next-line react/jsx-key
        <GridActionsCellItem
          label="download"
          icon={
            <Tooltip title="Скачать файл">
              <BackupOutlinedIcon style={{ fontSize: 40 }} />
            </Tooltip>
          }
          onClick={() => window.open(params.row.path, "_blank")}
        />,
      ],
    },
    // { field: "id", headerName: "id", width: 130 },
    { field: "name", headerName: "Файл", flex: 1, minwidth: 230 },
    // { field: "type", headerName: "Type", flex: 1, minwidth: 230 },

    {
      field: "view",
      type: "actions",
      width: 40,
      getActions: (params) => [
        // eslint-disable-next-line react/jsx-key
        <GridActionsCellItem
          sx={{
            display: params.row.type != "img" ? "none" : "inherit",
          }}
          label="View"
          icon={<RiImageEditFill style={{ fontSize: 40 }} />}
          onClick={() => actions.setCardVisible(params.row)}
        />,
      ],
    },
    {
      field: "datetime",
      headerName: "Дата изменения",
      width: 200,
      type: "dateTime",
    },
  ];

  if (survey.surveySelectedType == "task") {
    columns = [
      ...columns,
      {
        field: "tasknumber",
        headerName: "Вариант",
        width: 250,
        editable: true,
      },
    ];
  }

  if (mode == "search") {
    columns = [
      ...columns,
      {
        field: "surveyname",
        headerName: "Опрос",
        width: 450,
        renderCell: (params) => (
          <Link
            sx={{ cursor: "default" }}
            onClick={() => {
              survey.setSurveySelected({
                surveySelectedId: params.row.surveyid,
                surveySelectedName: params.row.surveyname,
                surveySelectedType: params.row.type,
              });
            }}
          >
            {params.row.surveyname}
          </Link>
        ),
      },
    ];
  }

  columns = [
    ...columns,
    {
      field: "copyid",
      type: "actions",
      width: 60,
      getActions: (params) => [
        <GridActionsCellItem
          key="Copyid"
          label="View"
          icon={<ContentCopyIcon sx={{ fontSize: 40 }} />}
          onClick={() => navigator.clipboard.writeText(survey.surveySelectedId)}
        />,
      ],
    },
  ];

  return { columns };
};
