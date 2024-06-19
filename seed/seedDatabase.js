const axios = require('axios');
const mongoose = require('mongoose');
const Transaction = require('../models/Transaction');

const DATABASE_URL = 'mongodb://localhost:27017/mern-stack-coding-challenge';
const THIRD_PARTY_API_URL = 'https://s3.amazonaws.com/roxiler.com/product_transaction.json';

mongoose.connect(DATABASE_URL);

const seedDatabase = async () => {
    try {
        const response = await axios.get(THIRD_PARTY_API_URL);
        const transactions = response.data;

        await Transaction.deleteMany();
        await Transaction.insertMany(transactions);

        console.log('Database seeded successfully');
    } catch (error) {
        console.error('Error seeding database:', error);
    } finally {
        mongoose.connection.close();
    }
};

seedDatabase();
