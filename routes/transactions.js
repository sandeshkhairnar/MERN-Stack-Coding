const express = require('express');
const axios = require('axios');
const Transaction = require('../models/Transaction');

const router = express.Router();
const THIRD_PARTY_API_URL = 'https://s3.amazonaws.com/roxiler.com/product_transaction.json';

router.get('/init', async (req, res) => {
    try {
        const response = await axios.get(THIRD_PARTY_API_URL);
        const transactions = response.data;

        await Transaction.deleteMany();
        await Transaction.insertMany(transactions);

        console.log('Database seeded successfully');
        res.status(200).send('Database initialized with seed data');
    } catch (error) {
        console.error('Error seeding database:', error);
        res.status(500).send('Error initializing database');
    }
});

router.get('/transactions', async (req, res) => {
    const { page = 1, perPage = 10, search = '' } = req.query;
    const query = {
        $or: [
            { title: { $regex: search, $options: 'i' } },
            { description: { $regex: search, $options: 'i' } },
            { price: parseFloat(search) || 0 },
        ],
    };

    try {
        const transactions = await Transaction.find(query)
            .skip((page - 1) * perPage)
            .limit(parseInt(perPage));
        const count = await Transaction.countDocuments(query);

        res.json({ transactions, count, page, perPage });
    } catch (error) {
        console.error('Error fetching transactions:', error);
        res.status(500).send('Error fetching transactions');
    }
});

router.get('/statistics', async (req, res) => {
    const { month } = req.query;
    if (!month) {
        return res.status(400).send('Month is required');
    }

    const monthIndex = new Date(`${month} 1, 2000`).getMonth() + 1;

    try {
        const totalSales = await Transaction.aggregate([
            { $match: { $expr: { $eq: [{ $month: '$dateOfSale' }, monthIndex] } } },
            { $group: { _id: null, totalAmount: { $sum: '$price' }, soldItems: { $sum: { $cond: ['$sold', 1, 0] } }, notSoldItems: { $sum: { $cond: ['$sold', 0, 1] } } } }
        ]);

        if (totalSales.length > 0) {
            const { totalAmount, soldItems, notSoldItems } = totalSales[0];
            res.json({ totalAmount, soldItems, notSoldItems });
        } else {
            res.json({ totalAmount: 0, soldItems: 0, notSoldItems: 0 });
        }
    } catch (error) {
        res.status(500).send('Error fetching statistics');
    }
});

module.exports = router;
