"use client";

import { DataGrid } from "@mui/x-data-grid";
import { Box } from "@mui/material";
import useSurvFilesGrid2VC from "./survFilesGridVC";
import { useColumns } from "./useColumns";
import { observer } from "mobx-react-lite";
import survey from "@/store/survey";

const SurvFilesGrid2 = observer(
  ({ setCurrRow, rows, setMediacardVisible, mode }) => {
    const { setCardVisible } = useSurvFilesGrid2VC({
      setCurrRow,
      setMediacardVisible,
    });

    const { columns } = useColumns({ actions: { setCardVisible }, mode });

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
            setMediacardVisible(false);
          }}
          slotProps={{
            pagination: { labelRowsPerPage: "Строчек на странице" },
          }}
          localeText={{ noRowsLabel: "Нет данных" }}
        />
      </Box>
    );
  }
);

export default SurvFilesGrid2;
