var mongoose = require('mongoose');
const forEach = require("mongoose");
var User = mongoose.model('User');

module.exports.profileRead = function (req, res) {

    if (!req.payload._id) {
        res.status(401).json({
            "message": "UnauthorizedError: private profile"
        });
    } else {
        User
            .findById(req.payload._id)
            .exec(function (err, user) {
                res.status(200).json(user);
            }).then(r => "");
    }
};

module.exports.getUsers = function (req, res) {
    User.find({}, function (err, users) {
        res.send(users);
    });
};

module.exports.blockUsers = function (req, res) {
    req.forEach(function (user, i, req) {
        User.findOneAndUpdate({email: user.body}, {$set: {isBlocked: true}},
            (err, user) => {
                if (!user) return res.status(401).send("Can not block!");
                res.status(200).send("OK!")
            })
    })
};

module.exports.unBlockUsers = function (req, res) {
    req.forEach(function (user, i, req) {
        User.findOneAndUpdate({email: user.body}, {$set: {isBlocked: false}},
            (err, user) => {
                if (!user) return res.status(401).send("Can not unblock!");
                res.status(200).send("OK!")
            })
    })
};

module.exports.deleteUsers = function (req, res) { // Этот метод должен идеально работать если я правильно понял суть запросов
    //req.forEach(function (user, i, req) {
        User.remove({email: req.body},
            (err, user) => {
                if (!user) return res.status(401).send("Can not remove!");
                res.status(200).send("OK!")
            })
    //});
};

