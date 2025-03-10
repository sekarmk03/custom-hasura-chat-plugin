const err = require('../utils/common/errors');
const reqValidator = require('../utils/validator/request');
const Validator = require('fastest-validator');
const v = new Validator();
const { argumentParser } = require('../utils/common/object-parser');

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
                    const parsed = argumentParser(query);
                    console.log(parsed);
                    console.log(parsed.chatId);
                    console.log(parsed.content);
                    
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