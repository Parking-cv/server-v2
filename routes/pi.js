const router = require('express').Router();
const fileUpload = require('express-fileupload');
const { frameHandler } = require('../controllers/pi');

router.post("/frames",
  fileUpload({ /* File upload options */ }),
  frameHandler
);

module.exports = router;
