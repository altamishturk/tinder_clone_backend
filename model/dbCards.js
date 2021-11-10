const mongoose = require('mongoose');

const cardSchema = mongoose.Schema(
    {
        name: String,
        imgURL: String
    }
);


module.exports = mongoose.model('cards', cardSchema);