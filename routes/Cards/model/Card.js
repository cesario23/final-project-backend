const mongoose = require("mongoose");

const CardSchema = new mongoose.Schema ({
    title: {
        type: String,
    },
    rank: {
        type: Number,
    }
})

module.exports = mongoose.model("Card", CardSchema)