import React, { useEffect, useState } from "react";
import { BrowserRouter, Routes, Route } from "react-router-dom";
import { ThemeProvider, createTheme } from "@mui/material/styles";
import CssBaseline from "@mui/material/CssBaseline";
import { Provider } from "react-redux";
import { store } from "../store";
import { montserrat, inter } from "../fonts/fonts"; // Import the inter font here
import "../index.css";
import { I18nextProvider, useTranslation } from "react-i18next";
import i18n from "../i18n/index";
import NotificationProvider from "../components/NotificationProvider";
import ATMMain from "../components/ATMMain";
import LanguageSelector from "../components/LanguageSelector";
import TermsAndConditions from "../pages/TermsAndConditions";
import CommentsAndSuggestions from "../pages/CommentsAndSuggestions";

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
      inter.style.fontFamily, // Add the inter font here
      "-apple-system",
      "BlinkMacSystemFont",
      '"Segoe UI"',
      "Roboto",
      "sans-serif",
    ].join(","),
  },
});

function MainLayout({ children }) {
  const { t } = useTranslation();

  return (
    <div
      className="min-h-screen w-full flex flex-col items-center justify-center bg-cover bg-center"
      style={{
        backgroundImage: 'url("assets/main-bg.png")',
      }}
    >
      {/* Language Selector - positioned at top right with white background */}
      <div className="absolute top-4 right-4 z-10 bg-white rounded-lg shadow-md p-2">
        <LanguageSelector />
      </div>

      {children}
    </div>
  );
}

function AppContent() {
  const { t } = useTranslation();

  return (
    <Routes>
      {/* Main app route */}
      <Route 
        path="/" 
        element={
          <MainLayout>
            <div className="w-full max-w-[768px] h-[90px] bg-white shadow-md flex items-center justify-center">
              {/* Translated ad banner text */}
              <span className="text-sm text-gray-700">
                🔶 {t("adBanner", "The Ad Banner Goes Here")} 🔶
              </span>
            </div>
            <ATMMain />
          </MainLayout>
        } 
      />
      
      {/* Terms and Conditions route */}
      <Route 
        path="/terms" 
        element={
          <MainLayout>
            <TermsAndConditions />
          </MainLayout>
        } 
      />
      
      {/* Comments and Suggestions route */}
      <Route 
        path="/feedback" 
        element={
          <MainLayout>
            <CommentsAndSuggestions />
          </MainLayout>
        } 
      />
    </Routes>
  );
}

function MyApp() {
  const [isBrowser, setIsBrowser] = useState(false);

  useEffect(() => {
    setIsBrowser(true);

    // Handle RTL support for Arabic
    const handleLanguageChange = (lng) => {
      if (lng === "ar") {
        document.documentElement.dir = "rtl";
        document.documentElement.lang = "ar";
      } else {
        document.documentElement.dir = "ltr";
        document.documentElement.lang = lng;
      }
    };

    // Listen for language changes
    i18n.on("languageChanged", handleLanguageChange);

    // Set initial direction and language
    handleLanguageChange(i18n.language);

    return () => {
      i18n.off("languageChanged", handleLanguageChange);
    };
  }, []);

  if (!isBrowser) return null;

  return (
    <Provider store={store}>
      <I18nextProvider i18n={i18n}>
        <NotificationProvider />
        <ThemeProvider theme={theme}>
          <CssBaseline />
          <BrowserRouter>
            <AppContent />
          </BrowserRouter>
        </ThemeProvider>
      </I18nextProvider>
    </Provider>
  );
}

export default MyApp;
