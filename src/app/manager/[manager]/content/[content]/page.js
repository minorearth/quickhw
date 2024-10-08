"use client";

import { useState, useEffect } from "react";
import MediaCard from "./components/mediacard/mediaCard.js";
import SurvFilesGrid2 from "./components/survFilesGrid/survFilesGri.js";
import { Box } from "@mui/material";
import BlackBoard from "./components/blackBoard.js";
import FabAnimated from "@/components/fabAnimated/fabAnimated.js";
import { Qr } from "./components/qr.js";
import Progress from "@/components/progress.js";
import progress from "@/store/progress.js";
import { observer } from "mobx-react-lite";
import stn from "@/app/constants.js";
import Survey from "./survey.js";

const Content = ({ params }) => {
  return <Survey surveyid={params.content} />;
};

export default Content;
