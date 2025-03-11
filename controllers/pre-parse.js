const err = require('../utils/common/errors');
const requestValidator = require('../utils/validator/request');
const Validator = require('fastest-validator');
const v = new Validator();
const { extractContent } = require('../utils/common/object-parser');
const { JWT_SECRET_KEY } = process.env;

module.exports = {
    validation: async (req, res, next) => {
        try {
            const { rawRequest } = req.body;
            const { query, operationName, variables } = rawRequest;
    
            switch (operationName) {
                case "SendMessage":
                    console.log(query);
                    break;
                case "CreateNewMessage":
                    console.log(query);

                    const content = extractContent(query);
                    console.log("Content: " + content);

                    const val = v.validate({content}, requestValidator.createMessage);
                    if (val.length) return err.bad_request(res, val[0].message);
                    break;
                default:
                    break;
            }

            return res.status(204).send();
        } catch (error) {
            console.log(error);
            return err.internal(res, error.message);
        }
    },

    auth: async (req, res, next) => {
        const token = req.headers['authorization']?.split(' ')[1];

        if (!token) {
            return res.status(401).json({ error: 'Unauthorized: No token provided' });
        }

        jwt.verify(token, JWT_SECRET_KEY, (err, decoded) => {
            if (err) {
                return res.status(401).json({ error: 'Unauthorized: Invalid token' });
            }

            const sessionVariables = {
                'x-hasura-user-id': decoded.userId,
                'x-hasura-role': decoded.role,
            };

            req.body.session = sessionVariables;

            return res.status(204).send();
        });
    }
};