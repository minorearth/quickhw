"use client";

import Grid from "../../datagrid";
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
    { field: "name", headerName: "Файл", width: 130 },
    // { field: "path", headerName: "Путь", width: 130 },
    {
      field: "actions",
      type: "actions",
      getActions: (params) => [
        // eslint-disable-next-line react/jsx-key
        <GridActionsCellItem
          label="View"
          icon={<PreviewIcon />}
          onClick={() => handleViewClick(params.row.path)}
        />,
      ],
    },
    { field: "updated", headerName: "Дата изменения", width: 230 },

    // { field: "timestamp", headerName: "Датаx и время", width: 130 },
  ];

  useEffect(() => {
    getAllFiles(params.content).then((res) => {
      console.log("filesToRows", res);

      Promise.all(
        res.items.map(async (file) => {
          const filePath = await getDownloadURL(file);
          const fileMeta = await getMetadata(file);
          return {
            name: file.name,
            id: file.name,
            path: filePath,
            updated: fileMeta.updated,
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
