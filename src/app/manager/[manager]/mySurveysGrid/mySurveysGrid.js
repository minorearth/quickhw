import * as React from "react";
import Box from "@mui/material/Box";
import { DataGrid } from "@mui/x-data-grid";
import AddCircleIcon from "@mui/icons-material/AddCircle";
import IconButton from "@mui/material/IconButton";
import useSurveyGridVC from "./useMySurveysGridVC";
import SearchIcon from "@mui/icons-material/Search";
import Picktype from "@/components/typepicker";
import stn from "@/globals/settings";
import local from "@/globals/local";
import { useColumns } from "./useColumns";
import { getSubKeyValues } from "@/globals/utils/objectUtils";
import Tooltip from "@/components/tooltip";

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
          caption={local.ru.text.PICK_SURVEY_TYPE}
          modalVisible={pickTypeModalVisible}
          setModalVisible={setPickTypeModalVisible}
          action={(type) => {
            actions.addrow(type);
          }}
          variants={getSubKeyValues(stn.surveys.surveytypes)}
        />
      )}
      <Tooltip title={local.ru.tooltip.TOOLBAR_ADD_NEW_SYRVEY}>
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
      <Tooltip title={local.ru.tooltip.TOOLBAR_SEARCH_FILE}>
        <IconButton
          aria-label="search"
          size="small"
          onClick={() => actions.startSearch()}
        >
          <SearchIcon sx={{ fontSize: 60 }} />
        </IconButton>
      </Tooltip>
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
      />
    </Box>
  );
}
