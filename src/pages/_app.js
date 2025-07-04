import React, { useEffect, useState } from "react";
import { BrowserRouter } from "react-router-dom";
import { ThemeProvider, createTheme } from "@mui/material/styles";
import CssBaseline from "@mui/material/CssBaseline";
import { montserrat } from "../fonts/fonts";
import "../index.css";
import { I18nextProvider } from "react-i18next";
import i18n from "../i18n";
import NotificationProvider from "../components/NotificationProvider";
import ATMMain from "../components/ATMMain"; // your main ATM machine UI component

const theme = createTheme({
  palette: {
    primary: { main: "#000000", contrastText: "#000000" },
    secondary: { main: "#0BA2EF" },
    background: { default: "#ffffff", paper: "#ffffff" },
    text: { primary: "#000000", secondary: "#757575" },
  },
  typography: {
    fontFamily: [
      montserrat.style.fontFamily,
      "-apple-system",
      "BlinkMacSystemFont",
      '"Segoe UI"',
      "Roboto",
      "sans-serif",
    ].join(","),
  },
});

function MyApp() {
  const [isBrowser, setIsBrowser] = useState(false);

  useEffect(() => {
    setIsBrowser(true);
  }, []);

  if (!isBrowser) return null;

  return (
    <I18nextProvider i18n={i18n}>
      <NotificationProvider />
      <ThemeProvider theme={theme}>
        <CssBaseline />
        <BrowserRouter>
          <div
            className="min-h-screen w-full flex flex-col items-center justify-center bg-cover bg-center"
            style={{
              backgroundImage: 'url("assets/main-bg.png")',
            }}
          >
            <div className="w-full max-w-[768px] h-[90px] bg-white shadow-md flex items-center justify-center">
              {/* Replace this with real ad content or image */}
              <span className="text-sm text-gray-700">
                🔶 The Ad Banner Goes Here 🔶
              </span>
            </div>

            <ATMMain />
          </div>
        </BrowserRouter>
      </ThemeProvider>
    </I18nextProvider>
  );
}

export default MyApp;
