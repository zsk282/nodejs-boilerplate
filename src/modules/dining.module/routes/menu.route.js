const express = require('express');
const sampleController = require('../controllers/sample.controller');

const router = express.Router();
router.route('/').get(sampleController.hello);

module.exports = router;
