const mongoose = require('mongoose');

const bankSchema = new mongoose.Schema({
    name: {
        type: String
    },
    accountNumber: {
        type: String
    },
    trust: {
        type: Number
    },
    transactionFee: {
        type: Number
    },
    created_at: {
        type: Date,
        default: Date.now
    }
})

module.exports = mongoose.model("banks", bankSchema);