const fs = require('fs');
const { mongo, mongoConnect } = require('../services/db');
const { postFileNames } = require('../services/ml');
const LotStore = require('../services/LotStore');

const filePrefix = process.env.TMP_DIR + '/tmp-';

let numFolders = 0;

/**
 * Save an array of uploaded files to the filesystem and resolve with
 * an array of the filenames, sorted by timestamp.  The timestamp
 * must be the key for the uploaded file.
 * @param reqFiles
 * @returns {Promise<Object>}
 */
const saveFiles = (reqFiles) => {
  let dir = filePrefix + numFolders++;
  let filenames = [];

  const byDate = (a, b) => {
    return new Date(
      a.substring(dir.length + 7, a.length - 4)
    ) > new Date(
      b.substring(dir.length + 7, b.length - 4)
    );
  };

  return new Promise(((resolve, reject) => {
    fs.mkdirSync(dir);
    for (let timestamp of Object.keys(reqFiles)) {
      let filename = dir + '/image-' + timestamp + '.jpg';
      reqFiles[timestamp].mv(filename, (err) => {if (err) reject(err)});
      filenames.push(filename);
    }
    filenames.sort(byDate);
    resolve({ dir, filenames });
  }));
};

/**
 * Remove temporary folders once they are no longer in use
 * @param dir Directory to delete
 */
const cleanTmpDir = (dir) => {
  fs.rmdirSync(dir, { recursive: true });
  numFolders -= 1;
};

/**
 * Handles upload of files to the server.  Takes an array of filenames and saves them
 * to a docker volume shared with the ml volume.
 * @param req
 * @param res
 */
exports.frameHandler = (req, res) => {
  let reqDir;
  let db;
  mongoConnect()
    .then(mongoClient => {
      db = mongoClient;
      return saveFiles(req.files);
    })
    .then(fileData => {
      reqDir = fileData.dir;
      return postFileNames(fileData)
    })
    .then(data => {
      return new Promise((resolve, reject) => {
        let event = parseInt(data.event + '');
        if (isNaN(event)) reject("Invalid response from ML server");
        db.collection(req.params.lotId)
          .insert({
            'timestamp': data.timestamp,
            'event': parseInt(data.event + '')
          }, (err, result) => {
            if (err) reject(err);
            else resolve({ result, data });
          });
      });
    })
    .then(resultData => {
      return new Promise((resolve, reject) => {
        LotStore.record(
          req.params.lotId,
          resultData.data.event,
          (err) => {
            if (err) reject(err);
            else resolve();
          });
      });
    })
    .then(() => res.json({ success: true }))
    .catch(err => res.status(500).json({ err }))
    .finally(() => { if (reqDir) cleanTmpDir(reqDir) });
};

/**
 * Route to test components of the system while bypassing the ML algorithm
 * @param req
 * @param res
 */
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
          LotStore.record(
            req.params.lotId,
            req.query.count,
            (err) => { if (err) res.status(500).json({err})
          });
          res.json(result);
        }
      });
    }
  });
};
