let mongoose = require('mongoose');
let Company = mongoose.model('Company');

module.exports.findAllCompanies = function (req, res) {
    if (!res) {
        res.status(401).json({
            msg: 'Companies not found...'
        });
    }
    Company.find({}, function (err, companies) {
        console.log(companies);
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
        console.log(company);
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
            needMoney: req.body.needMoney,
            endDate: req.body.endDate,
            topic: req.body.topic
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
        res.status(401).json({msg: 'Something was wrong'})
    } else {
        Company.findByIdAndUpdate(req.body.companyId, {$addToSet: {rating: req.body.rating}}, function (err, rating) {
            if (err) {
                return res.status(500).send({msg: err.message});
            }
            res.send(rating);
        })
    }
};
