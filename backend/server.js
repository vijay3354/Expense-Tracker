require('dotenv').config();
require('express-async-errors');
const express = require('express');
const cors = require('cors');
const connectDB = require('./src/config/db');
const transactionsRouter = require('./src/routes/transactions');
const errorHandler = require('./src/middleware/errorHandler');

const app = express();
app.use(cors());
app.use(express.json());

app.use('/api/transactions', transactionsRouter);

app.get('/', (req, res) => res.send({ ok: true }));

app.use(errorHandler);

const PORT = process.env.PORT || 4000;
connectDB().then(() => {
  app.listen(PORT, () => console.log(`Server running on port ${PORT}`));
}).catch(err => {
  console.error('Failed to connect DB', err);
  process.exit(1);
});
