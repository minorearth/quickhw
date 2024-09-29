"use client";

import { GridActionsCellItem } from "@mui/x-data-grid";
import { DataGrid } from "@mui/x-data-grid";
import { Box } from "@mui/material";
import Link from "@mui/material/Link";
import { RiImageEditFill } from "react-icons/ri";
import stn from "@/app/constants";
import useSurvFilesGrid2VC from "./survFilesGridVC";

export default function SurvFilesGrid2({
  setCurrRow,
  surveyid,
  rows,
  setRowsx,
  setMediacardVisible,
}) {
  const { setCardVisible } = useSurvFilesGrid2VC({
    setCurrRow,
    surveyid,
    setRowsx,
    setMediacardVisible,
  });

  const columns = [
    // { field: "id", headerName: "id", width: 130 },
    // { field: "name", headerName: "Файл", flex: 1, minwidth: 230 },
    // { field: "type", headerName: "Type", flex: 1, minwidth: 230 },
    {
      field: "zip",
      headerName: "Файл",
      width: 200,
      renderCell: (params) => (
        <Link href={params.row.path}>{params.row.name}</Link>
      ),
    },
    {
      field: "actions",
      type: "actions",
      getActions: (params) => [
        // eslint-disable-next-line react/jsx-key
        <GridActionsCellItem
          sx={{
            display:
              params.row.type != stn.files.droptypes.IMAGES
                ? "none"
                : "inherit",
          }}
          label="View"
          icon={<RiImageEditFill style={{ fontSize: 40 }} />}
          onClick={() => setCardVisible(params.row)}
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

  return (
    <Box
      sx={{
        minWidth: "30%",
        width: "100%",
        height: "100%",
        overflow: "auto",
        flex: 1,
      }}
    >
      <DataGrid
        autoHeight
        rows={rows}
        columns={columns}
        initialState={{
          sorting: {
            sortModel: [{ field: "datetime", sort: "desc" }],
          },
        }}
        onRowSelectionModelChange={(newRowSelectionModel) => {
          setMediacardVisible(false);
        }}
      />
    </Box>
  );
}
