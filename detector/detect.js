const { spawn } = require('child_process');

exports.detect = (files, cb) => {
  files.unshift('detector/Detector.py');
  try {
    const process = spawn('python', files);
    process.stdin.on('data', (data) => {
      // Insert into database
    });
    process.stderr.on('data', (data) => {
      throw new Error(data)
    });
    cb(null);
  } catch (err) {
    cb(err);
  }
};
