const fs = require('fs');
const { detect } = require('../detector/detect');

const router = require('express').Router();
const fileUpload = require('express-fileupload');

let numFolders = 0;

router.post("/frames",
  fileUpload({
    // File upload options
  }),
  (req, res) => {
    let dir = './tmp-' + numFolders++;
    let filenames = [];

    // File operations
    fs.mkdirSync(dir);
    req.files.forEach((file, timestamp) => {
      let filename = dir + '/image-' + timestamp;
      file.mv(filename, (err) => { if (err) console.error(err); });
      filenames.push(filename);
    });
    filenames.sort(((a, b) => a > b ? a : b));

    detect(filenames, (err) => {
      fs.rmdirSync(dir);
      numFolders -= 1;
      if (err) res.send(500).json({ err });
      else res.json({ "success": true });
    });
  }
);

module.exports = router;
