const mongoose = require('mongoose');

const schema = new mongoose.Schema({

    courseName: {
        required: true,
        type: String
    },

    description: {
        type: String
    }
}, { timestamps: true, strict: false })


module.exports = mongoose.model('course', schema)