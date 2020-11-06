const mongoose = require('mongoose');

const articlesSchema = new mongoose.Schema({
    articleName: {
        type: String,
        required: true
    },
    articleUrl: {
        type: String,
        required: true
    },
    category: {
        type: String
    },
    panel: {
        type: String
    }

});

module.exports = mongoose.model('Articles', articlesSchema);