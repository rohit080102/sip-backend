const mongoose = require('mongoose');
const mongoosePaginate = require('mongoose-paginate-v2');

const schema = new mongoose.Schema({
    name: {
        // required: true,
        type: String
    },
    email: {
        required: true,
        type: String
    },
    message: {
        required: true,
        type: String
    },
}, { timestamps: true, strict: false })

schema.plugin(mongoosePaginate);
module.exports = mongoose.model('Feedback', schema)