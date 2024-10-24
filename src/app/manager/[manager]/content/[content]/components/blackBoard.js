import TextField from "@mui/material/TextField";
import FabAnimated from "../../../../../../components/fabAnimated/fabAnimated";
import { Roboto } from "next/font/google";
import localFont from "next/font/local";
import { useEffect, useState } from "react";
import {
  updateDocFieldsInCollectionById,
  getDocFromCollectionById,
} from "../../../../../data model/client actions/datamodel";
import stn from "@/globals/constants";

const roboto = Roboto({
  weight: "900",
  subsets: ["latin"],
});

const myFont = localFont({ src: "../../../../../fonts/overdozesans.ttf" });

const BlackBoard = ({ surveyid }) => {
  const handleSaveNote = async () => {
    console.log(surveyid);

    await updateDocFieldsInCollectionById("surveysresults", surveyid, {
      note: note,
    });
  };

  const [note, setNote] = useState(stn.defaults.BLACKBOARD_TEXT);

  useEffect(() => {
    getDocFromCollectionById("surveysresults", surveyid).then((docData) => {
      console.log(docData?.note, surveyid);
      !!docData?.note && setNote(docData?.note);
    });
  }, []);

  const changeNote = (e) => {
    setNote(e.target.value);
  };

  return (
    <>
      <FabAnimated
        icon="saveNote"
        visible={true}
        action={() => handleSaveNote()}
        position={{ bottom: 16, left: 98 }}
      />

      <TextField
        id="outlined-multiline-static"
        inputProps={{
          style: {
            color: "#405D72",
            fontSize: 20,
            // fontStyle: "italic",
            // fontWeight: "bold",
            // fontFamily: myFont.style.fontFamily,
          },
        }}
        sx={{
          m: "10px",
          backgroundColor: "#f4f2f1",
          borderRadius: "20px",

          "& .MuiOutlinedInput-root": {
            borderRadius: "20px",
            borderWidth: "10px",
          },
        }}
        multiline
        value={note}
        rows={20}
        onChange={(e) => changeNote(e)}
      />
    </>
  );
};

export default BlackBoard;
