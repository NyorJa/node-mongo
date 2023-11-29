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
}, {
    toJSON: { virtuals: true },
    toObject: { virtuals: true }
})

bankSchema.virtual('id', {
    id: this.id
  });

module.exports = mongoose.model("banks", bankSchema);