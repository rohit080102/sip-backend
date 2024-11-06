const jwt = require('jsonwebtoken');
const response = require('../core/response');
module.exports = function (req, res, next) {
    const authHeader = req.headers['authorization'];
    if (authHeader && authHeader.startsWith('Bearer ')) {
        // Extract the token part from the header
        const token = authHeader.split(' ')[1];
        // console.log('Received Bearer token:', token);
        if (token) {
            try {
                const verified = jwt.verify(token, process.env.TOKEN_SECRET);
                req.user = verified;
                next();
            } catch (err) {
                return response.onValidationFailed(err, res);
            }
        }
        else {
            return response.unAuthorizedRequest(res);
        }
    }

}