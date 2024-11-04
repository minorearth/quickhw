"use client";

import { DataGrid } from "@mui/x-data-grid";
import { Box } from "@mui/material";
import useSurvFilesGrid2VC from "./survFilesGridVC";
import { useColumns } from "./useColumns";
import { observer } from "mobx-react-lite";
import { useState } from "react";

const SurvFilesGrid2 = observer(
  ({ setCurrRow, rows, setMediacardVisible, mode }) => {
    const { actions, state } = useSurvFilesGrid2VC({
      setCurrRow,
      setMediacardVisible,
      rows,
    });

    const { columns } = useColumns({ actions, mode });

    return (
      <Box
        sx={{
          minWidth: "30%",
          width: "100%",
          height: "100%",
          overflow: "auto",
          flex: 1,
        }}
      >
        <DataGrid
          autoHeight
          rows={rows}
          columns={columns}
          initialState={{
            sorting: {
              sortModel: [{ field: "datetime", sort: "desc" }],
            },
          }}
          onRowSelectionModelChange={(newRowSelectionModel) => {
            actions.setCardVisible(false);
          }}
          processRowUpdate={(updatedRow, originalRow) =>
            actions.processEdit(updatedRow)
          }
          onProcessRowUpdateError={() => {}}
          slotProps={{
            pagination: { labelRowsPerPage: "Строчек на странице" },
          }}
          localeText={{ noRowsLabel: "Нет данных" }}
          rowSelectionModel={state.rowSelectionModel}
        />
      </Box>
    );
  }
);

export default SurvFilesGrid2;
