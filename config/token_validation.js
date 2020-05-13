const jwt = require('jsonwebtoken');
exports.validation = async (req, res, next) => {
    const token = req.cookies.token
    if (token) {
        jwt.verify(token, 'secretkey', function (err, decoded) {
            if (err || decoded == 'undefined') res.status(401).send('Unauthorized');
            else {
                res.locals.id = decoded.user_id,
                    next();
            }
        })
    } else res.status(401).send('Unauthorized');
}