const CV = require('../mongoose/models/CV_Resume');


////work
exports.work = async (req, res) => {
    console.log(req.body);
    var data = req.body;
    console.log(data.length);

    CV.findOne({
        user_id: res.locals.id
    }, function (err, user_result) {
        if (err) res.json({
            result: 'Try again'
        })

        let last_elem_index = null;
        data.forEach(elem => {
            if (user_result.work.length != 0) {
                last_elem_index = new Number(user_result.work.slice(-1)[0].index.split('-')[1]) + 1;
            } else last_elem_index = 0;
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

exports.work_update = async (req, res) => {
    var data = req.body;
    CV.update({
        'work.index': res.locals.id + '-' + data.index
    }, {
        'work.$.organization': data.organization,
        'work.$.start_date': data.start_date,
        'work.$.end_date': data.end_date,
        'work.$.role': data.role,
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

exports.work_get = async (req, res) => {
    let work = new Array;
    CV.findOne({
        user_id: res.locals.id
    }, function (err, user_result) {
        var data = user_result.work;
        for (var i = 0; i < user_result.work.length; i++) {
            work.push({
                organization: data[i].organizatiom,
                start_end: data[i].start_date + '/' + data[i].end_date,
                role: data[i].role,
                type: data[i].type,
                index: data[i].index
            })
        }
        res.json({
            result: work
        });
    })
}

exports.work_delete = async (req, res) => {
    CV.update({
        'user_id': res.locals.id,
    }, {
        $pull: {
            work: {
                'index': req.body.index
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
