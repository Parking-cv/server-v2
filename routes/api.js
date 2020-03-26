const router = require('express').Router();
const apiController = require('../controllers/api');


router.get('/count/:id',
  apiController.getCurrentCount);

router.get('/events/:id',
  apiController.getHistoricalData);

module.exports = router;
