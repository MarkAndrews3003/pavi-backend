const CV = require('../mongoose/models/CV_Resume');

const { validationResult } = require('express-validator');

////skill
exports.skill = async (req, res) => {
    var err = validationResult(req);
    if (err.errors.length != 0) {
        console.log(err.errors.length);
        res.send(err.array()[0])
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
                if (user_result.skill.length != 0) {
                    last_elem_index = new Number(user_result.skill.slice(-1)[0].index.split('-')[1]) + 1;
                } else last_elem_index = 0;

                elem.index = res.locals.id + '-' + last_elem_index;
                user_result.skill.push(elem);
                user_result.save(function (err, doc) {
                    if (err) res.json({
                        result: 'Try again'
                    })
                    if (doc) res.json({
                        result: 'Data about skill successfully saved',
                    })
                    else res.json({
                        result: 'Try again'
                    })
                });
            })

        })
    }
}

exports.skill_update = async (req, res) => {
    var err = validationResult(req);
    if (err.errors.length != 0) {
        console.log(err.errors.length);
        res.send(err.array()[0])
    }
    else {
        var data = req.body;
        CV.update({
            'skill.index': data.index
        }, {
            'skill.$.name': data.name,
            'skill.$.percent': data.percent,
        }, function (err, user_data) {
            if (err) res.json({
                result: 'Try again'
            })
            if (user_data) res.json({
                result: 'Data about skill successfully changed',
            })
            else res.json({
                result: 'Try again'
            })
        })
    }
}

exports.skill_get = async (req, res) => {
    let skill = new Array;
    CV.findOne({
        user_id: res.locals.id
    }, function (err, user_result) {
        var data = user_result.skill;
        for (var i = 0; i < user_result.skill.length; i++) {
            skill.push({
                name: data[i].name,
                percent: data[i].percent,
                index: data[i].index
            })
        }
        res.json({
            result: skill
        });
    })
}

exports.skill_delete = async (req, res) => {
    CV.update({
        'user_id': res.locals.id,
    }, {
        $pull: {
            skill: {
                'index': req.body.index
            }
        }
    }, function (err, user_data) {
        if (err) res.json({
            result: 'Try again'
        })
        if (user_data) res.json({
            result: 'Data about skill successfully deleted',
        })
        else res.json({
            result: 'Try again'
        })
    })

}