"use client";

import Grid from "../datagrid";
import { useState, useEffect } from "react";
import { getDocsDataExtFiltered, addDocInCollection } from "../datamodel";
import PreviewIcon from "@mui/icons-material/Preview";
import QrCodeIcon from "@mui/icons-material/QrCode";
import { GridActionsCellItem } from "@mui/x-data-grid";
import { useRouter } from "next/navigation";
import { getAllFiles } from "../../storagedb";
export default function Manager() {
  getAllFiles();
  const router = useRouter();

  const [rows, setRows] = useState([]);
  const getGridData = () => {
    getDocsDataExtFiltered("surveys", "none").then((docs) => {
      setRows(docs);
    });
  };

  const handleQrClick = (id) => {
    router.push(`/qr/${id}`);
  };

  const handleViewClick = (id) => {
    router.push(`/manager/${id}`);
  };

  const columns = [
    { field: "id", headerName: "id", width: 130 },
    { field: "title", headerName: "Имя", width: 130 },
    {
      field: "actions",
      type: "actions",
      getActions: (params) => [
        // eslint-disable-next-line react/jsx-key
        <GridActionsCellItem
          label="QR"
          icon={<QrCodeIcon />}
          //   onClick={() => {allactions.tasks.handleEditClick(params.id)}}
          onClick={() => handleQrClick(params.id)}
        />,
        // eslint-disable-next-line react/jsx-key
        <GridActionsCellItem
          label="View"
          icon={<PreviewIcon />}
          onClick={() => handleViewClick(params.id)}
        />,
      ],
    },
    // { field: "timestamp", headerName: "Дата и время", width: 130 },
  ];

  const addrow = () => {
    const data = { title: "Новый опрос" };
    addDocInCollection("surveys", { ...data }).then((doc) => {
      setRows((oldRows) => [{ id: doc.id, ...data }, ...oldRows]);
    });
  };

  useEffect(() => {
    getGridData();
  }, []);
  return <Grid rows={rows} addrow={addrow} columns={columns} />;
}
