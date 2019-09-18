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
        type: Array,
        required: true,
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
    },
    comments: {
        type: Array
    },
    news: {
        type: Array
    }
});

companySchema.index({name: 'text', description: 'text', topic: 'text', collectedMoney: 'text'});

mongoose.model('Company', companySchema);
