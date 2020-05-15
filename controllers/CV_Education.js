const CV = require('../mongoose/models/CV_Resume');


////Education
exports.education = async (req, res) => {
    var data = req.body;
    console.log(typeof (data));
    CV.findOne({
        user_id: res.locals.id
    }, function (err, user_result) {
        if (err) res.json({
            result: 'Try again'
        })

        let last_elem_index = null;
        if (user_result.education.length != 0) {
            last_elem_index = new Number(user_result.education.slice(-1)[0].index.split('-')[1]) + 1;
        } else last_elem_index = 0;

        data.index = res.locals.id + '-' + last_elem_index;
        user_result.education.push(data);
        user_result.save(function (err, doc) {
            if (err) res.json({
                result: 'Try again'
            })
            if (doc) res.json({
                result: 'Data about education successfully saved',
            })
            else res.json({
                result: 'Try again'
            })

        });
    })
}

exports.education_update = async (req, res) => {
    var data = req.body;
    CV.update({
        'education.index': data.index
    }, {
        'education.$.institution': data.institution,
        'education.$.start_date': data.start_date,
        'education.$.end_date': data.end_date,
        'education.$.degree': data.degree,
        'education.$.speciality': data.speciality,
        'education.$.certification': data.certification
    }, function (err, user_data) {
        if (err) res.json({
            result: 'Try again'
        })
        if (user_data) res.json({
            result: 'Data about education successfully changed',
        })
        else res.json({
            result: 'Try again'
        })
    })

}

exports.education_get = async (req, res) => {
    let education = new Array;
    CV.findOne({
        user_id: res.locals.id
    }, function (err, user_result) {
        var data = user_result.education;
        for (var i = 0; i < user_result.education.length; i++) {
            education.push({
                institution: data[i].institution,
                start_end: data[i].start_date + '/' + data[i].end_date,
                degree: data[i].degree,
                speciality: data[i].speciality,
                index: data[i].index
            })
        }
        res.json({
            result: education
        });
    })
}

exports.education_delete = async (req, res) => {

    CV.update({
        'user_id': res.locals.id,
    }, {
        $pull: {
            education: {
                'index': req.body.index
            }
        }
    }, function (err, user_data) {
        if (err) res.json({
            result: 'Try again'
        })
        if (user_data) res.json({
            result: 'Data about education successfully deleted',
        })
        else res.json({
            result: 'Try again'
        })
    })

}