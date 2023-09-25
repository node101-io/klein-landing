const express = require('express');

const router = express.Router();

const generateConstantData = require('../middleware/generateConstantData');

const txGetController = require('../controllers/tx/get');
const txPostController = require('../controllers/tx/post');

router.get(
  '/',
    generateConstantData,
    txGetController
);

router.post(
  '/',
    generateConstantData,
    txPostController
)

module.exports = router;
