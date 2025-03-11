const jwt = require('jsonwebtoken');
const { JWT_SECRET_KEY } = process.env;
const err = require('../utils/errors');

module.exports = (roles = []) => {
    // if passed role only 1 integer
    if (typeof roles === 'number') roles = [roles];

    return (req, res, next) => {
        let token = req.header('Authorization');
        if (!token) return err.unauthorized(res, 'Access denied. No token provided');
        token = token.split(' ')[1];

        try {
            const payload = jwt.verify(token, JWT_SECRET_KEY);

            req.user = payload;

            next();
        } catch (error) {
            return err.unauthorized(res, 'Invalid token');
        }
    }
}