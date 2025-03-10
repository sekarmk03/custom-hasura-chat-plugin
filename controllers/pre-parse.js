const err = require('../utils/commons/errors');
const reqValidator = require('../utils/validator/request');
const Validator = require('fastest-validator');
const v = new Validator();

module.exports = {
    validation: async (req, res, next) => {
        const { rawRequest } = req.body;
        const { query, operationName, variables } = rawRequest;

        switch (operationName) {
            case "SendMessage":
                console.log(query);
                break;
            case "CreateNewMessage":
                console.log(query);
                break;
            default:
                break;
        }
    }
};