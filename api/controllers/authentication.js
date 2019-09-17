let crypto = require('crypto');
let nodemailer = require('nodemailer');
let mongoose = require('mongoose');
let User = mongoose.model('User');
let Token = mongoose.model('Token');

module.exports.register = function (req, res) {

    User.findOne({email: req.body.email}, function (err, user) {

        // Make sure user doesn't already exist
        if (user) return res.status(400).send({msg: 'The email address you have entered is already associated with another account.'});

        // Create and save the user
        user = new User();
        user.name = req.body.name;
        user.email = req.body.email;
        user.setPassword(req.body.password);
        user.save(function (err) {
            if (err) {
                return res.status(500).send({msg: err.message});
            }

            // Create a verification token for this user
            let token = new Token({_userId: user._id, token: crypto.randomBytes(16).toString('hex')});

            // Save the verification token
            token.save(function (err) {
                if (err) {
                    return res.status(500).send({msg: err.message});
                }

                // Send the email
                let transporter = nodemailer.createTransport({
                    service: 'Gmail',
                    auth: {user: '321node.ver123@gmail.com', pass: '`1q2w3e4r'}
                });
                let mailOptions = {
                    from: 'no-reply@yourwebapplication.com',
                    to: user.email,
                    subject: 'Account Verification Token',
                    text: 'Hello,\n\n' + 'Please verify your account by clicking the link: \nhttp:\/\/' + req.headers.host + '\/confirmation\/' + token.token + '.\n'
                };
                transporter.sendMail(mailOptions, function (err) {
                    if (err) {
                        return res.status(500).send({msg: err.message});
                    }
                    res.status(200);
                });
            });
        });
    });
};

module.exports.login = function (req, res) {
    User.findOne({email: req.body.email}, function (err, user) {
        if (!user) return res.status(401).send(
            {msg: 'The email address '
                    + req.body.email
                    + ' is not associated with any account. Double-check your email address and try again.'});
        if (user.validPassword(req.body.password)) {
            // Make sure the user has been verified
            if (!user.isVerified) return res.status(401).send({
                type: 'not-verified',
                msg: 'Your account has not been verified.'
            });

            // Login successful, write token, and send back user
            res.send({token: user.generateJwt(), user: user.toJSON()});
        } else {
            return res.status(401).send({msg: 'Invalid email or password'});
        }
    });
};
