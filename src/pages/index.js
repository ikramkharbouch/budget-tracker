
import { Container, Typography, Grid, Button, Box } from '@mui/material';

export default function Home() {
  return (
    <Container>
      <Box sx={{ textAlign: 'center', marginTop: 5 }}>
        <Typography variant="h3" gutterBottom>
          Budget Tracker
        </Typography>
        <Typography variant="h6">
          Track your income, expenses, and savings for a better financial future.
        </Typography>

        <Grid container spacing={2} sx={{ marginTop: 4 }}>
          <Grid item xs={12} sm={6}>
            <Button variant="contained" fullWidth>
              Add Income
            </Button>
          </Grid>
          <Grid item xs={12} sm={6}>
            <Button variant="outlined" fullWidth>
              Add Expense
            </Button>
          </Grid>
        </Grid>
      </Box>
    </Container>
  );
}
