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
    email: {
        required: true,
        type: String
    },
    password: {
        required: true,
        type: String
    },
    role: {
        type: String,
        default: 'student'
    },
    courseId: {
        ref: 'course',
        type: mongoose.Schema.ObjectId
    },
    groupId: {
        ref: 'group',
        type: mongoose.Schema.ObjectId
    }

}, { timestamps: true, strict: false })


module.exports = mongoose.model('student', schema)