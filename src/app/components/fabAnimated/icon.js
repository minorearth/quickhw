import { TbQrcode } from "react-icons/tb";
import { TbQrcodeOff } from "react-icons/tb";
import { MdSpeakerNotes } from "react-icons/md";
import { MdSpeakerNotesOff } from "react-icons/md";
import SaveIcon from "@mui/icons-material/Save";
import HideImageIcon from "@mui/icons-material/HideImage";
import LinkIcon from "@mui/icons-material/Link";
import UndoIcon from "@mui/icons-material/Undo";
import CropRotateIcon from "@mui/icons-material/CropRotate";

const Icon2State = ({ visible, icon }) => {
  if (icon == "qr")
    return !visible ? (
      <TbQrcode style={{ fontSize: 30 }} />
    ) : (
      <TbQrcodeOff style={{ fontSize: 30 }} />
    );
  if (icon == "note")
    return !visible ? (
      <MdSpeakerNotes style={{ fontSize: 30 }} />
    ) : (
      <MdSpeakerNotesOff style={{ fontSize: 30 }} />
    );
  if (icon == "saveNote") return <SaveIcon style={{ fontSize: 30 }} />;
  if (icon == "saveImage") return <SaveIcon style={{ fontSize: 30 }} />;
  if (icon == "hideImage") return <HideImageIcon style={{ fontSize: 30 }} />;
  if (icon == "copyClipboard") return <LinkIcon style={{ fontSize: 30 }} />;
  if (icon == "undo") return <UndoIcon style={{ fontSize: 30 }} />;
  if (icon == "rotate") return <CropRotateIcon style={{ fontSize: 30 }} />;
};

export default Icon2State;
