import React, { useEffect, useState } from 'react';
import { BrowserRouter, Routes, Route, Link } from 'react-router-dom';
import WelcomeScreen from './welcome-screen';
import ExpenseForm from '../components/expense-input';
import EarningsForm from '../components/earnings-form';
import { ThemeProvider, createTheme } from '@mui/material/styles';
import CssBaseline from '@mui/material/CssBaseline';
import { AppBar, Toolbar, Typography, Button, Box } from '@mui/material';
import { montserrat } from '../fonts/fonts';


const theme = createTheme({
  palette: {
    primary: {
      main: '#000000',
      contrastText: '#ffffff',
    },
    secondary: {
      main: '#424242',
    },
    background: {
      default: '#f5f5f5',
      paper: '#ffffff',
    },
    text: {
      primary: '#212121',
      secondary: '#757575',
    },
  },
  typography: {
    fontFamily: [
      montserrat.style.fontFamily,
      '-apple-system',
      'BlinkMacSystemFont',
      '"Segoe UI"',
      'Roboto',
      'sans-serif',
    ].join(','),
  },
});



const Home = () => <WelcomeScreen />;
const About = () => <div className="p-4"><h1 className="text-2xl font-bold">About Page</h1><p>This is the about page</p></div>;
const Contact = () => <div className="p-4"><h1 className="text-2xl font-bold">Contact Page</h1><p>Contact us here</p></div>;
const Expenses = () => <ExpenseForm />;
const Earnings = () => <EarningsForm />;

const Navigation = () => (
  <AppBar position="static">
    <Toolbar>
      <Typography variant="h6" component="div" sx={{ flexGrow: 1 }}>
        Budget Tracker
      </Typography>
      <Button color="inherit" component={Link} to="/">Home</Button>
      <Button color="inherit" component={Link} to="/about">About</Button>
      <Button color="inherit" component={Link} to="/contact">Contact</Button>
    </Toolbar>
  </AppBar>
);

const Layout = ({ children }) => (
  <Box sx={{ display: 'flex', flexDirection: 'column', minHeight: '100vh' }}>
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
              <Route path="*" element={<Component {...pageProps} />} />
          </Routes>
        </Layout>
      </BrowserRouter>
    </ThemeProvider>
  );
}

export default MyApp;