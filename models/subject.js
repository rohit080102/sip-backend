const mongoose = require('mongoose');

const schema = new mongoose.Schema({

    subjectName: {
        required: true,
        type: String
    },

    courseId: {
        ref: 'course',
        type: mongoose.Types.ObjectId,
    }
}, { timestamps: true, strict: false })

module.exports = mongoose.model('subject', schema)