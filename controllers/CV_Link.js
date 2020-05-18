const CV = require('../mongoose/models/CV_Resume');


////link
exports.link = async (req, res) => {
    var data = req.body;
    CV.findOne({
        user_id: res.locals.id
    }, function (err, user_result) {
        if (err) res.json({
            result: 'Try again'
        })

        let last_elem_index = null;
        if (user_result.link.length != 0) {
            last_elem_index = new Number(user_result.link.slice(-1)[0].index.split('-')[1]) + 1;
        } else last_elem_index = 0;

        console.log('Last index: ' + last_elem_index);
        data.index = res.locals.id + '-' + last_elem_index;
        user_result.link.push(data);
        user_result.save(function (err, doc) {
            if (err) res.json({
                result: 'Try again'
            })
            if (doc) res.json({
                result: 'Data about link successfully saved',
            })
            else res.json({
                result: 'Try again'
            })

        });
    })
}

exports.link_update = async (req, res) => {
    var data = req.body;
    CV.update({
        'link.index': data.index
    }, {
        'link.$.name': data.name,
        'link.$.url': data.url
    }, function (err, user_data) {
        if (err) res.json({
            result: 'Try again'
        })
        if (user_data) res.json({
            result: 'Data about link successfully changed',
        })
        else res.json({
            result: 'Try again'
        })
    })

}

exports.link_get = async (req, res) => {
    let link = new Array;
    CV.findOne({
        user_id: res.locals.id
    }, function (err, user_result) {
        var data = user_result.link;
        for (var i = 0; i < user_result.link.length; i++) {
            link.push({
                name: data[i].name,
                url: data[i].url,
                index: data[i].index
            })
        }
        res.json({
            result: link
        });
    })
}

exports.link_delete = async (req, res) => {

    CV.update({
        'user_id': res.locals.id,
    }, {
        $pull: {
            link: {
                'index': req.body.index
            }
        }
    }, function (err, user_data) {
        if (err) res.json({
            result: 'Try again'
        })
        if (user_data) res.json({
            result: 'Data about link successfully deleted',
        })
        else res.json({
            result: 'Try again'
        })
    })

}