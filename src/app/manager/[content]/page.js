"use client";

import Grid from "../surveygrid";
import { GridActionsCellItem } from "@mui/x-data-grid";
import PreviewIcon from "@mui/icons-material/Preview";
import Link from "@mui/material/Link";

import { useState, useEffect } from "react";
import { getAllFiles } from "../../../storagedb";
import { MediaCard } from "./mediaCard";
import { DataGrid } from "@mui/x-data-grid";

import { getDownloadURL, getMetadata } from "firebase/storage";

export default function Content({ params }) {
  const [rows, setRowsx] = useState([]);
  const [rows2, setRowsx2] = useState([]);
  const [currRow, setCurrRow] = useState();
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

  const columns2 = [
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

  useEffect(() => {
    getAllFiles(params.content).then((res) => {
      Promise.all(
        res.items.map(async (file) => {
          const filePath = await getDownloadURL(file);
          const fileMeta = await getMetadata(file);
          const dateFormatted = formatDate(fileMeta.updated);
          return {
            name: file.name,
            id: file.name,
            path: filePath,
            updated: dateFormatted,
          };
        })
      ).then((filesToRows) => {
        setRowsx(filesToRows);
      });
    });

    getAllFiles(params.content).then((res) => {
      Promise.all(
        res.items.map(async (file) => {
          const filePath = await getDownloadURL(file);
          const fileMeta = await getMetadata(file);
          const dateFormatted = formatDate(fileMeta.updated);
          return {
            name: file.name,
            id: file.name,
            path: filePath,
            updated: dateFormatted,
          };
        })
      ).then((filesToRows) => {
        setRowsx(filesToRows);
      });
    });
  }, []);

  return (
    <>
      <DataGrid autoHeight rows={rows} columns={columns} />
      <DataGrid autoHeight rows={rows2} columns={columns2} />
      <MediaCard row={currRow} session={params.content} setRowsx={setRowsx} />
    </>
  );
}
