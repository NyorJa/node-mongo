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
    }
})

module.exports = mongoose.model("banks", bankSchema);