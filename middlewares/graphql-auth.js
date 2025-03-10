const { HASURA_PLUGIN_SECRET } = process.env;
const err = require('../utils/common/errors');

module.exports = () => {
    return (req, res, next) => {
        const authHeader = req.headers['hasura-m-auth'];
    
        if (!authHeader) return err.unauthorized(res, 'Access denied. No hasura-m-auth provided');
    
        try {
            if (authHeader !== HASURA_PLUGIN_SECRET) {
                return err.unauthorized(res, 'Access denied. Invalid hasura-m-auth');
            }
        
            next();
        } catch (error) {
            return err.unauthorized(res, 'Invalid token');
        }
    }
};