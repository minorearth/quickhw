"use client";

import Grid from "./datagrid";
import { useState, useEffect } from "react";
import {
  getDocsDataExtFiltered,
  addDocInCollection,
  getDocsKeyValue,
} from "../datamodel";
import PreviewIcon from "@mui/icons-material/Preview";
import QrCodeIcon from "@mui/icons-material/QrCode";
import { GridActionsCellItem } from "@mui/x-data-grid";
import { useRouter } from "next/navigation";
import { getAllFiles } from "../../storagedb";
import Button from "@mui/material/Button";

export default function Manager({ user, setEditProfile }) {
  getAllFiles();
  const router = useRouter();

  const [rows, setRows] = useState([]);

  const ETL = (docs) => {
    const docsFormatted = docs.map((doc) => {
      const date = new Date(doc.datetime.seconds * 1000);
      !!doc.datetime && console.log(doc.datetime.nanoseconds);
      return { id: doc.id, title: doc.title, datetime: date, user: doc.user };
    });

    return docsFormatted;
    // return docs;
  };

  const getGridData = () => {
    getDocsKeyValue("surveys", "user", user).then((docs) => {
      setRows(ETL(docs));
    });

    // getDocsDataExtFiltered("surveys", "none").then((docs) => {
    //   setRows(ETL(docs));
    // });
  };

  const handleQrClick = (id) => {
    router.push(`/qr/${id}`);
  };

  const handleViewClick = (id) => {
    router.push(`/manager/${id}`);
  };

  const columns = [
    // { field: "id", headerName: "id", width: 130 },
    {
      field: "title",
      headerName: "Имя",
      flex: 1,
      minwidth: 230,
      editable: true,
    },
    // { field: "user", headerName: "ПОльзователь", width: 130 },
    {
      field: "actions",
      type: "actions",
      getActions: (params) => [
        // eslint-disable-next-line react/jsx-key
        <GridActionsCellItem
          label="QR"
          icon={<QrCodeIcon sx={{ fontSize: 40 }} />}
          //   onClick={() => {allactions.tasks.handleEditClick(params.id)}}
          onClick={() => handleQrClick(params.id)}
        />,
        // eslint-disable-next-line react/jsx-key
        <GridActionsCellItem
          label="View"
          icon={<PreviewIcon sx={{ fontSize: 40 }} />}
          onClick={() => handleViewClick(params.id)}
        />,
      ],
    },
    {
      field: "datetime",
      headerName: "Дата и время",
      width: 200,
      type: "dateTime",
    },
  ];

  const addrow = () => {
    var today = new Date();
    const data = { title: "Новый опрос", datetime: today, user };
    addDocInCollection("surveys", { ...data }).then((doc) => {
      setRows((oldRows) => [{ id: doc.id, ...data }, ...oldRows]);
    });
  };

  useEffect(() => {
    getGridData();
  }, []);
  return (
    <>
      <Grid
        rows={rows}
        addrow={addrow}
        columns={columns}
        setEditProfile={setEditProfile}
      />
    </>
  );
}
