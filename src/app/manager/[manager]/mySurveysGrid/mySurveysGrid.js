import * as React from "react";
import Box from "@mui/material/Box";
import { DataGrid } from "@mui/x-data-grid";

import AddCircleIcon from "@mui/icons-material/AddCircle";

import IconButton from "@mui/material/IconButton";

import useSurveyGridVC from "./useMySurveysGridVC";
import SearchIcon from "@mui/icons-material/Search";
import Picktype from "@/components/typepicker/typepicker";
import stn from "@/globals/constants";
import { useColumns } from "./useColumns";

export default function SurveyGrid({ user, setSearchVisible }) {
  const [pickTypeModalVisible, setPickTypeModalVisible] = React.useState(false);

  const { actions, rows } = useSurveyGridVC({
    setSearchVisible,
    user,
  });

  const { columns } = useColumns({ actions });

  const labelDisplayedRows = ({ from, to, count, estimated }) => {
    if (!estimated) {
      return `${from}–${to} из ${count !== -1 ? count : `всего ${to}`}`;
    }
    return `${from}–${to} od ${
      count !== -1 ? count : `всего ${estimated > to ? estimated : to}`
    }`;
  };

  return (
    <Box sx={{ width: "100%" }}>
      {pickTypeModalVisible && (
        <Picktype
          caption={"Что будем делать?"}
          modalVisible={pickTypeModalVisible}
          setModalVisible={setPickTypeModalVisible}
          action={(type) => {
            actions.addrow(type);
          }}
          // picked={stn.files.PICKER.surveytypes[0].type}
          variants={stn.files.PICKER.surveytypes}
        />
      )}
      <IconButton
        aria-label="delete"
        size="small"
        onClick={() => {
          setPickTypeModalVisible(true);
        }}
      >
        <AddCircleIcon sx={{ fontSize: 60 }} />
      </IconButton>
      <IconButton
        aria-label="delete"
        size="small"
        onClick={() => actions.startSearch()}
      >
        <SearchIcon sx={{ fontSize: 60 }} />
      </IconButton>
      <DataGrid
        initialState={{
          sorting: {
            sortModel: [{ field: "datetime", sort: "desc" }],
          },
        }}
        autoHeight
        rows={rows}
        columns={columns}
        processRowUpdate={(updatedRow, originalRow) =>
          actions.processEdit(updatedRow)
        }
        onProcessRowUpdateError={() => {}}
        slotProps={{
          pagination: { labelRowsPerPage: "Строчек на странице" },
        }}
        localeText={{
          noRowsLabel: "Нет данных",
          MuiTablePagination: {
            labelDisplayedRows,
          },
        }}
      />
    </Box>
  );
}
