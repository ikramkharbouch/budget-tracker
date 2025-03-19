const express = require('express');
const cors = require('cors');
const dotenv = require('dotenv');
const { syncDB } = require('./server/models');
const userRoutes = require('./server/routes/userRoutes');
const financeRoutes = require('./server/routes/financeRoutes');
const transactionRoutes = require('./server/routes/transactionRoutes');

dotenv.config();
const app = express();

app.use(cors());
app.use(express.json());

app.use('/api/users', userRoutes);
app.use('/api/finance', financeRoutes);
app.use('/api', transactionRoutes);

const PORT = process.env.PORT || 5000;

syncDB().then(() => {
  app.listen(PORT, () => {
    console.log(`Server running on port ${PORT}`);
  });
});