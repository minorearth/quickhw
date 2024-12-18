import Box from "@mui/material/Box";
import { observer } from "mobx-react-lite";
import stn from "@/globals/settings";
import local from "@/globals/local";
import Button from "@mui/material/Button";
import CongratAnimation from "@/components/congratulation/congratAnimation";
import ReplayIcon from "@mui/icons-material/Replay";

const Congrat = observer(({ setCongratVisible }) => {
  return (
    <Box
      sx={{
        display: "flex",
        flexDirection: "column",
        height: window.innerHeight,
        alignItems: "center",
        justifyContent: "center",
        transition: "padding 5s",
      }}
    >
      <CongratAnimation />
      <Button
        sx={{ mt: 3, mb: 3 }}
        variant="contained"
        aria-label="repeat"
        onClick={() => setCongratVisible(false)}
        endIcon={<ReplayIcon />}
      >
        {local.ru.caption.DROP_SEND_CONGRAT}
      </Button>
    </Box>
  );
});

export default Congrat;
