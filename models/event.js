const mongoose = require('mongoose')

const Schema = mongoose.Schema;

const eventSchema = new Schema({
    // _id: mongoose.Schema.Types.ObjectId,
    title: {
        type: String,
        required: true,
    },
    description: {
        type: String,
        required: true,
    },
    price: Number,
    date: {
        type: Date,
        required: true,
    }
})

module.exports = mongoose.model('Event', eventSchema)