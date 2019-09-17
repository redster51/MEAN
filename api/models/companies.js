let mongoose = require('mongoose');

let companySchema = new mongoose.Schema({
    _userId: {
        type: mongoose.Schema.Types.ObjectId,
        required: true,
        ref: 'User'
    },
    name: {
        type: String,
        required: true,
        unique: true
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
        type: String,
    },
    collectedMoney: {
        type: Number,
        default: 0
    },
    needMoney: {
        type: Number,
        required: true
    },
    endDate: {
        type: Date,
        required: true
    },
    bonuses: {
       type: Array
    },
    rating: {
        type: Array
    },
    imageUrl: {
        type: String,
        required: true
    }
});

mongoose.model('Company', companySchema);
