const express = require('express');

const router = express.Router();

const generateConstantData = require('../middleware/generateConstantData');

const subscribePostController = require('../controllers/subscribe/post');

router.post(
  '/',
    generateConstantData,
    subscribePostController
);

module.exports = router;
