import * as React from "react";
import Button from "@mui/material/Button";
import Box from "@mui/material/Box";
import Stack from "@mui/material/Stack";
import { DataGrid, GridActionsCellItem, useGridApiRef } from "@mui/x-data-grid";
import AddCircleIcon from "@mui/icons-material/AddCircle";
import SettingsIcon from "@mui/icons-material/Settings";
import IconButton from "@mui/material/IconButton";
import { updateDocFieldsInCollectionById } from "../../datamodel";
import { deleteAllDocsInCollection } from "../../datamodelSSR";
import { useEffect } from "react";

// const autosizeOptions = {
//   includeOutliers: true,
//   includeHeaders: true,
//   outliersFactor: 1,
//   expand: true,
// };

export default function AutoHeightGrid({
  rows,
  columns,
  addrow,
  setEditProfile,
}) {
  const apiRef = useGridApiRef();

  useEffect(() => {
    // apiRef.current.autosizeColumns(autosizeOptions);
  }, []);

  const handleSettingsClick = () => {
    deleteAllDocsInCollection("surveys", -10);
    // setEditProfile(true);
  };

  const processEdit = (newRow) => {
    console.log("newRow", newRow);
    updateDocFieldsInCollectionById("surveys", newRow.id, {
      title: newRow.title,
    });
    rows.filter((row) => row.id == newRow.id)[0].title = newRow.title;

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
        // apiRef={apiRef}
        // autosizeOptions={autosizeOptions}
        initialState={{
          sorting: {
            sortModel: [{ field: "datetime", sort: "desc" }],
          },
        }}
        // autosizeOnMount={true}
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
