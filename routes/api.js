const router = require('express').Router();
const apiController = require('../controllers/api');


router.get('/count/:lotId',
  apiController.getCurrentCount);

router.get('/events/:lotId',
  apiController.getHistoricalData);

module.exports = router;
