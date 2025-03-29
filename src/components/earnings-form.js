import React, { useState } from 'react';
import { 
  Box, Typography, TextField, Button, Paper, Grid, 
  Dialog, DialogTitle, DialogContent, 
  DialogActions, List, ListItem, ListItemText,
  IconButton
} from '@mui/material';
import AddIcon from '@mui/icons-material/Add';
import DeleteIcon from '@mui/icons-material/Delete';
import { useNavigate } from 'react-router-dom';

const EarningsForm = () => {
  const navigate = useNavigate();
  const [openDialog, setOpenDialog] = useState(false);
  const [customEarningName, setCustomEarningName] = useState('');
  const [customEarningAmount, setCustomEarningAmount] = useState('');
  
  const [primaryIncome, setPrimaryIncome] = useState('');
  
  const [additionalEarnings, setAdditionalEarnings] = useState([]);

  const handleAddCustomEarning = () => {
    if (customEarningName && customEarningAmount) {
      setAdditionalEarnings([
        ...additionalEarnings,
        { name: customEarningName, amount: customEarningAmount }
      ]);
      setCustomEarningName('');
      setCustomEarningAmount('');
      setOpenDialog(false);
    }
  };

  const handleDeleteEarning = (index) => {
    const updatedEarnings = [...additionalEarnings];
    updatedEarnings.splice(index, 1);
    setAdditionalEarnings(updatedEarnings);
  };

  const handleFinish = () => {
    const total = Number(primaryIncome) + 
                 additionalEarnings.reduce((sum, earning) => sum + Number(earning.amount), 0);
                 
    navigate('/dashboard', { 
      state: { 
        totalIncome: total,
        primaryIncome: primaryIncome,
        additionalEarnings: additionalEarnings
      } 
    });
  };

  return (
    <Box sx={{ p: 4, maxWidth: 1200, mx: 'auto' }}>
      <Typography variant="h4" component="h1" gutterBottom>
        Enter Your Monthly Earnings
      </Typography>
      <Typography variant="body1" paragraph sx={{ mb: 4 }}>
        Please enter your monthly income from all sources. This will help us create an accurate budget for you.
      </Typography>

      <Paper elevation={3} sx={{ p: 3, mb: 4 }}>
        <Typography variant="h6" gutterBottom>
          Primary Income
        </Typography>
        <Typography variant="body2" color="text.secondary" sx={{ mb: 2 }}>
          Enter your main source of income (e.g., salary, wages, pension).
        </Typography>
        <TextField
          label="Monthly Amount"
          variant="outlined"
          type="number"
          value={primaryIncome}
          onChange={(e) => setPrimaryIncome(e.target.value)}
          InputProps={{
            startAdornment: <Typography sx={{ mr: 1 }}>$</Typography>,
          }}
          fullWidth
        />
      </Paper>

      {additionalEarnings.length > 0 && (
        <Paper elevation={3} sx={{ p: 3, mb: 4 }}>
          <Typography variant="h6" gutterBottom>
            Additional Earnings
          </Typography>
          <List>
            {additionalEarnings.map((item, index) => (
              <ListItem 
                key={index} 
                divider={index < additionalEarnings.length - 1}
                secondaryAction={
                  <IconButton edge="end" aria-label="delete" onClick={() => handleDeleteEarning(index)}>
                    <DeleteIcon />
                  </IconButton>
                }
              >
                <ListItemText 
                  primary={item.name} 
                  secondary={`$${parseFloat(item.amount).toLocaleString()} per month`} 
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
          Add Additional Earnings
        </Button>
        <Button 
          variant="contained" 
          color="primary" 
          onClick={handleFinish}
          size="large"
          disabled={!primaryIncome}
        >
          Complete
        </Button>
      </Box>

      <Paper elevation={3} sx={{ p: 3, mt: 4 }}>
        <Typography variant="h6" gutterBottom>
          Total Monthly Income
        </Typography>
        <Typography variant="h4" color="primary.main">
          ${(Number(primaryIncome) + additionalEarnings.reduce((sum, earning) => sum + Number(earning.amount), 0)).toLocaleString()}
        </Typography>
      </Paper>

      {/* Add Earning Dialog */}
      <Dialog open={openDialog} onClose={() => setOpenDialog(false)}>
        <DialogTitle>Add Additional Earnings</DialogTitle>
        <DialogContent>
          <TextField
            autoFocus
            margin="dense"
            label="Source of Income"
            placeholder="Freelance, Side Gig, Investments, etc."
            type="text"
            fullWidth
            value={customEarningName}
            onChange={(e) => setCustomEarningName(e.target.value)}
            sx={{ mb: 2 }}
          />
          <TextField
            margin="dense"
            label="Monthly Amount"
            type="number"
            fullWidth
            value={customEarningAmount}
            onChange={(e) => setCustomEarningAmount(e.target.value)}
            InputProps={{
              startAdornment: <Typography sx={{ mr: 1 }}>$</Typography>,
            }}
          />
        </DialogContent>
        <DialogActions>
          <Button onClick={() => setOpenDialog(false)}>Cancel</Button>
          <Button onClick={handleAddCustomEarning} variant="contained" color="primary">
            Add Earnings
          </Button>
        </DialogActions>
      </Dialog>
    </Box>
  );
};

export default EarningsForm;