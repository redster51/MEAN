var mongoose = require('mongoose');
var User = mongoose.model('User');

module.exports.profileRead = function(req, res) {

  if (!req.payload._id) {
    res.status(401).json({
      "message" : "UnauthorizedError: private profile"
    });
  } else {
    User
        .findById(req.payload._id)
        .exec(function (err, user) {
          res.status(200).json(user);
        }). then(r =>"");
  }
};

module.exports.getUsers = function(req, res) {
    User.find({}, function(err, users) {
        var userMap = {};

        users.forEach(function(user) {
            userMap[user._id] = user;
        });

        res.send(userMap);
    });
};