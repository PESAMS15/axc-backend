const mongoose = require("mongoose")

const ticketSchema = new mongoose.Schema({
    ticketName: {
        type: String,
        required: true,
        trim: true
    },
    ticketPic: {
        type: String,
        required: true,
        
    },
    ticketLocation: {
        type: String,
        required: true,
        trim: true
    },
})

const tickModel = mongoose.models.tick || mongoose.model("tick", ticketSchema)

module.exports = tickModel
