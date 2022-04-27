import "./index.css";
import {
  CssBaseline,
  createTheme,
  Theme,
  ThemeProvider,
  responsiveFontSizes,
} from "@mui/material";
import React from "react";
import * as ReactDOM from "react-dom/client";
import App from "./components/App";

let theme: Theme = createTheme({
  palette: {
    mode: "dark",
    primary: {
      main: "#84335D",
      contrastText: "#E8D9E1",
    },
    secondary: {
      main: "#B6869F",
    },
    background: {
      default: "#1c1016",
      paper: "#50223A",
    },
    divider: "#E8D9E1",
    text: {
      primary: "#E8D9E1",
    },
  },
});
theme = responsiveFontSizes(theme);

const root = ReactDOM.createRoot(
  document.getElementById("root") as HTMLElement
);
root.render(
  <React.StrictMode>
    <ThemeProvider theme={theme}>
      <CssBaseline />
      <App />
    </ThemeProvider>
  </React.StrictMode>
);
