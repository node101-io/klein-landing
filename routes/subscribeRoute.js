const express = require('express');

const router = express.Router();

const generateConstantData = require('../middleware/generateConstantData');

const indexPostController = require('../controllers/subscribe/post');

router.post(
  '/',
    generateConstantData,
    indexPostController
);

module.exports = router;
