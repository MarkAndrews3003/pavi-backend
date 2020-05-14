const jwt = require('jsonwebtoken');
const Users = require('../mongoose/models/users');
const CV = require('../mongoose/models/CV_Resume');
const bcrypt = require('bcryptjs');






exports.CV_education = async (req, res) => {

    var index = req.body.index;
    console.log(index);

    if (index) {




        CV.findOneAndUpdate({
            user_id: res.locals.id,
        }, {
            "education.$[institution].start_date": '2017'
        }, {
            arrayFilters: {
                institution: 'NPUA2'
            }
        }, function (err, doc) {
            console.log(doc);

        })

        // doc.save(function (err) {
        //     console.log(err);
        // })


        // doc.education[index].institution = req.body.institution;
        // doc.education[index].start_date = req.body.start_date;
        // doc.education[index].end_date = req.body.end_date;
        // doc.education[index].speciality = req.body.speciality;
        // doc.education[index].degree = req.body.degree;
        // doc.save().then(doc => {
        //     console.log(doc.save().finally());
        // })
        //  })
    } else {
        CV.findOneAndUpdate({
            user_id: res.locals.id
        }, {
            $push: {
                education: req.body
            }
        }, function (err, user_result) {
            if (err) res.json({
                result: 'Try again'
            });
            if (user_result) res.json({
                result: 'Information about education successfully changed'
            });
            else res.json({
                result: 'Try again'
            });
        })
    }

}

exports.CV_education_get = async (req, res) => {
    CV.findOne({
        user_id: res.locals.id
    }, function (err, user_result) {
        //console.log(user_result.education[0].institution)
        //res.send(user_result.education);
        var data = user_result.education;
        for (var i = 0; i < user_result.education.length; i++) {
            console.log(data[i].institution, data[i].start_date + '/' + data[i].end_date,
                data[i].degree, data[i].speciality)
        }

    })
}

exports.CV_work = async (req, res) => {
    console.log(req.body);


}

exports.CV_skills = async (req, res) => {
    console.log(req.body);


}