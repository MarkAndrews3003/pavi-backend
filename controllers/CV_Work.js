const CV = require('../mongoose/models/CV_Resume');

const { validationResult } = require('express-validator');
////work
exports.work = async (req, res) => {
    var err = validationResult(req);
    if (err.errors.length != 0) {
        console.log(err.errors.length);
        res.status(422).send(err.array()[0])
    }
    else {
        let data = req.body;
        CV.findOne({
            user_id: res.locals.id
        }, function (err, user_result) {
            if (err) res.json({
                result: 'Try again'
            })

            let last_elem_index = null;
            if (user_result.work.length != 0) {
                last_elem_index = new Number(user_result.work.slice(-1)[0].index.split('-')[1]) + 1;
            } else last_elem_index = 0;
            data.forEach(elem => {
                elem.index = res.locals.id + '-' + last_elem_index;
                user_result.work.push(elem);
                user_result.save(function (err, doc) {
                    if (err) res.json({
                        result: 'Try again'
                    })
                    if (doc) res.json({
                        result: 'Data about work successfully saved',
                    })
                    else res.json({
                        result: 'Try again'
                    })
                });
            });
        })
    }
}

exports.work_update = async (req, res) => {
    console.log(req.body);
    var err = validationResult(req);
    if (err.errors.length != 0) {
        console.log(err.errors.length);
        res.status(422).send(err.array()[0])
    }
    else {
        var data = req.body;
        CV.update({
            'work.index': data.index
        }, {
            'work.$.company_name': data.company_name,
            'work.$.start_year': data.start_year,
            'work.$.end_year': data.end_year,
            'work.$.speciality': data.speciality,
            'work.$.type': data.type
        }, function (err, user_data) {
            if (err) res.json({
                result: 'Try again'
            })
            if (user_data) res.json({
                result: 'Data about work successfully changed',
            })
            else res.json({
                result: 'Try again'
            })
        })
    }
}

exports.work_get = async (req, res) => {
    let work = new Array;
    CV.findOne({
        user_id: res.locals.id
    }, function (err, user_result) {
        var data = user_result.work;
        for (var i = 0; i < user_result.work.length; i++) {
            work.push({
                company_name: data[i].company_name,
                start_year: data[i].start_year,
                end_year: data[i].end_year,
                speciality: data[i].speciality,
                //type: data[i].type,
                index: data[i].index
            })
        }
        res.json(work);
    })
}

exports.work_delete = async (req, res) => {
    CV.update({
        'user_id': res.locals.id,
    }, {
        $pull: {
            work: {
                'index': req.query.index
            }
        }
    }, function (err, user_data) {
        if (err) res.json({
            result: 'Try again'
        })
        if (user_data) res.json({
            result: 'Data about work successfully deleted',
        })
        else res.json({
            result: 'Try again'
        })
    })

}
