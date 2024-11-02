import { GridActionsCellItem } from "@mui/x-data-grid";
import { RiImageEditFill } from "react-icons/ri";
import stn from "@/globals/constants";
import ContentCopyIcon from "@mui/icons-material/ContentCopy";
import VisibilityOutlinedIcon from "@mui/icons-material/VisibilityOutlined";
import DownloadForOfflineOutlinedIcon from "@mui/icons-material/DownloadForOfflineOutlined";
import Link from "@mui/material/Link";
import survey from "@/store/survey";

export const useColumns = ({ actions, mode }) => {
  let columns = [
    // { field: "id", headerName: "id", width: 130 },
    // { field: "name", headerName: "Файл", flex: 1, minwidth: 230 },
    // { field: "type", headerName: "Type", flex: 1, minwidth: 230 },

    {
      field: "name",
      headerName: "Файл",
      width: 200,
      // renderCell: (params) => (
      //   <Link href={params.row.path}>{params.row.name}</Link>
      // ),
    },

    {
      field: "download",
      type: "actions",
      width: 40,
      getActions: (params) => [
        // eslint-disable-next-line react/jsx-key
        <GridActionsCellItem
          label="download"
          icon={
            params.row.type != stn.files.PICKER.droptypes[0].type ? (
              <DownloadForOfflineOutlinedIcon style={{ fontSize: 40 }} />
            ) : (
              <VisibilityOutlinedIcon style={{ fontSize: 40 }} />
            )
          }
          onClick={() => window.open(params.row.path, "_blank")}
        />,
      ],
    },
    {
      field: "view",
      type: "actions",
      width: 40,
      getActions: (params) => [
        // eslint-disable-next-line react/jsx-key
        <GridActionsCellItem
          sx={{
            display:
              params.row.type != stn.files.PICKER.droptypes[0].type
                ? "none"
                : "inherit",
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

    {
      field: "copyid",
      type: "actions",
      width: 60,
      getActions: (params) => [
        <GridActionsCellItem
          key="Copyid"
          label="View"
          icon={<ContentCopyIcon sx={{ fontSize: 40 }} />}
          onClick={() => navigator.clipboard.writeText(surveyid)}
        />,
      ],
    },
  ];

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

  return { columns };
};
