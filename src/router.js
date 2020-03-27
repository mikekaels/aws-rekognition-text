const express = require('express');
const router = express.Router();

const detectText = require('./controllers/detectTextController');
const multer = require('./middlewares/multer');

router.post('/detect-text', multer, detectText.detectText);
module.exports = router;