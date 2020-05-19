const user = require('../mongoose/models/users'),
    job = require('../mongoose/models/jobs');

const moment = require('moment');


/*******************
 * JOB LIST FILTER *
 *******************/
exports.job_list_filter = async (req, res) => {

    let data = req.body;
    let country_list = new Array(),
        city_list = new Array(),
        filter = new Array();

    if (data.country) {
        data.country.split(',').forEach(elem => {
            country_list.push(new RegExp(elem, 'ig'));
        });

        filter.push({
            country: {
                $in: country_list
            }
        })
    }

    if (data.city) {
        data.city.split(',').forEach(elem => {
            city_list.push(new RegExp(elem, 'ig'));
        });
        filter.push({
            city: {
                $in: city_list
            }
        })
    }

    if (data.min_salary || data.max_salary) {
        filter.push({
            salary: {
                $gte: data.min_salary ? data.min_salary : 0,
                $lte: data.max_salary ? data.max_salary : 100000,
            }
        })
    }

    if (data.min_date_open || data.max_date_open || data.min_date_close || data.max_date_close) {

        let start_date_open = data.min_date_open.split('/'),
            end_date_open = data.max_date_open.split('/'),
            start_date_close = data.min_date_close.split('/'),
            end_date_close = data.max_date_close.split('/');

        filter.push({
            dateOpened: {
                $gte: moment.utc().format(`${start_date_open[2]}-${start_date_open[1]}-${start_date_open[0]}`),
                $lte: moment.utc().format(`${end_date_open[2]}-${end_date_open[1]}-${end_date_open[0]}`)
            },
            dateClose: {
                $gte: moment.utc().format(`${start_date_close[2]}-${start_date_close[1]}-${start_date_close[0]}`),
                $lte: moment.utc().format(`${end_date_close[2]}-${end_date_close[1]}-${end_date_close[0]}`)
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
    let country_list = new Array(),
        filter = new Array();

    if (data.gender) filter.push({
        gender: new RegExp(`^${data.gender}$`, 'ig')
    });

    if (data.country) {
        data.country.split(',').forEach(elem => {
            country_list.push(new RegExp(elem, 'ig'));
        });
        filter.push({
            country: {
                $in: country_list
            }
        })
    }

    if (data.first_name) {
        filter.push({
            first_name: new RegExp(`^${data.first_name}$`, 'ig')
        })
    }

    if (data.last_name) {
        filter.push({
            last_name: new RegExp(`^${data.last_name}$`, 'ig')
        })
    }

    if (data.email) {
        filter.push({
            email: new RegExp(`^${data.email}$`, 'ig')
        })
    }

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
    });

    res.json({
        result
    });

}

/***********************
 * COMPANY LIST FILTER *
 ***********************/
exports.company_list_filter = async (req, res) => {

}