const express = require('express');
const cors = require('cors');
const passport = require('passport');
const session = require('express-session');
const dotenv = require('dotenv');
const { syncDB } = require('./server/models');
const userRoutes = require('./server/routes/userRoutes');
const financeRoutes = require('./server/routes/financeRoutes');
const transactionRoutes = require('./server/routes/transactionRoutes');
const authRoutes = require('./server/routes/authRoutes');

const setupSwagger = require("./server/swagger");

dotenv.config();
const app = express();

app.use(cors());
app.use(express.json());
app.use(express.urlencoded({ extended: true }));
app.use(session({
  secret: process.env.SESSION_SECRET,
  resave: false,
  saveUninitialized: true
}));

app.use(passport.initialize());
app.use(passport.session());

require('./passportConfig');

setupSwagger(app);

app.use('/api/users', userRoutes);
app.use('/api/finance', financeRoutes);
app.use('/api/transactions', transactionRoutes);
app.use('/api/auth', authRoutes);

const PORT = process.env.PORT || 5000;

syncDB().then(() => {
  app.listen(PORT, () => {
    console.log(`Server running on port ${PORT}`);
  });
});