let mongoose = require('mongoose');
let Company = mongoose.model('Company');

module.exports.findAllCompanies = function (req, res) {
    if (!res) {
        res.status(401).json({
            msg: 'Companies not found...'
        });
    }
    Company.find({}, function (err, companies) {
        res.send(companies)
    })
};

module.exports.findCompany = function (req, res) {
    if (!res) {
        res.status(401).json({
            msg: 'Company not found...'
        });
    }
    Company.find({_id: req.params.id}, function (err, company) {
        res.send(company)
    })
};

module.exports.findCompaniesByUser = function (req, res, name) {
    if (!res) {
        res.status(401).json({
                msg: "Companies not find"
            }
        )
    } else {
        Company.find({creator: name}, function (err, companies) {
            res.send(companies);
        })
    }
};

module.exports.createCompany = function (req, res) {
    if (!req) {
        res.status(401).json({
            msg: "Something was wrong"
        })
    } else {
        let company = new Company({
            _userId: req.body.creator,
            name: req.body.name,
            description: req.body.description,
            video: req.body.video,
            collectedMoney: req.body.collectedMoney,
            needMoney: req.body.needMoney,
            endDate: req.body.endDate,
            topic: req.body.topic,
            bonuses: req.body.topic,
            rating: req.body.rating,
            imageUrl: req.body.imgUrl
        });
        company.save(function (err) {
            if (err) {
                return res.status(500).send({msg: err.message});
            }
            res.status(200);
        })
    }
};

module.exports.addRating = function (req, res) {    //have some questions...
    if (!req) {
        res.status(401).json({msg: 'Rating not added'})
    } else {
        Company.findByIdAndUpdate(req.body.companyId, {$push: {rating: req.body.rating}}, function (err, rating) {
            if (err) {
                return res.status(500).send({msg: err.message});
            }
            res.send(rating);
        })
    }
};

module.exports.getRating = function (req, res) {
    if (!req) {
        res.status(401).json({msg: "Rating couldn't get!"})
    } else {
        Company.findById(req.params.id, function (err, company) {
            if (err) {
                return res.status(500).send({msg: err.message});
            }
            res.send(company.rating);
        })
    }
};

module.exports.search = function (req, res) {
    if (!req) {
        res.status(401).json({msg: 'Search do not work'})
    } else {
        Company.find(
            { $text : { $search : req.params.text } },
            { score : { $meta: 'textScore' }})
            .sort({ score : { $meta : 'textScore' } })
            .exec(function(err, results) {
                res.send(results);
            });
    }
};

module.exports.addDonate = function (req, res) {
    if (!req) {
        console.log(req.body);
        res.status(401).json({msg: 'Donate do not worked'})
    } else {
        Company.findOneAndUpdate({name: req.body.name}, {
            $push: {
                collectedMoney: {
                    donate: req.body.donate,
                    userId: req.body.userId
                }
            }
        }, function (err, company) {
            if (err) {
                return res.status(500).send({msg: err.message});
            }
            res.send({collectedMoney: company._doc.collectedMoney});
        })
    }
};
