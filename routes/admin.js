const router = require('express').Router();
const adminController = require('../controllers/admin');

router.post('/count/:lotId',
  adminController.reset);

module.exports = router;
