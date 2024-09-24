"use client";

import { useState, useEffect } from "react";
import {
  getDocFromCollectionByIdRealtime,
  getDocFromCollectionByIdUpdates,
} from "../../../../data model/server actions/datamodel";
import { ObjtoArr } from "@/app/utils/objectUtils";

const useSurvFilesGrid2VC = ({
  setCurrRow,
  session,
  setRowsx,
  setMediacardVisible,
}) => {
  const setCardVisible = (row) => {
    setMediacardVisible(true);
    setCurrRow(row);
  };

  useEffect(() => {
    setInterval(async () => {
      const freshdata = await getDocFromCollectionByIdUpdates(session);
      setRowsx(ObjtoArr(freshdata?.files));
    }, 5000);
    getDocFromCollectionByIdRealtime("surveys", session).then((docData) => {
      // const fileMeta = await getMetadata(file);
      setRowsx(ObjtoArr(docData?.files));
    });
  }, []);

  return { setCardVisible };
};

export default useSurvFilesGrid2VC;
