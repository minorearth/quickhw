"use client";

import { GridActionsCellItem } from "@mui/x-data-grid";
import PreviewIcon from "@mui/icons-material/Preview";

import { useState, useEffect } from "react";
import { DataGrid } from "@mui/x-data-grid";
import { getDocFromCollectionByIdRealtime } from "../../../../datamodel";
import { Box } from "@mui/material";
import Link from "@mui/material/Link";

export default function SurvFilesGrid2({
  setCurrRow,
  session,
  rows,
  setRowsx,
  setMediacardVisible,
}) {
  const handleViewClick = (row) => {
    setMediacardVisible(true);
    setCurrRow(row);
    // row.type == "zip";
  };

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
          sx={{ display: params.row.type != "img" ? "none" : "inherit" }}
          label="View"
          icon={<PreviewIcon sx={{ fontSize: 40 }} />}
          onClick={() => handleViewClick(params.row)}
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

  const ObjtoArr = (obj) => {
    return !obj
      ? []
      : Object.keys(obj).map((key) => {
          const datetime = new Date(obj[key]?.datetime?.seconds * 1000);
          return {
            name: obj[key].name,
            id: key,
            path: obj[key].path,
            type: obj[key].type,
            datetime: datetime,
          };
        });
  };

  const Refresh = (freshdata) => {
    setRowsx(ObjtoArr(freshdata.files));
  };

  useEffect(() => {
    getDocFromCollectionByIdRealtime("surveys", session, Refresh).then(
      (docData) => {
        // const fileMeta = await getMetadata(file);
        setRowsx(ObjtoArr(docData?.files));
      }
    );
  }, []);

  return (
    <Box sx={{ minWidth: "30%", width: "100%", height: "100%", flex: 1 }}>
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
          console.log("zuu");
          setMediacardVisible(false);
        }}
      />
    </Box>
  );
}
