const mongoose = require('mongoose');

const schema = new mongoose.Schema({
    employeeNumber: {
        // required: true,
        type: Number
    },
    staffName: {
        required: true,
        type: String
    },
    email: {
        requiredA: true,
        type: String
    },
    password: {
        required: true,
        type: String
    },
    role: {
        type: String,
        enum: ['staff', 'coordinator', 'admin'],
        default: 'staff'
    },
    // courseName: {
    //     default: "MCA",
    //     ref: 'course',
    //     type: mongoose.Types.ObjectId
    // },
}, { timestamps: true, strict: false })


module.exports = mongoose.model('staff', schema)