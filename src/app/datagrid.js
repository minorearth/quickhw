import * as React from "react";
import Button from "@mui/material/Button";
import Box from "@mui/material/Box";
import Stack from "@mui/material/Stack";
import { DataGrid, GridActionsCellItem } from "@mui/x-data-grid";

export default function AutoHeightGrid({ rows, columns, addrow }) {
  return (
    <Box sx={{ width: "100%" }}>
      <Stack direction="row" spacing={1} sx={{ mb: 1 }}>
        <Button size="small" onClick={addrow}>
          Добавить
        </Button>
      </Stack>
      <DataGrid autoHeight rows={rows} columns={columns} />
    </Box>
  );
}
