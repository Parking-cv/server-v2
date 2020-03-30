const router = require('express').Router();
const fileUpload = require('express-fileupload');
const { frameHandler, testFrameHandler } = require('../controllers/pi');

router.post("/frames/:lotId",
  fileUpload({ /* File upload options */ }),
  frameHandler
);

router.post("/test/:lotId",
  testFrameHandler
);

module.exports = router;
