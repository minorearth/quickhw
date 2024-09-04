"use client";

import { GridActionsCellItem } from "@mui/x-data-grid";
import PreviewIcon from "@mui/icons-material/Preview";

import { useState, useEffect } from "react";
import { getAllFiles } from "../../../storagedb";
import { DataGrid } from "@mui/x-data-grid";
import { getDownloadURL, getMetadata } from "firebase/storage";
import { getDocFromCollectionByIdRealtime } from "../../../datamodel";
import { onSnapshot } from "firebase/firestore";
import { Box } from "@mui/material";

export default function SurvFilesGrid2({
  setCurrRow,
  session,
  rows,
  setRowsx,
}) {
  const handleViewClick = (row) => {
    setCurrRow(row);
  };

  const columns = [
    // { field: "id", headerName: "id", width: 130 },
    { field: "name", headerName: "Файл", flex: 1, minwidth: 230 },
    // { field: "path", headerName: "Путь", width: 130 },
    {
      field: "actions",
      type: "actions",
      getActions: (params) => [
        // eslint-disable-next-line react/jsx-key
        <GridActionsCellItem
          label="View"
          icon={<PreviewIcon sx={{ fontSize: 40 }} />}
          onClick={() => handleViewClick(params.row)}
        />,
      ],
    },
    { field: "updated", headerName: "Дата изменения", width: 200 },

    // { field: "timestamp", headerName: "Датаx и время", width: 130 },
  ];

  const formatDate = (unformatted) => {
    let date2 = new Date(unformatted);
    const localUnformatted = date2.toLocaleString();
    // const regex =
    //   /(?<day>\d{2})\/(?<month>\d{2})\/(?<age>\d{2})(?<year>\d{2}), (?<hour>\d{2}):(?<minute>\d{2}):(?<second>\d{2})/;
    // // const found = localUnformatted.match(regex).groups;
    // const { year, month, day, hour, minute, second } = found;
    return localUnformatted;
    // return `${date2.getDay()}.${date2.getMonth()}.${date2.get()} ${date2.getHours()}:${date2.getMinutes()}:${date2.getSeconds()} `;
  };

  const ObjtoArr = (obj) => {
    return Object.keys(obj).map((key) => ({
      name: obj[key].name,
      id: key,
      path: obj[key].path,
    }));
  };

  const Refresh = (freshdata) => {
    setRowsx(ObjtoArr(freshdata.files));
  };

  useEffect(() => {
    getDocFromCollectionByIdRealtime("surveys", session, Refresh).then(
      (docData) => {
        // const fileMeta = await getMetadata(file);
        // const dateFormatted = formatDate(fileMeta.updated);
        const files = docData.files;
        setRowsx(ObjtoArr(files));
      }
    );
  }, []);

  return (
    <Box sx={{ width: "30%", height: "100%" }}>
      <DataGrid autoHeight rows={rows} columns={columns} />
    </Box>
  );
}
