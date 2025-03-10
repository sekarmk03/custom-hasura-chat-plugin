const express = require('express');
const router = express.Router();

const preParse = require('./pre-parse');
const preResponse = require('./pre-response');

router.use('/pre-parse', preParse);
router.use('/pre-response', preResponse);

module.exports = router;