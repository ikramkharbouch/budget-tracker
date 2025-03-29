import React, { useState } from 'react';
import { Button, Box, Typography, TextField } from '@mui/material';

// Component for Financial Summary & Simulation
const FinancialSummary = () => {
  const [earnings, setEarnings] = useState(0);
  const [expenses, setExpenses] = useState(0);
  const [result, setResult] = useState(null);
  const [debtSuggestions, setDebtSuggestions] = useState([]);
  const [savingsMessage, setSavingsMessage] = useState('');

  const handleSimulate = () => {
    const netResult = earnings - expenses;

    if (netResult < 0) {
      setResult('debt');
      setDebtSuggestions([
        'Consider a second job if additional earnings weren’t listed.',
        'Reduce non-essential expenses (e.g., dining out, luxury subscriptions).',
        'Grocery spending exceeding 30-40% of income could trigger recommendations.'
      ]);
    } else {
      setResult('savings');
      if (netResult > 3000000) {
        setSavingsMessage('Someone’s heading for a comfortable retirement!');
      } else {
        setSavingsMessage('You’re on track for a well-earned vacation or a new car!');
      }
    }
  };

  const handleShowResults = () => {
    const netResult = earnings - expenses;
    setResult(netResult > 0 ? 'Surplus' : 'Deficit');
  };

  return (
    <Box sx={{ padding: 3 }}>
      <Typography variant="h4">Financial Summary & Simulation</Typography>
      <Box sx={{ marginBottom: 2 }}>
        <TextField
          label="Earnings"
          type="number"
          value={earnings}
          onChange={(e) => setEarnings(parseFloat(e.target.value))}
          fullWidth
          sx={{ marginBottom: 2 }}
        />
        <TextField
          label="Expenses"
          type="number"
          value={expenses}
          onChange={(e) => setExpenses(parseFloat(e.target.value))}
          fullWidth
          sx={{ marginBottom: 2 }}
        />
      </Box>

      <Box sx={{ marginBottom: 2 }}>
        <Button variant="contained" color="primary" onClick={handleSimulate}>Simulate 1 Year</Button>
        <Button variant="outlined" color="secondary" sx={{ marginLeft: 2 }} onClick={handleShowResults}>Show Results</Button>
      </Box>

      {result && (
        <Box sx={{ marginTop: 2 }}>
          <Typography variant="h6">
            {result === 'debt' ? 'You have accumulated debt!' : 'You have accumulated savings!'}
          </Typography>
          {result === 'debt' && debtSuggestions.map((suggestion, index) => (
            <Typography key={index}>{suggestion}</Typography>
          ))}
          {result === 'savings' && (
            <Typography>{savingsMessage}</Typography>
          )}
        </Box>
      )}
    </Box>
  );
};

export default FinancialSummary;
