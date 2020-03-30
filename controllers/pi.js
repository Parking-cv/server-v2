const fs = require('fs');
const { detect } = require('../detector/detect');


let numFolders = 0;

exports.frameHandler = (req, res) => {
  let dir = './tmp-' + numFolders++;
  let filenames = [];

  // File operations
  fs.mkdirSync(dir);
  for (let timestamp of Object.keys(req.files)) {
    // TODO don't hardcode file type
    let filename = dir + '/image-' + timestamp + '.jpg';
    req.files[timestamp].mv(filename, (err) => { if (err) console.error(err); });
    filenames.push(filename);
  }

  filenames.sort(((a, b) => {
    return new Date(
      a.substring(dir.length + 7, a.length - 4)
    ) > new Date(
      b.substring(dir.length + 7, b.length - 4)
    );
  }));

  // Timestamp to be used for database
  const timestamp = new Date(
    filenames[0].substring(
      dir.length + 7, filenames[0].length - 4
    )
  );

  detect(timestamp, filenames, req.params.lotId, (err) => {
    fs.rmdirSync(dir, { recursive: true });
    numFolders -= 1;
    if (err) res.send(500).json({ err });
    else res.json({ "success": true });
  });
};

exports.testFrameHandler = (req, res) => {
  const LotMap = require('../services/LotMap');

  // Simulate a successful event detection
  require('../services/db').mongo((err, db) => {
    if (err) res.status(500).json({err});
    else {
      db.collection(req.params.lotId).insert({
        "timestamp": new Date(),
        "event": req.query.count
      }, (err, result) => {
        if (err) res.status(500).json({err});
        else {
          LotMap.record(req.params.lotId, req.query.count, (err) => { if (err) res.status(500).json({err}) });
          res.json(result);
        }
      });
    }
  });

};
