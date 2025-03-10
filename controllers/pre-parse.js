const err = require('../utils/common/errors');
const requestValidator = require('../utils/validator/request');
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

                    // const val = v.validate(parsed, requestValidator.createMessage);
                    // console.log(val);
                    
                    // if (val.length) return err.bad_request(res, val[0].message);
                    
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