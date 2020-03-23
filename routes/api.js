const router = require('express').Router();
const apiController = require('../controllers/api');


router.get('/count/:id',
  apiController.getCurrentCount);

router.post('/events/:id',
  apiController.getHistoricalData);
