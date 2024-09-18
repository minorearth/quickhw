import { TbQrcode } from "react-icons/tb";
import { TbQrcodeOff } from "react-icons/tb";
import { MdSpeakerNotes } from "react-icons/md";
import { MdSpeakerNotesOff } from "react-icons/md";
import SaveIcon from "@mui/icons-material/Save";

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
};

export default Icon2State;
