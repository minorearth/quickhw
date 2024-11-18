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
import { getSubKeyValues } from "@/globals/utils/objectUtils";
import Tooltip from "@/components/tooltop";

export default function SurveysGrid({ user, setSearchVisible }) {
  const [pickTypeModalVisible, setPickTypeModalVisible] = React.useState(false);

  const { actions, rows } = useSurveyGridVC({
    setSearchVisible,
    user,
  });

  const { columns } = useColumns({ actions });

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
          variants={getSubKeyValues(stn.surveys.surveytypes)}
        />
      )}
      <Tooltip title="Добавить новый опрос">
        <IconButton
          aria-label="delete"
          size="small"
          onClick={() => {
            setPickTypeModalVisible(true);
          }}
        >
          <AddCircleIcon sx={{ fontSize: 60 }} />
        </IconButton>
      </Tooltip>
      <Tooltip title="Поиск файлов по имени опрашиваемого">
        <IconButton
          aria-label="search"
          size="small"
          onClick={() => actions.startSearch()}
        >
          <SearchIcon sx={{ fontSize: 60 }} />
        </IconButton>
      </Tooltip>
      <DataGrid
        // localeText={stn.grid}
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
      />
    </Box>
  );
}
