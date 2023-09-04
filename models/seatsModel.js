const mongoose = require("mongoose")

const seats = new mongoose.Schema({
    section: {
        type: Number,
        required: true
    },
    owner:{
        type: String,
        required: true
    },
    venue: {
        type: String,
        required: true
    },
    row: {
        type: Number,
        required: true
    },
    price: {
        type: Number,
        required: true
    }
})
const seatsModel = mongoose.models.seats || mongoose.model("seats", seats)

module.exports = seatsModel