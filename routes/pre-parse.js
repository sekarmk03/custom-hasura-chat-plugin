const express = require('express');
const router = express.Router();
const { preParse } = require('../controllers');

router.post('/validation', preParse.validation);

module.exports = router;