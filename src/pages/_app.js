import React, { useEffect, useState } from "react";
import { BrowserRouter, Routes, Route, Link } from "react-router-dom";
import WelcomeScreen from "./welcome-screen";
import ExpenseForm from "../components/expense-input";
import EarningsForm from "../components/earnings-form";
import FinancialSummary from "../components/financial-summary";
import SignIn from "../components/sign-in";
import SignUp from "../components/sign-up";
import { ThemeProvider, createTheme } from "@mui/material/styles";
import CssBaseline from "@mui/material/CssBaseline";
import { AppBar, Toolbar, Typography, Button, Box } from "@mui/material";
import { montserrat } from "../fonts/fonts";
import "../index.css";
import { I18nextProvider } from "react-i18next";
import i18n from "../i18n";
import NotificationProvider from "../components/NotificationProvider";

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
  <nav className="bg-white py-4 px-6 flex justify-between items-center shadow-sm">
    <Link to="/">
      <div className="font-bold text-xl">Budget Tracker</div>
    </Link>
    <div className="flex space-x-3">
      <Link to="/welcome-screen">
        <button className="bg-black hover:bg-blue-600 text-white font-medium px-4 py-2 rounded-lg transition-colors duration-300">
          START BUDGETING
        </button>
      </Link>
      <Link to="/sign-in">
        <button className="border border-gray-300 text-gray-800 font-medium px-4 py-2 rounded-lg hover:bg-gray-100 transition-colors duration-300">
          SIGN IN
        </button>
      </Link>
    </div>
  </nav>
);

const Layout = ({ children }) => (
  <div className="h-full">
    <div className="flex flex-col h-full bg-slate-50">
      <Navigation />
      <main className="flex-1">{children}</main>
    </div>

    <footer className="mt-auto py-4">
      <div className="text-center text-gray-400 text-sm">
        © 2025 Budget Tracker. All rights reserved.
      </div>
    </footer>
  </div>
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
      <NotificationProvider />
      <ThemeProvider theme={theme}>
        <CssBaseline />
        <BrowserRouter>
          <Layout>
            <Routes>
              <Route path="/" element={<Home />} />
              <Route path="/about" element={<About />} />
              <Route path="/sign-in" element={<SignIn />} />
              <Route path="/sign-up" element={<SignUp />} />
              <Route path="/contact" element={<Contact />} />
              <Route path="/expenses" element={<Expenses />} />
              <Route path="/earnings" element={<Earnings />} />
              <Route path="/dashboard" element={<Dashboard />} />
              <Route path="/financial-summary" element={<FinancialSummary />} />
              <Route path="/welcome-screen" element={<WelcomeScreen />} />
              <Route path="*" element={<Component {...pageProps} />} />
            </Routes>
          </Layout>
        </BrowserRouter>
      </ThemeProvider>
    </I18nextProvider>
  );
}

export default MyApp;
