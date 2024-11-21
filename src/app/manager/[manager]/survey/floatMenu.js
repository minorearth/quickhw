import FabAnimated from "@/components/fabAnimated/fabAnimated.js";

import stn from "@/globals/settings";
import local from "@/globals/local";

const LEFT = 16;
const RIGHT = 16;
const TOP = 16;
const BOTTOM = 16;

const FloatMenu = ({ mode, actions, state }) => {
  return (
    <>
      {mode != "search" && (
        <FabAnimated
          tooltip={local.ru.tooltip.FAB_SHOWQR}
          icon="qr"
          visible={state.qrVisible}
          action={() => actions.setQrVisible((state) => !state)}
          position={{ top: TOP, right: RIGHT }}
        />
      )}
      {mode != "search" && state.qrVisible && (
        <FabAnimated
          tooltip={local.ru.tooltip.FAB_COPY_TO_CLIPBOARD}
          icon="copyClipboard"
          visible={true}
          action={actions.copyCB}
          position={{ top: TOP, right: RIGHT + stn.ui.FLOAT_BTN_PADDING }}
        />
      )}
      {mode != "search" && state.qrVisible && (
        <FabAnimated
          tooltip={local.ru.tooltip.FAB_PREVIEW_DROP_FORM}
          icon="openDropWindow"
          visible={true}
          action={actions.openDropWindow}
          position={{ top: TOP, right: RIGHT + 2 * stn.ui.FLOAT_BTN_PADDING }}
        />
      )}
      {mode != "search" && state.qrVisible && (
        <FabAnimated
          tooltip={local.ru.tooltip.FAB_PICK_FILE_TYPE}
          icon="pickFileType"
          visible={true}
          action={() => {
            actions.setPickTypeModalVisible(true);
          }}
          position={{ top: TOP, right: RIGHT + 3 * stn.ui.FLOAT_BTN_PADDING }}
        />
      )}
      {mode != "search" && (
        <FabAnimated
          tooltip={local.ru.tooltip.FAB_SHOW_NOTE}
          icon="note"
          visible={state.noteVisible}
          action={() => actions.setNoteVisible((state) => !state)}
          position={{ bottom: BOTTOM, left: LEFT + stn.ui.FLOAT_BTN_PADDING }}
        />
      )}
      {mode != "search" && (
        <FabAnimated
          tooltip={local.ru.tooltip.FAB_DOWNLOD_ALL}
          icon="downloadall"
          visible={true}
          action={() => actions.downloadAll()}
          position={{ bottom: BOTTOM, left: LEFT }}
        />
      )}

      {mode != "search" && state.noteVisible && (
        <FabAnimated
          tooltip={local.ru.tooltip.FAB_SAVE_NOTE}
          icon="saveNote"
          visible={true}
          action={() => actions.saveNote()}
          position={{
            bottom: BOTTOM,
            left: LEFT + 2 * stn.ui.FLOAT_BTN_PADDING,
          }}
        />
      )}
    </>
  );
};

export default FloatMenu;
