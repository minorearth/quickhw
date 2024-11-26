import { GridActionsCellItem } from "@mui/x-data-grid";
import { RiImageEditFill } from "react-icons/ri";
import stn from "@/globals/settings";
import local from "@/globals/local";
import ContentCopyIcon from "@mui/icons-material/ContentCopy";
import Link from "@mui/material/Link";
import survey from "@/store/survey";
import BackupOutlinedIcon from "@mui/icons-material/BackupOutlined";
import Tooltip from "@mui/material/Tooltip";
import InsertPhotoIcon from "@mui/icons-material/InsertPhoto";

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
            <Tooltip title={local.ru.tooltip.GRID_DOWNLOAD_FILE}>
              <BackupOutlinedIcon style={{ fontSize: 40 }} />
            </Tooltip>
          }
          onClick={() => window.open(params.row.path, "_blank")}
        />,
      ],
    },
    // { field: "id", headerName: "id", width: 130 },
    {
      field: "name",
      headerName: local.ru.gridcols.FILES_FILENAME,
      flex: 1,
      minwidth: 230,
    },
    { field: "type", headerName: "FileType", flex: 1, minwidth: 230 },
    { field: "surveytype", headerName: "SurveyType", flex: 1, minwidth: 230 },

    {
      field: "View",
      type: "actions",
      width: 40,
      getActions: (params) => [
        // eslint-disable-next-line react/jsx-key
        <GridActionsCellItem
          sx={{
            display:
              params.row.type != stn.surveys.filetypes.img.name
                ? "none"
                : "inherit",
          }}
          label="View2"
          icon={
            <Tooltip title={local.ru.tooltip.GRID_VIEW_IMG}>
              <InsertPhotoIcon style={{ fontSize: 40 }} />
            </Tooltip>
          }
          onClick={() => actions.setCardVisible(params.row)}
        />,
      ],
    },
    {
      field: "datetime",
      headerName: local.ru.gridcols.FILES_DATE,
      width: 200,
      type: "dateTime",
    },
  ];

  if (survey.surveySelectedType == stn.surveys.surveytypes.task.name) {
    columns = [
      ...columns,
      {
        field: "tasknumber",
        headerName: local.ru.gridcols.FILES_VARIANT,
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
        headerName: local.ru.gridcols.FILES_SURVEYNAME,
        width: 450,
        renderCell: (params) => (
          <Link
            sx={{ cursor: "default" }}
            onClick={() => {
              survey.setSurveyFileType(stn.surveys.filetypes.img.name);
              survey.setSurveySelected({
                surveySelectedId: params.row.surveyid,
                surveySelectedName: params.row.surveyname,
                surveySelectedType: params.row.surveytype,
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
