const express = require('express');
const router = express.Router();

const preParse = require('./pre-parse');
const preResponse = require('./pre-response');
const validateHasuraPluginSecret = require('../middlewares/graphql-auth');

router.use('/pre-parse', validateHasuraPluginSecret, preParse);
router.use('/pre-response', preResponse);

module.exports = router;