import React, { useEffect, useState } from "react";
import { BrowserRouter, Routes, Route, Link } from "react-router-dom";
import WelcomeScreen from "./welcome-screen";
import ExpenseForm from "../components/expense-input";
import EarningsForm from "../components/earnings-form";
import FinancialSummary from "../components/financial-summary";
import { ThemeProvider, createTheme } from "@mui/material/styles";
import CssBaseline from "@mui/material/CssBaseline";
import { AppBar, Toolbar, Typography, Button, Box } from "@mui/material";
import { montserrat } from "../fonts/fonts";

import { I18nextProvider } from "react-i18next";
import i18n from "../i18n";

const theme = createTheme({
  palette: {
    primary: {
      main: "#000000",
      contrastText: "#000000",
    },
    secondary: {
      main: "#0BA2EF",
    },
    background: {
      default: "#ffffff",
      paper: "#ffffff",
    },
    text: {
      primary: "#000000",
      secondary: "#757575",
    },
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

const Home = () => <WelcomeScreen />;
const About = () => (
  <div className="p-4">
    <h1 className="text-2xl font-bold">About Page</h1>
    <p>This is the about page</p>
  </div>
);
const Contact = () => (
  <div className="p-4">
    <h1 className="text-2xl font-bold">Contact Page</h1>
    <p>Contact us here</p>
  </div>
);
const Dashboard = () => (
  <div className="p-4">
    <h1 className="text-2xl font-bold">Dashboard Page</h1>
    <p>This is the about page</p>
  </div>
);
const Expenses = () => <ExpenseForm />;
const Earnings = () => <EarningsForm />;

const Navigation = () => (
  <AppBar position="static" sx={{ backgroundColor: "transparent" }}>
    <Toolbar>
      <Typography variant="h6" sx={{ flexGrow: 1 }}>
        Budget Tracker
      </Typography>
      <Button variant="contained" color="secondary" sx={{ marginRight: 2 }}>
        Start Budgeting
      </Button>
      <Button variant="outlined" color="primary">
        Sign In
      </Button>
    </Toolbar>
  </AppBar>
);

const Layout = ({ children }) => (
  <Box sx={{ display: "flex", flexDirection: "column", minHeight: "100vh" }}>
    <Navigation />
    <Box component="main" sx={{ flexGrow: 1 }}>
      {children}
    </Box>
  </Box>
);

function MyApp({ Component, pageProps }) {
  const [isBrowser, setIsBrowser] = useState(false);

  useEffect(() => {
    setIsBrowser(true);
  }, []);

  if (!isBrowser) {
    return null;
  }

  return (
    <I18nextProvider i18n={i18n}>
      <ThemeProvider theme={theme}>
        <CssBaseline />
        <BrowserRouter>
          <Layout>
            <Routes>
              <Route path="/" element={<Home />} />
              <Route path="/about" element={<About />} />
              <Route path="/contact" element={<Contact />} />
              <Route path="/expenses" element={<Expenses />} />
              <Route path="/earnings" element={<Earnings />} />
              <Route path="/dashboard" element={<Dashboard />} />
              <Route path="/financial-summary" element={<FinancialSummary />} />
              <Route path="*" element={<Component {...pageProps} />} />
            </Routes>
          </Layout>
        </BrowserRouter>
      </ThemeProvider>
    </I18nextProvider>
  );
}

export default MyApp;
