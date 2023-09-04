const mongoose = require("mongoose")

const transactionsSchema = new mongoose.Schema({
    artist: {
        type: String,
        required: true
    },
    price: {
        type:  Number,
        required: true
    },
    receipt: {
        type: String,
        required: true
    }
}, {timestamps: true})

const transactModel = mongoose.models.transactions || mongoose.model("transactions", transactionsSchema )

module.exports = transactModel