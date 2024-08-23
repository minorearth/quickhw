import * as React from "react";
import Button from "@mui/material/Button";
import Box from "@mui/material/Box";
import Stack from "@mui/material/Stack";
import { DataGrid, GridActionsCellItem } from "@mui/x-data-grid";
import AddCircleIcon from "@mui/icons-material/AddCircle";
import SettingsIcon from "@mui/icons-material/Settings";
import IconButton from "@mui/material/IconButton";
import { updateDocFieldsInCollectionById } from "../datamodel";

export default function AutoHeightGrid({
  rows,
  columns,
  addrow,
  setEditProfile,
}) {
  const handleSettingsClick = () => {
    // router.push(`/profile`);
    setEditProfile(true);
  };

  const processEdit = (newRow) => {
    console.log("newRow", newRow);
    updateDocFieldsInCollectionById("surveys", newRow.id, {
      title: newRow.title,
    });
    return newRow;
  };

  return (
    <Box sx={{ width: "100%" }}>
      <IconButton aria-label="delete" size="small" onClick={addrow}>
        <AddCircleIcon sx={{ fontSize: 60 }} />
      </IconButton>
      <IconButton aria-label="delete" onClick={handleSettingsClick}>
        <SettingsIcon sx={{ fontSize: 60 }} />
      </IconButton>

      <DataGrid
        autoHeight
        rows={rows}
        columns={columns}
        // onCellEditStop={(params, event) => processEdit(params)}
        processRowUpdate={(updatedRow, originalRow) => processEdit(updatedRow)}
        onProcessRowUpdateError={() => {}}
      />
    </Box>
  );
}
