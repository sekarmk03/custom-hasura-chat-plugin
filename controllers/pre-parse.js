const err = require('../utils/common/errors');
const reqValidator = require('../utils/validator/request');
const Validator = require('fastest-validator');
const v = new Validator();

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
                    return res.status(200).json({
                        data: {
                            validate: true,
                            message: 'Validation success',
                            rawRequest: rawRequest,
                        },
                  });
                    break;
                default:
                    break;
            }
        } catch (error) {
            console.log(error);
            
            return err.internal(res, error.message);
        }
    }
};