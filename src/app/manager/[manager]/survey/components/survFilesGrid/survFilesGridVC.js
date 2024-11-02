"use client";
const useSurvFilesGrid2VC = ({ setCurrRow, setMediacardVisible }) => {
  const setCardVisible = (row) => {
    setMediacardVisible(true);
    setCurrRow(row);
  };

  return { setCardVisible };
};

export default useSurvFilesGrid2VC;
