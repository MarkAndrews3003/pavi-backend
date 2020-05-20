const user = require('../mongoose/models/users'),
    job = require('../mongoose/models/jobs'),
    company = require('../mongoose/models/companies');

const moment = require('moment');


/*******************
 * JOB LIST FILTER *
 *******************/
exports.job_list_filter = async (req, res) => {

    let data = req.body;
    let filter = new Array();

    if (data.jobTitle) regex(data.jobTitle, ' ', filter, 'jobTitle', 1);
    if (data.country) regex(data.country, ',', filter, 'country', 1);
    if (data.city) regex(data.city, ',', filter, 'city', 1);
    if (data.email) regex(data.email, '', filter, 'email', 2);
    if (data.employment) regex(data.employment, ',', filter, 'employment', 1);


    if (data.min_salary || data.max_salary) {
        filter.push({
            salary: {
                $gte: data.min_salary ? data.min_salary : 0,
                $lte: data.max_salary ? data.max_salary : 100000,
            }
        })
    }

    if (data.min_date_open || data.max_date_open) {

        //Input DD/MM/YYYYY
        let start_date_open = data.min_date_open.split('/'),
            end_date_open = data.max_date_open.split('/');

        //Output YYYY/MM/DD
        filter.push({
            dateOpened: {
                $gte: moment.utc().format(`${start_date_open[2]}-${start_date_open[1]}-${start_date_open[0]}`),
                $lte: moment.utc().format(`${end_date_open[2]}-${end_date_open[1]}-${end_date_open[0]}`)
            },

        })
    }

    if (data.min_date_close || data.max_date_close) {

        //Input DD/MM/YYYYY
        let start_date_close = data.min_date_close.split('/'),
            end_date_close = data.max_date_close.split('/');

        //Output YYYY/MM/DD
        filter.push({
            dateClose: {
                $gte: moment.utc().format(`${start_date_close[2]}-${start_date_close[1]}-${start_date_close[0]}`),
                $lte: moment.utc().format(`${end_date_close[2]}-${end_date_close[1]}-${end_date_close[0]}`)
            }
        })
    }

    if (data.min_exp || data.max_exp) {

        filter.push({
            experience: {
                $gte: data.min_exp,
                $lte: data.max_exp
            }

        })
    }

    let result, condition;
    if (filter.length != 0)
        condition = {
            $and: filter
        }


    result = await job.find(condition, {
        '_id': 0,
        '__v': 0,
    }).sort({
        '_id': '-1'
    });

    res.json({
        result
    });
}



/********************
 * USER LIST FILTER *
 ********************/

exports.user_list_filter = async (req, res) => {
    let data = req.body;
    let filter = new Array();

    if (data.gender) regex(data.gender, ',', filter, 'gender', 2);
    if (data.country) regex(data.country, ',', filter, 'country', 1);
    if (data.first_name) regex(data.first_name, ',', filter, 'first_name', 2);
    if (data.last_name) regex(data.last_name, ',', filter, 'last_name', 2);
    if (data.email) regex(data.email, ',', filter, 'email', 2);

    let result, condition;
    if (filter.length != 0)
        condition = {
            $and: filter
        }


    result = await user.find(condition, {
        '_id': 0,
        'password': 0,
        'status': 0,
        'created': 0,
        '__v': 0,
        'CV_id': 0,
        'profile_desc': 0,
        'avatar': 0,
        'roles': 0
    }).sort({
        '_id': '-1'
    });

    res.json({
        result
    });

}



/***********************
 * COMPANY LIST FILTER *
 ***********************/
exports.company_list_filter = async (req, res) => {
    let data = req.body;
    let filter = new Array();

    if (data.name) regex(data.name, '', filter, 'name', 2);
    if (data.country) regex(data.country, ',', filter, 'country', 1);
    if (data.phone) regex(data.phone, '', filter, 'phone', 2);

    let result, condition;
    if (filter.length != 0)
        condition = {
            $and: filter
        }


    result = await company.find(condition, {
        '_id': 0,
        'created': 0,
        '__v': 0,
    }).sort({
        '_id': '-1'
    });

    res.json({
        result
    });
}



//Regex function
function regex(data, char, filter, field, type) {
    switch (type) {
        case 1:
            let list = new Array();
            data.split(char).forEach(elem => {
                list.push(new RegExp(elem.replace(' ', ''), 'ig'));
            });

            return filter.push({
                [field]: {
                    $in: list
                }
            });
        case 2:
            return filter.push({
                [field]: new RegExp(`^${data}$`, 'ig')
            })
    }
}