"use client";
import Manager from "./manager";

import { createTheme, ThemeProvider } from "@mui/material/styles";
// import { ruRU } from "@mui/material/locale";
import { ruRU } from "@mui/x-data-grid/locales";
// import { ruRU as pickersruRU } from "@mui/x-date-pickers/locales";
import { ruRU as coreruRU } from "@mui/material/locale";

import CssBaseline from "@mui/material/CssBaseline";
const theme = createTheme(
  {
    palette: {
      primary: { main: "#1976d2" },
    },
  },
  ruRU,
  // pickersruRU,
  coreruRU
);

export default function Home({ params }) {
  return (
    <ThemeProvider theme={theme}>
      <Manager user={params.manager} setProfileVisible={() => {}} />{" "}
    </ThemeProvider>
  );
}
