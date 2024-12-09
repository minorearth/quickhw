"use client";
import Manager from "./manager";
import { createTheme, ThemeProvider } from "@mui/material/styles";
import { ruRU } from "@mui/x-data-grid/locales";
import { ruRU as coreruRU } from "@mui/material/locale";

const theme = createTheme(
  {
    palette: {
      primary: { main: "#1976d2" },
    },
  },
  ruRU,
  coreruRU
);

export default function Home({ params }) {
  return (
    <ThemeProvider theme={theme}>
      <Manager user={params.manager} setProfileVisible={() => {}} />{" "}
    </ThemeProvider>
  );
}
