// server.js
const express = require('express');
const mongoose = require('mongoose');
const bodyParser = require('body-parser');
const transactionRoutes = require('./routes/transactions');

const app = express();
const PORT = 3000;
const DATABASE_URL = 'mongodb://localhost:27017/mern-stack-coding-challenge';

mongoose.connect(DATABASE_URL);

app.use(bodyParser.json());
app.use('/api', transactionRoutes);

app.listen(PORT, () => {
    console.log(`Server is running on http://localhost:${PORT}`);
});
