const mongoose = require('mongoose');

const schema = new mongoose.Schema({
    rollNumber: {
        required: true,
        type: Number
    },
    studentName: {
        required: true,
        type: String
    },
    phone: {
        required: true,
        type: Number
    },
    score: {
        type: Number
    },


}, { timestamps: true, strict: false })


module.exports = mongoose.model('User', schema)