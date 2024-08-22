"use client";

import Grid from "../../datagrid";
import { GridActionsCellItem } from "@mui/x-data-grid";
import PreviewIcon from "@mui/icons-material/Preview";
import Link from "@mui/material/Link";

import { useState, useEffect } from "react";
import { getAllFiles } from "../../../storagedb";
import { MediaCard } from "./mediaCard";
export default function Content({ params }) {
  const [rows, setRowsx] = useState([]);

  //   const handleViewClick = (id) => {
  //     router.push(`/manager/${id}`);
  //   };

  const columns = [
    { field: "id", headerName: "id", width: 130 },
    { field: "name", headerName: "Файл", width: 130 },
    // {
    //     field: "actions",
    //     type: "actions",
    //     getActions: (params) => [
    //       // eslint-disable-next-line react/jsx-key
    //       <GridActionsCellItem
    //         label="View"
    //         icon={<PreviewIcon />}
    //         onClick={() => handleViewClick(params.id)}
    //       />,
    //     ],
    //   },
    {
      field: "monthlyDownloadsBar",
      headerName: "Monthly",
      renderCell: (params) => <Link href="https://ya.ru">Link</Link>,
      width: 150,
      valueGetter: (value, row) => row.monthlyDownloads,
    },

    // { field: "timestamp", headerName: "Датаx и время", width: 130 },
  ];

  useEffect(() => {
    getAllFiles(params.content).then((res) => {
      const filesToRows = res.items.map((file) => ({
        name: file.name,
        id: file.name,
      }));
      console.log("filesToRows", res);

      setRowsx(filesToRows);
    });
  }, []);
  return (
    <>
      <Grid rows={rows} columns={columns} />
      <MediaCard />
    </>
  );
}
