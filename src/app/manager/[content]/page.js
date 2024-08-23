"use client";

import Grid from "../datagrid";
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
  const [imgUrl, setImgUrl] = useState(
    "https://png.pngtree.com/thumb_back/fw800/background/20230612/pngtree-images-of-winter-and-white-background-wallpapers-free-download-image_2935697.jpg"
  );

  const handleViewClick = (path) => {
    setImgUrl(path);
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
          onClick={() => handleViewClick(params.row.path)}
        />,
      ],
    },
    { field: "updated", headerName: "Дата изменения", width: 200 },

    // { field: "timestamp", headerName: "Датаx и время", width: 130 },
  ];

  const formatDate = (unformatted) => {
    let date2 = new Date(unformatted);
    const localUnformatted = date2.toLocaleString();
    const regex =
      /(?<day>\d{2})\/(?<month>\d{2})\/(?<age>\d{2})(?<year>\d{2}), (?<hour>\d{2}):(?<minute>\d{2}):(?<second>\d{2})/;
    const found = localUnformatted.match(regex).groups;
    const { year, month, day, hour, minute, second } = found;
    return `${day}.${month}.${year} ${hour}:${minute}:${second} `;
  };

  useEffect(() => {
    getAllFiles(params.content).then((res) => {
      Promise.all(
        res.items.map(async (file) => {
          const filePath = await getDownloadURL(file);
          const fileMeta = await getMetadata(file);
          return {
            name: file.name,
            id: file.name,
            path: filePath,
            updated: formatDate(fileMeta.updated),
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

      <MediaCard path={imgUrl} />
    </>
  );
}
