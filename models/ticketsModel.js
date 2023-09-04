const mongoose = require("mongoose")

const ticketsSchema = new mongoose.Schema({
    owner: {
        type: String,
        required: true,
        trim: true
    },
    consertMonth: {
        type: String,
        required: true,
        trim: true
    },
    concertDay: {
        type: Number,
        required: true
    },
    tour: {
        type: String,
        required: true
    },
    time: {
        type: Number,
        required: true
    },
    venue: {
        type: String,
        required: true

    },
    city: {
        type: String,
        required: true
    }




})
const ticketsModel = mongoose.models.tickets || mongoose.model("tickets", ticketsSchema)

module.exports = ticketsModel