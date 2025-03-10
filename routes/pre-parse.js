const express = require('express');
const router = express.Router();
const { preParse } = require('../controllers');
const validateHasuraPluginSecret = require('../middlewares/validateHasuraPluginSecret');

router.post('/validation', validateHasuraPluginSecret(), preParse.validation);

module.exports = router;