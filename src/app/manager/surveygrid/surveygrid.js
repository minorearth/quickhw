import * as React from "react";
import Box from "@mui/material/Box";
import { DataGrid, GridActionsCellItem, useGridApiRef } from "@mui/x-data-grid";
import AddCircleIcon from "@mui/icons-material/AddCircle";
import SettingsIcon from "@mui/icons-material/Settings";
import IconButton from "@mui/material/IconButton";
import PreviewIcon from "@mui/icons-material/Preview";
import useSurveyGridVC from "./useSurveygridVC";

export default function SurveyGrid({ setProfileVisible, user }) {
  const { actions, rows } = useSurveyGridVC({ setProfileVisible, user });
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
          onClick={() => actions.navigateToFiles(params.id)}
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
  ];

  return (
    <Box sx={{ width: "100%" }}>
      <IconButton aria-label="delete" size="small" onClick={actions.addrow}>
        <AddCircleIcon sx={{ fontSize: 60 }} />
      </IconButton>
      <IconButton aria-label="delete" onClick={actions.navigateToSettings}>
        <SettingsIcon sx={{ fontSize: 60 }} />
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
      />
    </Box>
  );
}
