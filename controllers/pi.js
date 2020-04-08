const fs = require('fs');
const http = require('http');
const { db } = require('../services/db');


let numFolders = 0;

exports.frameHandler = (req, res) => {
  let dir = '/ml/images/tmp-' + numFolders++;
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

  let fileJson = JSON.stringify(filenames);

  http.request({
    hostname: 'ml',
    port: 5000,
    path: '/',
    method: 'POST',
    headers: {
      'Content-Type': 'application/json',
      'Content-Length': fileJson.length
    }
  }, result => {
    if (res.statusCode !== 200) {
      console.error('Err: :' + res);
    } else {
      res.on('data', d => {

      });
    }
  });

  req.write();
  req.end();

  mongo((err, db) => {
    if (err) console.error(err);
    else {
      db.collection(lotId).insert({
        "timestamp": timestamp,
        "event": data
      }, (err, result) => {
        if (err) cb(err);
        else {
          LotStore.record(lotId, data, (err) => {
            if (err) cb(err)
          });
          console.log(result);
        }
      });
    }
  });

  fs.rmdirSync(dir, { recursive: true });
  numFolders -= 1;

  if (err) res.send(500).json({ err });
  else res.json({ "success": true });

};

exports.testFrameHandler = (req, res) => {
  const LotStore = require('../services/LotStore');

  // Simulate a successful event detection
  mongo((err, db) => {
    if (err) res.status(500).json({err});
    else {
      db.collection(req.params.lotId).insert({
        "timestamp": new Date(),
        "event": req.query.count
      }, (err, result) => {
        if (err) res.status(500).json({err});
        else {
          LotStore.record(req.params.lotId, req.query.count, (err) => { if (err) res.status(500).json({err}) });
          res.json(result);
        }
      });
    }
  });

};
