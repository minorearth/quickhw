"use client";

import { GridActionsCellItem } from "@mui/x-data-grid";
import { DataGrid } from "@mui/x-data-grid";
import { Box } from "@mui/material";
import Link from "@mui/material/Link";
import { RiImageEditFill } from "react-icons/ri";
import stn from "@/app/constants";
import useSurvFilesGrid2VC from "./survFilesGridVC";

export default function SearchGrid({
  setCurrRow,
  rows,
  setMediacardVisible,
  setSearchSurveyid,
}) {
  const { setCardVisible } = useSurvFilesGrid2VC({
    setCurrRow,
    setMediacardVisible,
    setSearchSurveyid,
  });

  const columns = [
    { field: "id", headerName: "id", width: 80 },
    // { field: "name", headerName: "Файл", flex: 1, minwidth: 230 },
    // { field: "name", headerName: "Type", flex: 1, minwidth: 230 },
    {
      field: "zip",
      headerName: "Файл",
      width: 200,
      renderCell: (params) => (
        <Link href={params.row.path}>{params.row.username}</Link>
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
      field: "surveyname",
      headerName: "Опрос",
      width: 500,
      // type: "dateTime",
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
        // overflow: "auto",
        // flex: 1,
      }}
    >
      <DataGrid
        autoHeight
        rows={rows}
        columns={columns}
        initialState={{
          pagination: {
            paginationModel: { pageSize: 10, page: 0 },
          },
          sorting: {
            sortModel: [{ field: "datetime", sort: "desc" }],
          },
        }}
        onRowSelectionModelChange={(newRowSelectionModel) => {
          setMediacardVisible(false);
        }}
        slotProps={{
          pagination: { labelRowsPerPage: "Строчек на странице" },
        }}
        localeText={{ noRowsLabel: "Нет данных" }}
        pageSizeOptions={[5, 10, 20]}
      />
    </Box>
  );
}
