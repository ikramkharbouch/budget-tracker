import React from 'react';
import { Button, Typography, Box, Paper } from '@mui/material';
import { useNavigate } from 'react-router-dom';

const WelcomeScreen = () => {
  const navigate = useNavigate();

  const handleStart = () => {
    navigate('/expenses');
  };

  return (
    <Box 
      sx={{ 
        display: 'flex', 
        flexDirection: 'column', 
        alignItems: 'center', 
        justifyContent: 'center',
        minHeight: '80vh',
        textAlign: 'center',
        p: 4
      }}
    >
      <Paper elevation={3} sx={{ p: 5, maxWidth: 800, width: '100%' }}>
        <Typography variant="h3" component="h1" gutterBottom>
          Welcome to Budget Tracker
        </Typography>
        <Typography variant="h5" gutterBottom>
          Take control of your finances
        </Typography>
        <Typography variant="body1" paragraph sx={{ mb: 4 }}>
          This tool will help you track your expenses and income to create a personalized budget. 
          We'll guide you through entering your monthly expenses, income, and then provide insights 
          into your financial health.
        </Typography>
        <Button 
          variant="contained" 
          color="primary" 
          size="large" 
          onClick={handleStart}
          sx={{ py: 1.5, px: 4, fontSize: '1.1rem' }}
        >
          Start Budgeting
        </Button>
      </Paper>
    </Box>
  );
};

export default WelcomeScreen;