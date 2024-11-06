const mongoose = require('mongoose');
const mongoosePaginate = require('mongoose-paginate-v2');

const schema = new mongoose.Schema({
    title: {
        required: true,
        type: String
    },
    date: {
        required: true,
        type: Date
    },
    content: {
        required: true,
        type: String
    },
    isShow: {
        type: Boolean
    }
}, { timestamps: true, strict: false })

schema.plugin(mongoosePaginate);
module.exports = mongoose.model('Blog', schema)