const mongoose = require('mongoose');
const Schema = mongoose.Schema;

const transactionSchema = new Schema({
    title: String,
    description: String,
    price: Number,
    dateOfSale: Date,
    sold: Boolean
});

module.exports = mongoose.model('Transaction', transactionSchema);
