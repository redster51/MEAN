let mongoose = require('mongoose');

let companySchema = new mongoose.Schema({
    _userId: {
        type: mongoose.Schema.Types.ObjectId,
        required: true,
        ref: 'User'
    },

    name: {
        type: String,
        unique: true,
        required: true
    },

    description: {
        type: String,
        required: true
    },

    topic: {
        type: String,
        required: true
    },

    video: {
        type: String
    },

    needMoney: {
        type: Number,
        required: true
    },

    endDate: {
        type: Date,
        required: true
    }
});

mongoose.model('Company', companySchema);
