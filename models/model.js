const mongoose = require('mongoose');
const mongoosePaginate = require('mongoose-paginate-v2');

const dataSchema = new mongoose.Schema({
    name: {
        required: true,
        type: String
    },
    age: {
        required: true,
        type: Number
    }
})

dataSchema.plugin(mongoosePaginate);

module.exports = mongoose.model('Data', dataSchema)