const { spawn } = require('child_process');
const { mongo } = require('../services/db');
const LotMap = require('../services/LotMap');

exports.detect = (files, cb) => {
  const timestamp = files[0];
  files[0] = 'detector/Detector.py';

  const process = spawn('python', ...files);
  process.stdout.on('data', (data) => {
    mongo((err, db) => {
      if (err) console.error(err);
      else {
        // Eventually the lot will change, so the collection
        // name will not always be lot. The data for each lot
        // will live in its own collection
        db.collection('lot').insert({
          "timestamp": timestamp,
          "event": data + ''
        }, (err, result) => {
          if (err) console.error(err);
          else {
            // This will also need to change with time
            LotMap.record('lot', data, (err) => { if (err) cb(err) });
            console.log(result);
          }
        });
      }
    });
  });

  process.stderr.on('data', (data) => { cb(data) });

  cb(null);
};
