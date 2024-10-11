import * as React from "react";
import Box from "@mui/material/Box";
import { DataGrid, GridActionsCellItem, useGridApiRef } from "@mui/x-data-grid";
import AddCircleIcon from "@mui/icons-material/AddCircle";
import SettingsIcon from "@mui/icons-material/Settings";
import IconButton from "@mui/material/IconButton";
import PreviewIcon from "@mui/icons-material/Preview";
import LinkIcon from "@mui/icons-material/Link";
import ContentCopyIcon from "@mui/icons-material/ContentCopy";
import useSurveyGridVC from "./useSurveygridVC";
import SearchIcon from "@mui/icons-material/Search";

export default function SurveyGrid({
  setModalVisible,
  user,
  setSurveyid,
  setSearchVisible,
  setSearchRows,
  setSurveyname,
}) {
  const { actions, rows } = useSurveyGridVC({
    setModalVisible,
    setSearchVisible,
    user,
    setSurveyid,
    setSearchRows,
    setSurveyname,
  });

  const labelDisplayedRows = ({ from, to, count, estimated }) => {
    if (!estimated) {
      return `${from}–${to} из ${count !== -1 ? count : `всего ${to}`}`;
    }
    return `${from}–${to} od ${
      count !== -1 ? count : `всего ${estimated > to ? estimated : to}`
    }`;
  };

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
          onClick={() => actions.showSurvey(params.id, params.row.title)}
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

  return (
    <Box sx={{ width: "100%" }}>
      <IconButton aria-label="delete" size="small" onClick={actions.addrow}>
        <AddCircleIcon sx={{ fontSize: 60 }} />
      </IconButton>
      <IconButton
        aria-label="delete"
        size="small"
        onClick={() => actions.startSearch()}
      >
        <SearchIcon sx={{ fontSize: 60 }} />
      </IconButton>
      <DataGrid
        initialState={{
          sorting: {
            sortModel: [{ field: "datetime", sort: "desc" }],
          },
        }}
        autoHeight
        rows={rows}
        columns={columns}
        processRowUpdate={(updatedRow, originalRow) =>
          actions.processEdit(updatedRow)
        }
        onProcessRowUpdateError={() => {}}
        slotProps={{
          pagination: { labelRowsPerPage: "Строчек на странице" },
        }}
        localeText={{
          noRowsLabel: "Нет данных",
          MuiTablePagination: {
            labelDisplayedRows,
          },
        }}
      />
    </Box>
  );
}
