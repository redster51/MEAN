var mongoose = require('mongoose');
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
    setIsBlockUsers(req, res, true);
};

module.exports.unBlockUsers = function (req, res) {
    setIsBlockUsers(req, res, false);
};

module.exports.deleteUsers = function (req, res) { // Этот метод должен идеально работать если я правильно понял суть запросов
    req.body.forEach(user => {
        let token;
        User.findOne({email: user.email}, (err, user) => {
            token = user.generateJwt();
        });
        User.remove({email: user.email}, (err, user) => {
            if (!user) return res.status(401).send({msg: err.message});
            res.status(200).send({token: token});
        })
    });
};

function setIsBlockUsers(req, res, isBlocked) {
    req.body.forEach(user => {
        User.findOneAndUpdate({email: user.email}, {$set: {isBlocked: isBlocked}},
            (err, user) => {
                if (!user) return res.status(401).send({msg: err.message});
                res.status(200).send({token: user.generateJwt()});
            })
    });
}

