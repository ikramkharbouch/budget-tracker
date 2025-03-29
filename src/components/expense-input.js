import React, { useState } from 'react';
import { 
  Box, Typography, TextField, Button, Paper, Grid, 
  Divider, Dialog, DialogTitle, DialogContent, 
  DialogActions, IconButton, Tooltip, List, ListItem,
  ListItemText, Accordion, AccordionSummary, AccordionDetails
} from '@mui/material';
import AddIcon from '@mui/icons-material/Add';
import HelpOutlineIcon from '@mui/icons-material/HelpOutline';
import ExpandMoreIcon from '@mui/icons-material/ExpandMore';
import { useNavigate } from 'react-router-dom';

const ExpenseForm = () => {
  const navigate = useNavigate();
  const [openDialog, setOpenDialog] = useState(false);
  const [customExpenseName, setCustomExpenseName] = useState('');
  const [customExpenseAmount, setCustomExpenseAmount] = useState('');
  const [expenses, setExpenses] = useState({
    groceries: '',
    restaurants: '',
    utilities: '',
    subscriptions: '',
    insurance: '',
    vehicleCosts: '',
    housingPayment: '',
    luxuries: '',
    loan: '',
    carPayment: '',
    creditCardDebt: '',
  });
  const [customExpenses, setCustomExpenses] = useState([]);

  const handleExpenseChange = (expense, value) => {
    setExpenses({
      ...expenses,
      [expense]: value
    });
  };

  const handleAddCustomExpense = () => {
    if (customExpenseName && customExpenseAmount) {
      setCustomExpenses([
        ...customExpenses,
        { name: customExpenseName, amount: customExpenseAmount }
      ]);
      setCustomExpenseName('');
      setCustomExpenseAmount('');
      setOpenDialog(false);
    }
  };

  const handleFinish = () => {
    // Here you would typically save the expense data
    // For now, just navigate to the earnings page
    navigate('/earnings');
  };

  const expenseDescriptions = {
    groceries: "Highest cost of grocery in a week multiplied by four equivalent to a month.",
    restaurants: "Highest cost of dine-out in a week multiplied by four equivalent to a month.",
    utilities: "Water, electricity, and gas.",
    subscriptions: "Internet, phone, memberships, and entertainment.",
    insurance: "Vehicle, home, and asset-related coverage.",
    vehicleCosts: "Gas, repairs, maintenance, and cleaning.",
    housingPayment: "Housing-related payments.",
    luxuries: "Non-essential expenses (e.g., entertainment subscriptions).",
    loan: "Any borrowed funds, including student loans.",
    carPayment: "Monthly car payments.",
    creditCardDebt: "Tracks outstanding balances."
  };

  const expenseLabels = {
    groceries: "Groceries",
    restaurants: "Restaurants",
    utilities: "Utilities",
    subscriptions: "Subscriptions",
    insurance: "Insurance",
    vehicleCosts: "Vehicle Costs",
    housingPayment: "Mortgage/Rent",
    luxuries: "Luxuries",
    loan: "Loan",
    carPayment: "Car Lease/Loan",
    creditCardDebt: "Credit Card Debt"
  };

  return (
    <Box sx={{ p: 4, maxWidth: 1200, mx: 'auto' }}>
      <Typography variant="h4" component="h1" gutterBottom>
        Enter Your Monthly Expenses
      </Typography>
      <Typography variant="body1" paragraph sx={{ mb: 4 }}>
        Please enter your best estimate for each category. Don't worry if you're not sure—you can always adjust these later.
      </Typography>

      <Paper elevation={3} sx={{ p: 3, mb: 4 }}>
        <Grid container spacing={3}>
          {Object.keys(expenses).map((expense) => (
            <Grid item xs={12} key={expense}>
              <Accordion>
                <AccordionSummary expandIcon={<ExpandMoreIcon />}>
                  <Box sx={{ display: 'flex', width: '100%', alignItems: 'center', justifyContent: 'space-between' }}>
                    <Typography variant="subtitle1">{expenseLabels[expense]}</Typography>
                    <TextField
                      label="Monthly Amount"
                      variant="outlined"
                      type="number"
                      value={expenses[expense]}
                      onChange={(e) => handleExpenseChange(expense, e.target.value)}
                      InputProps={{
                        startAdornment: <Typography sx={{ mr: 1 }}>$</Typography>,
                      }}
                      sx={{ width: 200 }}
                      onClick={(e) => e.stopPropagation()}
                    />
                  </Box>
                </AccordionSummary>
                <AccordionDetails>
                  <Typography variant="body2" color="text.secondary">
                    {expenseDescriptions[expense]}
                  </Typography>
                </AccordionDetails>
              </Accordion>
            </Grid>
          ))}
        </Grid>
      </Paper>

      {customExpenses.length > 0 && (
        <Paper elevation={3} sx={{ p: 3, mb: 4 }}>
          <Typography variant="h6" gutterBottom>
            Custom Expenses
          </Typography>
          <List>
            {customExpenses.map((item, index) => (
              <ListItem key={index} divider={index < customExpenses.length - 1}>
                <ListItemText 
                  primary={item.name} 
                  secondary={`$${item.amount} per month`} 
                />
              </ListItem>
            ))}
          </List>
        </Paper>
      )}

      <Box sx={{ display: 'flex', justifyContent: 'space-between', mt: 4 }}>
        <Button 
          variant="outlined" 
          color="primary" 
          startIcon={<AddIcon />}
          onClick={() => setOpenDialog(true)}
        >
          Did we miss something?
        </Button>
        <Button 
          variant="contained" 
          color="primary" 
          onClick={handleFinish}
          size="large"
        >
          Finish
        </Button>
      </Box>

      {/* Custom Expense Dialog */}
      <Dialog open={openDialog} onClose={() => setOpenDialog(false)}>
        <DialogTitle>Create Custom Expense</DialogTitle>
        <DialogContent>
          <TextField
            autoFocus
            margin="dense"
            label="Expense Name"
            type="text"
            fullWidth
            value={customExpenseName}
            onChange={(e) => setCustomExpenseName(e.target.value)}
            sx={{ mb: 2 }}
          />
          <TextField
            margin="dense"
            label="Monthly Amount"
            type="number"
            fullWidth
            value={customExpenseAmount}
            onChange={(e) => setCustomExpenseAmount(e.target.value)}
            InputProps={{
              startAdornment: <Typography sx={{ mr: 1 }}>$</Typography>,
            }}
          />
        </DialogContent>
        <DialogActions>
          <Button onClick={() => setOpenDialog(false)}>Cancel</Button>
          <Button onClick={handleAddCustomExpense} variant="contained" color="primary">
            Add Expense
          </Button>
        </DialogActions>
      </Dialog>
    </Box>
  );
};

export default ExpenseForm;