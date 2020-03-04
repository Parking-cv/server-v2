const { spawn } = require('child_process');
const { mongo } = require('../services/db');

exports.detect = (files, cb) => {
  const timestamp = files[0];
  files[0] = 'detector/Detector.py';
  try {
    // const process = spawn('python', ...files);
    const process = spawn('echo', ['1']);
    process.stdout.on('data', (data) => {
      mongo((err, db) => {
        if (err) console.error(err);
        else {
          db.collection('lot').insert({
            "timestamp": timestamp,
            "change": data + ''
          }, (err, result) => {
            if (err) console.error(err);
            else console.log(result);
          });
        }
      });
    });
    process.stderr.on('data', (data) => { throw new Error(data) });
    cb(null);
  } catch (err) {
    cb(err);
  }
};
