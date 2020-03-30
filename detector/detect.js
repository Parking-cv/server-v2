const { spawn } = require('child_process');
const { mongo } = require('../services/db');
const LotMap = require('../services/LotMap');

exports.detect = (timestamp, files, lotId, cb) => {
  // Prepare array to be used as args
  file.unshift('detector/Detector.py');
  const process = spawn('python', ...files);
  process.stdout.on('data', (data) => {
    mongo((err, db) => {
      if (err) console.error(err);
      else {
        db.collection(lotId).insert({
          "timestamp": timestamp,
          "event": data
        }, (err, result) => {
          if (err) cb(err);
          else {
            LotMap.record(lotId, data, (err) => { if (err) cb(err) });
            console.log(result);
          }
        });
      }
    });
  });

  process.stderr.on('data', (data) => { cb(data) });

  cb(null);
};
