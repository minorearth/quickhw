"use client";

import Grid from "./datagrid";
import { useState, useEffect } from "react";
import { addDocInCollection, getDocsKeyValue } from "../../datamodel";
import PreviewIcon from "@mui/icons-material/Preview";
import QrCodeIcon from "@mui/icons-material/QrCode";
import { GridActionsCellItem } from "@mui/x-data-grid";
import { useRouter } from "next/navigation";
import { getAllFiles } from "../../storagedb";
import Splash from "../components/splash/splash.js";
import { getUserName } from "../localstorage";

export default function Manager({ user, setEditProfile }) {
  const router = useRouter();

  const [rows, setRows] = useState([]);
  const [closeSplash, setCloseSplash] = useState(false);

  const ETL = (docs) => {
    const docsFormatted = docs.map((doc) => {
      const date = new Date(doc.datetime.seconds * 1000);
      return { id: doc.id, title: doc.title, datetime: date, user: doc.user };
    });

    return docsFormatted;
  };

  const getGridData = () => {
    console.log(user);
    getDocsKeyValue("surveys", "user", user).then((docs) => {
      setRows(ETL(docs));
    });
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
    addDocInCollection("surveys", { ...data }).then((id) => {
      setRows((oldRows) => [{ id, ...data }, ...oldRows]);
    });
  };
  useEffect(() => {
    getGridData();
  }, []);
  return (
    <>
      {!closeSplash && (
        <Splash setCloseSplash={setCloseSplash} duration={200} />
      )}
      {closeSplash && (
        <Grid
          rows={rows}
          addrow={addrow}
          columns={columns}
          setEditProfile={setEditProfile}
        />
      )}
    </>
  );
}
