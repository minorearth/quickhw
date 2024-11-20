import FabAnimated from "@/components/fabAnimated/fabAnimated";
import local from "@/globals/local";
import stn from "@/globals/settings";

const LEFT = 16;
const TOP = 16;

const Floatmenu = ({ actions }) => {
  return (
    <>
      <FabAnimated
        icon="saveImage"
        visible={true}
        action={() => actions.saveImage()}
        position={{ top: TOP, left: LEFT }}
        tooltip={local.ru.tooltip.FAB_SAVE_IMG}
      />
      <FabAnimated
        icon="hideImage"
        visible={true}
        action={() => actions.setMediacardVisible(false)}
        position={{ top: TOP, left: LEFT + stn.ui.FLOAT_BTN_PADDING }}
        tooltip={local.ru.tooltip.FAB_HIDE_IMG}
      />
      <FabAnimated
        icon="undo"
        visible={true}
        action={() => actions.redo()}
        position={{ top: TOP, left: LEFT + 2 * stn.ui.FLOAT_BTN_PADDING }}
        tooltip={local.ru.tooltip.FAB_UNDO_PAINT}
      />
      <FabAnimated
        icon="rotate"
        visible={true}
        action={() => actions.rotate()}
        position={{ top: TOP, left: LEFT + 3 * stn.ui.FLOAT_BTN_PADDING }}
        tooltip={local.ru.tooltip.FAB_ROTATE_IMG}
      />
    </>
  );
};

export default Floatmenu;
