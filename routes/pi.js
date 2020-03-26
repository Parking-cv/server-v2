const router = require('express').Router();
const fileUpload = require('express-fileupload');
const { frameHandler, testFrameHandler } = require('../controllers/pi');

router.post("/frames",
  fileUpload({ /* File upload options */ }),
  frameHandler
);

router.post("/test/:cnt",
  testFrameHandler
);

module.exports = router;
