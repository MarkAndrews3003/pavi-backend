const CV = require('../mongoose/models/CV_Resume');

const { validationResult } = require('express-validator');

////certification
exports.certification = async (req, res) => {
    console.log(req.body);
    var err = validationResult(req);
    if (err.errors.length != 0) {
        console.log(err.errors.length);
        res.status(422).send(err.array()[0])
    }
    else {
        var data = req.body;
        CV.findOne({
            user_id: res.locals.id
        }, function (err, user_result) {
            if (err) res.json({
                result: 'Try again'
            })

            let last_elem_index = null;
            data.forEach(elem => {
                if (user_result.certification.length != 0) {
                    last_elem_index = new Number(user_result.certification.slice(-1)[0].index.split('-')[1]) + 1;
                } else last_elem_index = 0;

                elem.index = res.locals.id + '-' + last_elem_index;
                user_result.certification.push(elem);
                user_result.save(function (err, doc) {
                    if (err) res.json({
                        result: 'Try again'
                    })
                    if (doc) res.json({
                        result: 'Data about certification successfully saved',
                    })
                    else res.json({
                        result: 'Try again'
                    })

                });
            })

        })
    }
}

exports.certification_update = async (req, res) => {
    var err = validationResult(req);
    if (err.errors.length != 0) {
        console.log(err.errors.length);
        res.status(422).send(err.array()[0])
    }
    else {
        var data = req.body;
        CV.update({
            'certification.index': data.index
        }, {
            'certification.$.name': data.name,
            'certification.$.start_year': data.start_year,
            'certification.$.end_year': data.end_year,
            'certification.$.description': data.description,
            'certification.$.issued_by': data.issued_by
        }, function (err, user_data) {
            if (err) res.json({
                result: 'Try again'
            })
            if (user_data) res.json({
                result: 'Data about certification successfully changed',
            })
            else res.json({
                result: 'Try again'
            })
        })
    }
}

exports.certification_get = async (req, res) => {
    let certification = new Array;
    CV.findOne({
        user_id: res.locals.id
    }, function (err, user_result) {
        var data = user_result.certification;
        for (var i = 0; i < user_result.certification.length; i++) {
            certification.push({
                name: data[i].name,
                start_year: data[i].start_year,
                end_year: data[i].end_year,
                description: data[i].description,
                issued_by: data[i].issued_by,
                index: data[i].index
            })
        }
        res.json(certification);
    })
}

exports.certification_delete = async (req, res) => {

    CV.update({
        'user_id': res.locals.id,
    }, {
        $pull: {
            certification: {
                'index': req.query.index
            }
        }
    }, function (err, user_data) {
        if (err) res.json({
            result: 'Try again'
        })
        if (user_data) res.json({
            result: 'Data about certification successfully deleted',
        })
        else res.json({
            result: 'Try again'
        })
    })

}
