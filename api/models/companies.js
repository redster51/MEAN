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
        required: true,
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
       type: Array,
        required: true
    },
    rating: {
        type: Array,
        required: true
    },
    imageUrl: {
        type: String,
    }
});

mongoose.model('Company', companySchema);
